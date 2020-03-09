import React from 'react';

interface Section {
    id: number;
    blockId: number;
    sectionId: number;
    name: string;
    description: string;
    code: string;
}

export default React.createContext({ setSections: (sections: Section[]) => {
  // tslint:disable-next-line: no-console
  console.log(sections);
} });
