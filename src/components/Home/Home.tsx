import './Home.scss';
import { Section } from '../../models';
import Link from 'next/link';

interface HomeProps {
  sections: Section[];
}

export const Home = (props: HomeProps) => {
  return (
    <div className="card-root">
      <div>
        {props.sections.map(category => (
          <div key={category.code}>
            <Link href={'/catalog/mirra-test/' + category.code} prefetch={false}>
              {category.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
