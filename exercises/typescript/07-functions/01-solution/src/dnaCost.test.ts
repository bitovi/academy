import assert from 'node:assert';
import { describe, it } from 'node:test';
import {dnaCost} from "./dnaCost";

describe('Functions: dnaCost', () => {

	it('can be called with two arguments', () => {
		assert.equal( dnaCost(2500, 'abc'), 2503);
	});

	it('can be called with many arguments', () => {
		assert.equal( dnaCost(2500, 'abc', 'de', 'f'), 2506);
	});

});