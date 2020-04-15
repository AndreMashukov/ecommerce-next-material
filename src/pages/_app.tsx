import React from 'react';
import App from 'next/app';
import AppComponentProps from 'next/app';
import withMaterial, { MaterialAppComponentProps } from '../theme/withMaterial';
import Store from '../store/Store';
import { NavBar, Footer, Layout } from '../components';
import { Section, Category } from '../models/Section';
import { getSections } from '../services/CatalogApi';
import { PRODUCT_CATALOG_ID } from '../constants';

interface AppState {
  sectionList: Section[];
  categoryList: Category[];
}

interface Props extends AppComponentProps, MaterialAppComponentProps {}

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
      <Store>
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
