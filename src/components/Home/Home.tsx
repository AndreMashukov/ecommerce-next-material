import './Home.scss';
import { Section } from '../../models';
import { SectionList } from '../SectionList/SectionList';

interface HomeProps {
  sections: Section[];
}

export const Home = (props: HomeProps) => {
  return (
    <div className="home-root">
      <SectionList {...props} />
    </div>
  );
};
