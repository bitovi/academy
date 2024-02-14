import { getStates } from './restaurant';
import { describe, expect, it } from 'vitest';

describe('Restaurant service', () => {
  describe('getStates function', () => {
    it('should return a list of states', async () => {
      const response = await getStates();
      expect(response).toEqual({
        data: [
          { name: 'Illinois', short: 'IL' },
          { name: 'Wisconsin', short: 'WI' },
        ], error: null
      });
    });
  });
});
