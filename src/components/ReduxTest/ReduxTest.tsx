import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { TState, IMetaData } from 'redux/types';
import { auth, token } from 'api/v1';
import localForage from 'localforage';

interface IProps {
  metaData: IMetaData;
}

const ReduxTest = (props: IProps) => {
  React.useEffect(() => {
    token('test', 'password').then(async response => {
      await localForage.setItem('token', response.data?.token);

      auth()
        .then(console.log)
        .catch(() => {
          localForage.removeItem('token');
        });
    });
  }, []);

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
