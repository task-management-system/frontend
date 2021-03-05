export interface CachePayload<T> {
  timestamp: number;
  duration: number;
  name: string;
  data: T;
}
