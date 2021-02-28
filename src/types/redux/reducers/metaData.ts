import { IUser, IPermission, IStatus } from 'types';
import { ISetUserAction, ISetPermissionsAction, ISetStatusesAction } from '../actions/metaData';

export interface IMetaData {
  user: IUser | null;
  permissions: IPermission[];
  statuses: IStatus[];
}

export type TMetaDataAction = ISetUserAction | ISetPermissionsAction | ISetStatusesAction;
