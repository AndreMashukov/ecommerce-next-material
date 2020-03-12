import React from 'react';

const { createContext, useContext } = React;

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

const getAllSections = () => {
  return { sections: SECTIONS };
};

export const SectionContext = createContext({
  getAll: getAllSections()
});


// tslint:disable-next-line: no-any
export const SectionProvider = (props: any) => {
  const value = {
    getAll: getAllSections()
  };

  return (
    <SectionContext.Provider value={value}>
      {props.children}
    </SectionContext.Provider>
  );
};

export const useSections = () => {
  return useContext(SectionContext);
};
