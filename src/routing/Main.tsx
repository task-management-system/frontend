import React from 'react';
import Layout from 'components/layout/Layout';
import TaskGrid from 'components/TaskGrid';

const Main: React.FC = () => {
  return (
    <Layout>
      <TaskGrid />
    </Layout>
  );
};

export default Main;
