import { ISetGroupAction, ISetStatusAction } from '../actions/tabs';

export interface ITabs {
  group: string;
  status: number | null;
}

export type TTabsAction = ISetGroupAction | ISetStatusAction;
