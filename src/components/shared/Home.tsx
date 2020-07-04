import React from 'react';

export const Home: React.FC<{}>  = () => {
  return React.useMemo(() => HomeMemo(), []);
};

const HomeMemo = () => {
  return <div></div>;
};
