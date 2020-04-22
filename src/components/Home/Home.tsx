import React from 'react';
import './Home.scss';

export const Home = () => {
  return (
    React.useMemo(() => HomeMemo(), [])
  );
};

const HomeMemo = () => {
  return (
      <div className="home-root">
      </div>
  );
}