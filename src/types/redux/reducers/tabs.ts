import { SetGroupAction, SetStatusAction, ResetStatusAction } from '../actions/tabs';
import { TaskStatus } from 'enums/TaskStatus';

export interface Tabs {
  group: string;
  status: TaskStatus | null;
}

export type TabsAction = SetGroupAction | SetStatusAction | ResetStatusAction;
