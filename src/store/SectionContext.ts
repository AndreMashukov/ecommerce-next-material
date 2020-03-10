import React from 'react';
import { Section } from '../models';

export default React.createContext({ setSections: (sections: Section[]) => {
  // tslint:disable-next-line: no-console
  console.log(sections);
} });
