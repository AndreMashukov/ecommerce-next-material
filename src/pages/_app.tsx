import React from 'react';
import App from 'next/app';
import AppComponentProps from 'next/app';
import withMaterial, { MaterialAppComponentProps } from '../theme/withMaterial';
import Store from '../store/Store';
import { NavBar, Footer, Layout } from '../components';
import { Section } from '../models/Section';
import { getSections } from '../services/CatalogApi';
import { PRODUCT_CATALOG_ID } from '../constants';

interface NavBarProps {
  sections: Section[];
  categories: Category[];
}

interface Category {
  categoryId: number;
  categoryName: string;
}

interface Props extends AppComponentProps, MaterialAppComponentProps {
  sectionList: Section[];
  categoryList: Category[];
}

const getCategories = (sections: Section[]): Category[] => {
  const categories: Category[] = [];
  !!sections && sections.forEach(item => {
    const category: Category = {
      categoryId: item.categoryId,
      categoryName: item.categoryName
    };

    // tslint:disable-next-line: no-shadowed-variable
    if (item.categoryId > 0 && !categories.find(_item => _item.categoryId === category.categoryId)) {
      categories.push(category);
    }
  });

  return categories;
};

class MyApp extends App<Props> {
  render() {
    // pageContext is from withMaterial
    const { Component, pageProps, pageContext, sectionList, categoryList } = this.props;
    const navBarProps: NavBarProps = {
      sections: sectionList,
      categories: categoryList
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

MyApp.getInitialProps = async () => {
  const sections: Section[] = await getSections(PRODUCT_CATALOG_ID);

  return {
    pageProps: {},
    sectionList: sections,
    categoryList: getCategories(sections)
  };
};

export default withMaterial(MyApp);
