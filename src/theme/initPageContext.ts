import { Theme } from '@material-ui/core/styles';
import { ServerStyleSheets } from '@material-ui/styles';
import theme from './theme';

export interface MaterialPageContext {
  theme: Theme;
  sheets: ServerStyleSheets;
}

function createPageContext() {
  return {
    theme,
    sheets: new ServerStyleSheets()
  };
}

let pageContext: MaterialPageContext;

export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  // tslint:disable-next-line: no-any
  if (!(process as any).browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!pageContext) {
    pageContext = createPageContext();
  }

  return pageContext;
}