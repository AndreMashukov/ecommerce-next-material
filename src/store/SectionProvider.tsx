import React from 'react';

const { createContext, useContext } = React;

const SectionContext = createContext(null);

const SECTIONS = [
  {
    id: 30,
    blockId: 4,
    sectionId: 29,
    name: 'Очищение',
    description: '',
    code: 'purification'
  }
];

// tslint:disable-next-line: no-any
export const SectionProvider = (props: any) => {
  const value = {
    sections: SECTIONS
  };

  return (
    <SectionContext.Provider value={value}>
      {props.children}
    </SectionContext.Provider>
  );
};

export const useSection = () => {
  return useContext(SectionContext);
};

