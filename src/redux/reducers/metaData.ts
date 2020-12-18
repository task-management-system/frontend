import { TAction, IMetaData } from '../types';

const initialState: IMetaData = {};

const metaDataRecuder = (state: IMetaData = initialState, action: TAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default metaDataRecuder;
