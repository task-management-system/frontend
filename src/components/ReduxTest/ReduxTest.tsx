import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { TState, IMetaData } from 'redux/types';

interface IProps {
  metaData: IMetaData;
}

const ReduxTest = (props: IProps) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="body1">
          <mark>ReduxTest</mark> component
        </Typography>
        <pre>{JSON.stringify(props.metaData, null, 4)}</pre>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state: TState) => ({
  metaData: state.metaData,
});

export default connect(mapStateToProps)(ReduxTest);
