var clickIt = function(el){
	var event = document.createEvent('MouseEvents');
	event.initMouseEvent('click', true, true, window,
	1, 0, 0, 0, 0,
	false, false, false, false,
	0, null);
	el.dispatchEvent(event);
};

QUnit.module('$ functional utils');

QUnit.test('$.extend', function(){

	var target = {first: 'Justin'},
		object = {last: 'Meyer'};

	var result = $.extend(target,object);

	equal( result, target, 'target and result are equal');
	deepEqual(result, {first: 'Justin', last: 'Meyer'}, 'properties added correctly');
});

QUnit.test('$.isArray', function(){

	equal( $.isArray([]), true, 'An array is an array' );
	equal( $.isArray(arguments), false, 'Arguments are not an array' );

	var iframe = document.createElement('iframe');
	document.body.appendChild(iframe);

	var IframeArray = iframe.contentWindow.Array;

	equal( $.isArray( new IframeArray() ), true, 'Arrays from other iframes are Arrays' );

	document.body.removeChild(iframe);
});

QUnit.test('$.isArrayLike', function(){
	ok( $.isArrayLike([]), 'An array is array like' );
	ok( $.isArrayLike(arguments), 'Arguments is array like' );
	ok( $.isArrayLike({length: 0}), 'length: 0 is array like' );
	ok( $.isArrayLike({length: 5, "4": undefined}),
		'length > 0 and has property is array like' );

	ok( !$.isArrayLike(null), 'Null is not array like' );
	ok( !$.isArrayLike({}), 'Plain object is not array like' );
	ok( !$.isArrayLike({length: -1}), 'length: -1 is not array like' );
});

QUnit.test('$.each', function(){
	expect(9);
	var collection = ['a','b'];
	var res = $.each(collection, function(index, value){
		if(index === 0 )	equal(value, 'a');
		else if(index === 1 ) equal(value, 'b');
		else ok(false,'called back with a bad index');
	});
	equal(collection, res);

	collection = {foo: 'bar', zed: 'ted'};
	res = $.each(collection, function(prop, value){
		if(prop === 'foo' )		 equal(value, 'bar');
		else if(prop === 'zed' ) equal(value, 'ted');
		else ok(false,'called back with a bad index');
	});
	equal(collection, res);

	collection = {0:'a', 1:'b', length: 2};
	res = $.each(collection, function(index, value){
		if(index === 0 )	equal(value, 'a');
		else if(index === 1 ) equal(value, 'b');
		else ok(false,'called back with a bad index');
	});
	equal(collection, res);
});

QUnit.test('$.makeArray', function(){

	var childNodes = document.body.childNodes;

	ok(! $.isArray(childNodes), 'node lists are not arrays' );

	var childArray = $.makeArray(childNodes);

	ok( $.isArray(childArray), 'made an array'	);

	equal(childArray.length, childNodes.length, 'lengths are the same');

	for(var i =0; i < childArray.length; i++){
		equal(childArray[i], childNodes[i], 'array index '+i+' is equal.');
	}
});

QUnit.test('$.proxy', function(){

	var dog = {
		name: 'fido',
		speak: function(words){
			return this.name + ' says '+words;
		}
	};

	var speakProxy = $.proxy(dog.speak, dog);

	equal( speakProxy('woof!'), 'fido says woof!' );
});

QUnit.test('new $(selector)', function(){
	document.getElementById('qunit-fixture').innerHTML = `
		<ul id="contacts">
			<li class="contact"/>
			<li class="contact"/>
		</ul>`;

	var $contacts = new $('#contacts li.contact');
	equal( $contacts.length,  2, 'There are 2 contacts');

	equal( $contacts[0].nodeName.toLowerCase(), 'li', 'got an li');
	equal( $contacts[1].className, 'contact', 'got a .contact');

	ok($contacts instanceof $, '$ is an instance of my_jquery');
});

QUnit.test('$.fn.html', function(){
	new $('#qunit-fixture').html('<ul id="contacts"><li class="contact"></li><li class="contact"></li></ul>');
	new $('.contact').html('Hi There');

	equal(new $('.contact').html(), 'Hi There', 'First contact html set correctly');
	equal(new $('.contact:nth-child(2)').html(), 'Hi There', 'Second contact html set correctly');
});

QUnit.test('$.fn.val', function(){

	new $('#qunit-fixture').html('<input type="text" class="age"/><input type="text" class="age"/>');


	equal( new $('.age').val(), '', 'Input is initially empty');

	new $('.age').val('Hi There');

	equal( new $('.age').val(), 'Hi There', 'First .age value set correctly');

	equal( new $('.age:nth-child(2)').val(), 'Hi There', 'Second .age value set correctly');
});

QUnit.test('$(selector)', function(){
	document.getElementById('qunit-fixture').innerHTML = '<ul id="contacts"><li class="contact"/><li class="contact"/></ul>';

	var $contacts = $('#contacts li.contact');
	equal( $contacts.length,  2, 'There are 2 contacts');

	equal( $contacts[0].nodeName.toLowerCase(), 'li', 'got an li');
	equal( $contacts[1].className, 'contact', 'got a .contact');

	ok($contacts instanceof $, 'instanceof $ without new');
});

QUnit.test('$.fn.text', function(){

	$('#qunit-fixture').html('Hi <span>there</span>.');

	equal( $('#qunit-fixture').text(), 'Hi there.', 'The text is right');

	$('#qunit-fixture span').text('<input/>');

	equal( $('#qunit-fixture input').length, 0, 'there\'s no input');

	equal( $('#qunit-fixture span').text(), '<input/>', 'The text is what we sent' );
});

QUnit.test('$.fn.find', function(){
	var $ul = $('#qunit-fixture')
		.html('<ul><li/><li/></ul><ul><li/><li/></ul>')
		.find('ul');

	equal($ul.length, 2, 'got 2 uls');
	equal($ul.find('li').length, 4, 'got four lis');
});

QUnit.test('$.fn.parent', function(){
	var $lis = $('#qunit-fixture')
		.html('<ul><li/><li/></ul><ul><li/><li/></ul>')
		.find('li:first-child');

	equal($lis.length, 2, 'got 2 uls');
	equal($lis.parent().length, 2, 'got 2 lis');
});

QUnit.test('$.fn.next', function(){
	var $lis = $('#qunit-fixture')
		.html('<ul> <li></li> <li></li> </ul> <ul> <li></li> <li></li> </ul>')
		.find('li:first-child');

	equal($lis.length, 2, 'got 2 lis');
	equal($lis.next().length, 2, 'got 2 lis');
	equal($lis.next().next().length, 0, 'got 0 lis');
});

QUnit.test('$.fn.prev', function(){
	var $lis = $('#qunit-fixture')
		.html('<ul><li/><li/></ul><ul><li/><li/></ul>')
		.find('li:last-child');

	equal($lis.length, 2, 'got 2 uls');
	equal($lis.prev().length, 2, 'got 2 lis');
	equal($lis.prev().prev().length, 0, 'got 2 lis');
});

QUnit.test('$.fn.children', function(){
	var $ul = $('#qunit-fixture')
		.html('<ul><li/><li/></ul><ul><li/><li/></ul>')
		.children();

	equal($ul.length, 2, 'got 2 uls');
	equal($ul.children().length, 4, 'got four lis');
});

QUnit.test('$.fn.attr', function(){
	equal( $('#qunit-fixture').attr('id'), 'qunit-fixture' ,'can read id' );

	$('#qunit-fixture').html('<span></span><span></span>');

	$('#qunit-fixture span').attr('foo','bar');

	equal($('#qunit-fixture span')[0].getAttribute('foo'), 'bar', 'attribute set successfully');
	equal($('#qunit-fixture span')[1].getAttribute('foo'), 'bar', 'attribute set successfully');

	$('#qunit-fixture span')[0].setAttribute('foo','BAR');

	equal($('#qunit-fixture span').attr('foo'), 'BAR', 'read the first item in the collection\'s attr');
});

QUnit.test('$.fn.css', function(){
	$('#qunit-fixture').html('<span>Content</span><span>Second</span>');
	equal( $('#qunit-fixture span').css('padding-left'), '20px');

	$('#qunit-fixture span').css('paddingLeft', '40px');

	equal( $('#qunit-fixture span').css('padding-left'), '40px','first span set to 40px');
	equal( $('#qunit-fixture span:nth-child(2)').css('padding-left'),'40px', 'second span set to 40px');
});

QUnit.test('$.fn.addClass and $.fn.removeClass', function(){
	var count = function(reg, str){
		var c = 0;
		str.replace(reg, function(){
			c++;
		});
		return c;
	};

	var $divs = $('#qunit-fixture').html('<div class="foo"></div><div class="foob"></div>')
		.children();

	$divs.addClass('foo');

	equal( 1, count( /foo/,$divs[0].className ), 'only one foo' );
	equal( 1, count( /foo/,$divs[1].className ), 'only one foo' );


	$divs.addClass('foob');

	equal( 1, count( /foob/,$divs[0].className ), 'only one foo' );
	equal( 1, count( /foob/,$divs[1].className ), 'only one foo' );

	$divs.removeClass('foob');
	equal( 0, count( /foob/,$divs[0].className ), 'only one foo' );
	equal( 0, count( /foob/,$divs[1].className ), 'only one foo' );

	$divs.removeClass('foo');
	equal( 0, count( /foo/,$divs[0].className ), 'only one foo' );
	equal( 0, count( /foo/,$divs[1].className ), 'only one foo' );
});

QUnit.test('$.fn.width', function(){
	$('#qunit-fixture').html('<div class="big-width"><div>Element</div></div>');
	equal( $('#qunit-fixture .big-width div').width(), 1000 - 60, 'width is correct');
});

QUnit.test('$.fn.show and $.fn.hide', function(){
	$('#qunit-fixture').html('<div id="el">text</div>');

	equal( $('#el').hide()[0].style.display, 'none');
	equal( $('#el').show()[0].style.display, '');
});

QUnit.test('$.fn.offset', function(){
	var bigWidth = document.createElement('div'),
	row1 = document.createElement('div'),
	row2 = document.createElement('div'),
	pos = document.createElement('div');

	bigWidth.className = 'big-width';
	row1.className = 'row';
	row2.className = 'row';
	pos.id = 'pos';

	bigWidth.appendChild(row1);
	bigWidth.appendChild(row2);
	row2.appendChild(pos);

	document.body.appendChild(bigWidth);

	var offset = $('#pos').offset();

	equal( offset.top, 120, 'top' );
	equal( offset.left, -990, 'left');

	//cleaning up after our test
	var node = $('.big-width')[0];
	node.parentNode.removeChild(node);
});

QUnit.test('$.fn.bind and $.fn.unbind', function(){

	expect(2);

	$('#qunit-fixture').html('<div id="el">text</div>');

	var handler = function(ev){
		equal(this.nodeName.toLowerCase(), 'div', 'event called on div');
		equal(ev.type, 'click', 'click event');
	}

	$('#el').bind('click',handler);


	clickIt( $('#el')[0] );


	$('#el').unbind('click',handler);

	clickIt( $('#el')[0] );
});

QUnit.test('$.fn.is', function(){

	expect(3);

	var elements = $([
		document.createElement("div"),
		document.createElement("span")
	]);

	ok(elements.is("div"), "is div");
	ok(elements.is("span"), "is span");
	ok(!elements.is("a"), "is a");
});

QUnit.test('$.fn.data', function(){

	$('#qunit-fixture').html('<div id="el">text</div>');

	$('#el').data('foo', 'bar');

	equal( $('#el').data('foo'), 'bar' ,'got back bar' );
});

QUnit.test('$.fn.on', function(){
	expect(3);

	var handler = function(){
		equal(this.nodeName.toLowerCase(), 'li', 'called back with an LI')
	}

	var $ul = $('#qunit-fixture').html(`
		<ul>
			<li><span id="one"/></li>
			<li><span id="two"/></li>
		</ul>`)
		.children()

	$ul.on('click', 'li', handler);

	clickIt( $('#one')[0] );
	clickIt( $('#two')[0] );

	$ul.html('<li><span id="three"></span></li>');
	clickIt( $('#three')[0] );
});

QUnit.test('$.fn.off', function(){
	expect(0);

	var handler = function(){
		equal(this.nodeName.toLowerCase(), 'li', 'called back with an LI')
	}

	var $ul = $('#qunit-fixture').html(`
		<ul>
			<li><span id="one"/></li>
			<li><span id="two"/></li>
		</ul>`)
		.children();

	$ul.on('click', 'li', handler);
	$ul.off('click', 'li', handler);

	clickIt( $('#one')[0] );
});

QUnit.test("$.fn", function(){
	expect(2);

	var div = document.createElement("div");

	$.fn.myPlugin = function(){
		QUnit.equal(this.length, 1);
		QUnit.equal(this[0], div);
	};

	$([div]).myPlugin();

});
