import './Home.scss';
import { Section } from '../../models';
import Link from 'next/link';
import { Typography } from '@material-ui/core';

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
              <Typography color="textSecondary">
                {category.name}
              </Typography>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
