export function test ( _test , name , List ) {

	var listToArrayForward = function (list) {
		var array = [];

		var it = list.begin();

		var e;

		while (!(e = it.next()).done){
			array.push(e.value);
		}

		return array;
	} ;

	var listToArrayBackward = function (list) {
		var array = [];

		var it = list.rbegin();

		var e;

		while (!(e = it.next()).done){
			array.push(e.value);
		}

		return array;
	} ;

	_test( name , t => {

		var i, j, k, n, m, it, a, b, v, first, last;

		var list = new List();

		t.deepEqual(list.length, 0, "length is 0");


		var expectedArrayForward = [];
		var expectedArrayBackward = [];

		var arrayForward = [];
		var arrayBackward = [];

		var add20 = function(){

			n = 10;

			for (i = 1; i <= n; ++i) {
				list.push(i);
				expectedArrayForward.push(i);
				expectedArrayBackward.unshift(i);
				t.deepEqual(list.length, i, "length is " + i);

				arrayForward = listToArrayForward(list);
				arrayBackward = listToArrayBackward(list);

				t.deepEqual(arrayForward, expectedArrayForward, "content is equal");
				t.deepEqual(arrayBackward, expectedArrayBackward, "content is equal");
			}

			n = 20;

			for (; i <= n; ++i) {
				list.unshift(i);
				expectedArrayForward.unshift(i);
				expectedArrayBackward.push(i);
				t.deepEqual(list.length, i, "length is " + i);

				arrayForward = listToArrayForward(list);
				arrayBackward = listToArrayBackward(list);

				t.deepEqual(arrayForward, expectedArrayForward, "content is equal");
				t.deepEqual(arrayBackward, expectedArrayBackward, "content is equal");
			}

		};

		var del20 = function(){

			n = 10;

			for (i = 20; i > n; --i) {
				t.deepEqual(list.length, i, "length is " + i);

				v = list.pop();
				a = expectedArrayForward.pop();
				b = expectedArrayBackward.shift();
				t.deepEqual(v, a, "popped value a === " + a);
				t.deepEqual(v, b, "popped value b === " + a);

				arrayForward = listToArrayForward(list);
				arrayBackward = listToArrayBackward(list);

				t.deepEqual(arrayForward, expectedArrayForward, "content is equal");
				t.deepEqual(arrayBackward, expectedArrayBackward, "content is equal");
			}

			n = 0;

			for (; i > n; --i) {
				t.deepEqual(list.length, i, "length is " + i);

				v = list.shift();
				a = expectedArrayForward.shift();
				b = expectedArrayBackward.pop();
				t.deepEqual(v, a, "shifted value a === " + a);
				t.deepEqual(v, b, "shifted value b === " + a);

				arrayForward = listToArrayForward(list);
				arrayBackward = listToArrayBackward(list);

				t.deepEqual(arrayForward, expectedArrayForward, "content is equal");
				t.deepEqual(arrayBackward, expectedArrayBackward, "content is equal");
			}
		};

		var clear = function(){
			list.clear();
			expectedArrayForward.splice(0);
			expectedArrayBackward.splice(0);
		};

		clear();
		add20();
		del20();

		t.deepEqual(list.length, 0, "length is 0");

		v = list.shift();
		t.deepEqual(v, null, "v === null");

		v = list.pop();
		t.deepEqual(v, null, "v === null");

		t.deepEqual(list.length, 0, "length is 0");

		clear();
		add20();

		clear();

		t.deepEqual(list.length, 0, "length is 0");

		arrayForward = listToArrayForward(list);
		arrayBackward = listToArrayBackward(list);

		t.deepEqual(arrayForward, expectedArrayForward, "content is equal");
		t.deepEqual(arrayBackward, expectedArrayBackward, "content is equal");

		clear();
		add20();

		first = list.begin();
		last = list.end();
		first.next();

		list.eraserange(first, last);
		expectedArrayForward.splice(0);
		expectedArrayBackward.splice(0);

		t.deepEqual(list.length, 0, "length is 0");

		arrayForward = listToArrayForward(list);
		arrayBackward = listToArrayBackward(list);

		t.deepEqual(arrayForward, expectedArrayForward, "content is equal");
		t.deepEqual(arrayBackward, expectedArrayBackward, "content is equal");

		clear();
		add20();

		first = list.rbegin();
		last = list.rend();
		first.next();

		list.reraserange(first, last);
		expectedArrayForward.splice(0);
		expectedArrayBackward.splice(0);

		t.deepEqual(list.length, 0, "length is 0");

		arrayForward = listToArrayForward(list);
		arrayBackward = listToArrayBackward(list);

		t.deepEqual(arrayForward, expectedArrayForward, "content is equal");
		t.deepEqual(arrayBackward, expectedArrayBackward, "content is equal");


		clear();
		add20();

		m = 5;

		first = list.begin();
		last = list.end();
		first.next();
		for (i = 0; i < m; ++i) {
			first.next();
			last.prev();
		}

		list.eraserange(first, last);
		expectedArrayForward.splice(m, n - m - m);
		expectedArrayBackward.splice(m, n - m - m);

		t.deepEqual(list.length, expectedArrayForward.length, "length check");
		t.deepEqual(list.length, expectedArrayBackward.length, "length check");

		arrayForward = listToArrayForward(list);
		arrayBackward = listToArrayBackward(list);

		t.deepEqual(arrayForward, expectedArrayForward, "content is equal");
		t.deepEqual(arrayBackward, expectedArrayBackward, "content is equal");

		clear();
		add20();

		m = 5;

		first = list.rbegin();
		last = list.rend();
		first.next();
		for (i = 0; i < m; ++i) {
			first.next();
			last.prev();
		}

		list.reraserange(first, last);
		expectedArrayForward.splice(m, n - m - m);
		expectedArrayBackward.splice(m, n - m - m);

		t.deepEqual(list.length, expectedArrayForward.length, "length check");
		t.deepEqual(list.length, expectedArrayBackward.length, "length check");

		arrayForward = listToArrayForward(list);
		arrayBackward = listToArrayBackward(list);

		t.deepEqual(arrayForward, expectedArrayForward, "content is equal");
		t.deepEqual(arrayBackward, expectedArrayBackward, "content is equal");
	});

}
