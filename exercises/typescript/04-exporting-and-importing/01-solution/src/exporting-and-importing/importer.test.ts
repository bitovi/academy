import assert from 'node:assert';
import { describe, it } from 'node:test';
import getMessageWithGreeting from "./importer";

describe('Importer', () => {
	it('should return a greeting', () => {
		const message = getMessageWithGreeting();
		assert.strictEqual(message, "Hello, Earth", "message should be correct");
	});
});