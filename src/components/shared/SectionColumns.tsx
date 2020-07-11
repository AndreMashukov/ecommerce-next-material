import { Section } from '../../models';
import Typography from '@material-ui/core/Typography';
import MatLink from '@material-ui/core/Link';
import {
  CATALOG_NAME,
  ROW_ITEMS_NUM
} from '../../constants';

export const SectionColumns = (sections: Section[], level: number) => {
  const sectionNum = sections.filter((item) => item.depthLevel === level)
    .length;
  const sectionColumn = new Array(Math.ceil(sectionNum / ROW_ITEMS_NUM));
  let index = 1;
  for (let i = 0; i < Math.ceil(sectionNum / ROW_ITEMS_NUM); i++) {
    sectionColumn[i] = (
      <div>
        {sections
          .filter((item) => item.depthLevel === level)
          .slice(i * ROW_ITEMS_NUM, index * ROW_ITEMS_NUM)
          .map((category) => (
            <div key={category.code}>
              <MatLink
                key={category.code}
                href={'/' + CATALOG_NAME + '/' + category.code}
              >
                <Typography variant="body2">{category.name}</Typography>
              </MatLink>
            </div>
          ))}
      </div>
    );
    index++;
  }
  // tslint:disable-next-line: no-console
  // console.log('sectionColumn', sectionColumn);
  return sectionColumn;
};