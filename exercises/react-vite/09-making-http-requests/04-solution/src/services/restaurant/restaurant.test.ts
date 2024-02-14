import { getCities, getStates } from './restaurant';
import { apiRequest } from "../api";
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mocking the apiRequest function
vi.mock('../api', () => ({
  apiRequest: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Restaurant service', () => {
  describe('getCities function', () => {
    it('should return cities for a given state', async () => {
      const mockResponse = { data: { data: ['City1', 'City2'] }, error: null };
      apiRequest.mockResolvedValue(mockResponse);

      const response = await getCities('TestState');
      expect(response).toEqual({ data: ['City1', 'City2'], error: null });
      expect(apiRequest).toHaveBeenCalledWith({
        method: 'GET',
        path: '/cities',
        params: { state: 'TestState' },
      });
    });
  });

  describe('getStates function', () => {
    it('should return a list of states', async () => {
      const mockResponse = { data: { data: ['State1', 'State2'] }, error: null };
      apiRequest.mockResolvedValue(mockResponse);

      const response = await getStates();
      expect(response).toEqual({ data: ['State1', 'State2'], error: null });
      expect(apiRequest).toHaveBeenCalledWith({
        method: 'GET',
        path: '/states',
      });
    });
  });
});
