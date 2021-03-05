import { User, Permission, Status } from 'types';
import { SetUserAction, SetPermissionsAction, SetStatusesAction } from '../actions/metaData';

export interface MetaData {
  user: User | null;
  permissions: Permission[];
  statuses: Status[];
}

export type MetaDataAction = SetUserAction | SetPermissionsAction | SetStatusesAction;
