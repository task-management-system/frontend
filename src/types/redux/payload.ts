export interface ICachePayload<T> {
  timestamp: number;
  duration: number;
  name: string;
  data: T;
}
