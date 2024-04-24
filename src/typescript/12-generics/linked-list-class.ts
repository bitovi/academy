// Define node that has a value and points to the
// next item in the list.
class LinkedListNode<T> {
	value: T;
	next?: LinkedListNode<T>;

	constructor(val: T) {
		this.value = val;
		this.next = null;
	}
}

class LinkedList<T> {
	private _head: LinkedListNode<T>;
	private _tail: LinkedListNode<T>;

	// Adds to the start of the list.
	unshift(value: T) {
		var node = new LinkedListNode(value);

		// The existing head is now next.
		if(this._head) {
			node.next = this._head;
		}

		this._head = node;

		// If there wasn’t a tail, this is the first node
		if(!this._tail) {
			this._tail = node;
		}
	}
	// removes first
	shift(){
		let value: T;

		// If there was a head,
		// set head to whatever is after it.
		if(this._head) {
			value = this._head.value;
			this._head = this._head.next;
		}

		// If there is no more head, the
		// list is empty.
		if(!this._head) {
			this._tail = null;
		}
		return value;
	}

	get head() { return this._head.value }
	get tail() {return this._tail.value }
}