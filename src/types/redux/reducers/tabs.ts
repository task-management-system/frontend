import { SetGroupAction, SetStatusAction } from '../actions/tabs';

export interface Tabs {
  group: string;
  status: number | null;
}

export type TabsAction = SetGroupAction | SetStatusAction;
