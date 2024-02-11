export interface ApiResponse<Data> {
  data: Data | null;
  error: Error | null;
}

interface PendingState {
  data: null
  error: null
  isPending: true
}

interface ResolvedState<Data> {
  data: Data | null
  error: Error | null
  isPending: false
}

export type PromiseState<Data> =
  | PendingState
  | ResolvedState<Data>
