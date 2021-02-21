import { IUser, IPermission } from 'types';
import { ISetPermissionsAction, ISetUserAction } from '../actions/metaData';

export interface IMetaData {
  user: IUser | null;
  permissions: IPermission[];
}

export type TMetaDataAction = ISetUserAction | ISetPermissionsAction;
