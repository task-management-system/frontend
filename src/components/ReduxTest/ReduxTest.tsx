import React from 'react';
import { connect } from 'react-redux';
import { TState, IMetaData } from 'redux/types';

interface IProps {
  metaData: IMetaData;
}

const ReduxTest = (props: IProps) => {
  return (
    <>
      <mark>ReduxTest</mark> component
      <pre>{JSON.stringify(props.metaData, null, 4)}</pre>
    </>
  );
};

const mapStateToProps = (state: TState) => ({
  metaData: state.metaData,
});

export default connect(mapStateToProps)(ReduxTest);
