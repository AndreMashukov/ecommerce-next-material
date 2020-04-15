import './Home.scss';
import { Section } from '../../models';

interface HomeProps {
  sections: Section[];
}

export const Home = (props: HomeProps) => {
  // tslint:disable-next-line: no-unused-expression
  console.log(props);

  return (
    <div className="home-root">
    </div>
  );
};
