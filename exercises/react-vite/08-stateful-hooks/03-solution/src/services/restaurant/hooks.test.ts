import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useCities } from './hooks';

describe('useCities Hook', () => {
    it('should return cities from Wisconsin when state is WI', () => {
        const { result } = renderHook(() => useCities('WI'));
        expect(result.current).toHaveLength(1);
        expect(result.current[0].name).toBe('Madison');
    });

    it('should return cities from Illinois when state is IL', () => {
        const { result } = renderHook(() => useCities('IL'));
        expect(result.current).toHaveLength(1);
        expect(result.current[0].name).toBe('Springfield');
    });

    it('should return no cities for an unknown state', () => {
        const { result } = renderHook(() => useCities('CA'));
        expect(result.current).toHaveLength(0);
    });
});
