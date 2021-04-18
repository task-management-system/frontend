import { SetGroupAction, SetStatusAction, ResetStatusAction } from '../actions/tabs';

export interface Tabs {
  group: string;
  status: number | null;
}

export type TabsAction = SetGroupAction | SetStatusAction | ResetStatusAction;
