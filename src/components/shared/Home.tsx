import React from 'react';

export const Home = () => {
  return React.useMemo(() => HomeMemo(), []);
};

const HomeMemo = () => {
  return <div></div>;
};
