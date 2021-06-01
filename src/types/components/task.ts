import { DetailedReceivedTask, DetailedCreatedTask } from 'types';
import { PartialProperties } from 'types/common';

export type TaskViewEntry = PartialProperties<DetailedReceivedTask, 'parent'> &
  PartialProperties<DetailedCreatedTask, 'taskInstances'>;

export type ActionCondition = (
  data: TaskViewEntry | null,
  permissions: Record<string, boolean>
) => boolean;
