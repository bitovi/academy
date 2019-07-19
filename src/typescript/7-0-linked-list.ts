class LinkedListItem {
  value: string;
  next?: LinkedListItem;
}

class LinkedList {
  private head: LinkedListItem;
  constructor(item: LinkedListItem) {
    this.head = item;
  }

  insert(val, previousItem: LinkedListItem) {
    let newItem: LinkedListItem = new LinkedListItem(val);
    let currentItem: LinkedListItem = this.head;

    if (!currentItem) {
        this.head = newItem;
    } else {
        while (true) {
            if (currentItem === previousItem) {
                let tempNextItem = previousItem.next;
                currentItem.next = newItem;
                newItem.next = tempNextItem;
                break;
            } else {
                currentItem = currentItem.next;
            }
        }
    }
  }

  append(val) {
    let currentItem: LinkedListItem = this.head;
    let newItem = new LinkedListItem(val);

    if (!currentItem) {
        this.head = newItem;
    } else {
        while (true) {
            if (currentItem.next) {
                currentItem = currentItem.next;
            } else {
                currentItem.next = newItem;
                break;
            }
        }
    }
  }

  prepend(val) {
    let newItem = new LinkedListItem(val);
    let oldHead = this.head;

    this.head = newItem;
    newItem.next = oldHead;
  }

  delete(val) {
    var currentItem = this.head;

    if (!currentItem) {
        return;
    }

    if (currentItem.value === val) {
        this.head = currentItem.next;
    } else {
        var previous = null;

        while (true) {
            if (currentItem.value === val) {
                if (currentItem.next) { // special case for last element
                    previous.next = currentItem.next;
                } else {
                    previous.next = null;
                }
                currentItem = null; // avoid memory leaks
                break;
            } else {
                previous = currentItem;
                currentItem = currentItem.next;
            }
        }
    }
  }

  showInArray() {
    let arr = [];
    let currentItem = this.head;

    while (true) {
        arr.push(currentItem.value);

        if (currentItem.next) {
            currentItem = currentItem.next;
        } else {
            break;
        }
    }

    return arr;
  }
}
