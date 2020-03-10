import './Home.scss';
import { Section } from '../../models';

interface HomeProps {
  sections: Section[];
}

export const Home = (props: HomeProps) => {
  return (
    <div className="card-root">
      <div>
        {props.sections.map(category => (
          <div key={category.code}>
            {category.name}
          </div>
        ))}
      </div>
    </div>
  );
};
