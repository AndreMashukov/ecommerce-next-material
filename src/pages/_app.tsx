import React from 'react';
import App from 'next/app';
import AppComponentProps from 'next/app';
import withMaterial, { MaterialAppComponentProps } from '../theme/withMaterial';
import Store from '../store/Store';
import { NavBar, Footer, Layout } from '../components';
import { Section, Category } from '../models/Section';
import { getSections } from '../services/CatalogApi';
import { PRODUCT_CATALOG_ID } from '../constants';
import axios, { AxiosError } from 'axios';
import { retrieveUser } from '../utils/User';
import { LoginDialog } from '../components/shared';

interface AppState {
  loginDialogOpen: boolean;
  handleLoginDialogClose: () => void;
  sectionList: Section[];
  categoryList: Category[];
}

interface Props extends AppComponentProps, MaterialAppComponentProps {
  _sessionId: string;
}

const getCategories = (sections: Section[]): Category[] => {
  const categories: Category[] = [];
  !!sections &&
    sections.forEach((item) => {
      const category: Category = {
        categoryId: item.categoryId,
        categoryName: item.categoryName
      };

      if (
        item.categoryId > 0 &&
        !categories.find((_item) => _item.categoryId === category.categoryId)
      ) {
        categories.push(category);
      }
    });

  return categories;
};

class MyApp extends App<Props> {
  // tslint:disable-next-line: no-any
  static async getInitialProps({ Component, ctx }: any) {
    let pageProps = { _sessionId: '' };
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  state: AppState = {
    loginDialogOpen: false,
    handleLoginDialogClose: () => {
      this.setState({
        ...this.state,
        ...{
          loginDialogOpen: false
        }
      });
    },
    sectionList: [],
    categoryList: []
  };

  componentDidMount() {
    axios.interceptors.request.use(
      (config) => {
        config.headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${retrieveUser().token}`
        };
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error: AxiosError) => {
        const { status } = error.response;
        if (status === 403) {
          // tslint:disable-next-line: no-console
          console.log('status: ', status);
          this.setState({
            ...this.state,
            ...{
              loginDialogOpen: true
            }
          });
        }
        return Promise.reject(status);
      }
    );

    getSections(PRODUCT_CATALOG_ID).then((resp) => {
      this.setState({
        ...this.state,
        ...{
          sectionList: resp,
          categoryList: getCategories(resp)
        }
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
        <NavBar {...navBarProps} />
        <Layout>
          <Component pageContext={pageContext} {...pageProps} />
        </Layout>
        <Footer />
        <LoginDialog
          isOpen={this.state.loginDialogOpen}
          handleClose={this.state.handleLoginDialogClose}
        />
      </Store>
    );
  }
}

export default withMaterial(MyApp);
