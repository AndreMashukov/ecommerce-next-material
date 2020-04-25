import React from 'react';
import App from 'next/app';
import AppComponentProps from 'next/app';
import withMaterial, { MaterialAppComponentProps } from '../theme/withMaterial';
import Store from '../store/Store';
import { NavBar, Footer, Layout } from '../components';
import { Section, Category } from '../models/Section';
import { getSections } from '../services/CatalogApi';
import { PRODUCT_CATALOG_ID } from '../constants';
import { handleSession } from '../utils/handleSession';

interface AppState {
  sectionList: Section[];
  categoryList: Category[];
}

interface Props extends AppComponentProps, MaterialAppComponentProps {
  _sessionId: number;
}

const getCategories = (sections: Section[]): Category[] => {
  const categories: Category[] = [];
  !!sections && sections.forEach(item => {
    const category: Category = {
      categoryId: item.categoryId,
      categoryName: item.categoryName
    };

    if (item.categoryId > 0 && !categories.find(_item =>
        _item.categoryId === category.categoryId)) {
      categories.push(category);
    }
  });

  return categories;
};

class MyApp extends App<Props> {
  // tslint:disable-next-line: no-any
  static async getInitialProps({Component, ctx}: any) {
    let pageProps = {_sessionId: 0};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    pageProps._sessionId =  (await handleSession(ctx))._sessionId;
    return {pageProps};
  }

  state: AppState = {
    sectionList: [],
    categoryList: []
  };

  componentDidMount() {
    getSections(PRODUCT_CATALOG_ID).then(resp => {
      this.setState({
        sectionList: resp,
        categoryList: getCategories(resp)
      });
    });
  }

  render() {
    // pageContext is from withMaterial
    const { Component, pageProps, pageContext } = this.props;
    const navBarProps = {
      sections: this.state.sectionList,
      categories: this.state.categoryList
    };

    return (
      <Store {...pageProps}>
        <NavBar {...navBarProps}/>
        <Layout>
          <Component pageContext={pageContext} {...pageProps} />
        </Layout>
        <Footer />
      </Store>
    );
  }
}

export default withMaterial(MyApp);
