import React, { useContext, useEffect } from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import theme from '../theme/theme';
import { parseCookies, setCookie } from 'nookies';
// import { NextPageContext } from 'next';
import { Session } from '../models';
import { createNewSession } from '../services/SessionApi';
import SessionContext from '../store/SessionContext/SessionContext';
import SessionContextManager from '../store/SessionContext/SessionContextManager';

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <ContextComponent {...this.props}/>
        </body>
      </html>
    );
  }
}

MyDocument.getInitialProps = async ctx => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />)
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    context: ctx
  };
};

// tslint:disable-next-line: no-any
const ContextComponent = (props: any) => {
  const { setSessionId } = useContext<SessionContextManager>(SessionContext);
  const { context } = props;
  const { fuserId } = parseCookies(context);

  if (fuserId !== undefined) {
    setSessionId(parseInt(fuserId, 0));
  } else {
    createNewSession().then((session: Session) => {
      setCookie(context, 'fuserId', session.id.toString(), {
        maxAge: 30 * 24 * 60 * 60,
        path: '/'
      });
      setSessionId(session.id);
    });
  }

  return (
    <>
    </>
  );
};
