import React from 'react';
import Layout from 'components/layout/Layout';
import ClaimsList from 'components/ClaimsList';

const Main: React.FC = () => {
  return (
    <Layout>
      <ClaimsList />
    </Layout>
  );
};

export default Main;
