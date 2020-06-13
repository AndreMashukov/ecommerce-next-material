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
import { retrieveUser, storeUser, removeUser } from '../utils/User';
import moment from 'moment';
import { refreshToken } from '../services/TokenApi';
import { withRouter } from 'next/router';

const REFRESH_TOKEN_FREQ = 5;
const REFRESH_TOKEN_FREQ_UNIT = 'days';

interface AppState {
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
    sectionList: [],
    categoryList: []
  };

  componentDidMount() {
    const { router } = this.props;
    axios.interceptors.request.use(
      async (config) => {
        const user = retrieveUser();
        if (
          moment(user.tokenTime).add(
            REFRESH_TOKEN_FREQ,
            REFRESH_TOKEN_FREQ_UNIT
          ) < moment()
        ) {
          const refreshedUser = await refreshToken({
            userId: user.id,
            refreshToken: user.refreshToken
          });
          if (refreshedUser.token) {
            storeUser(refreshedUser);
          }
        }
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
        if ((status && status === 403) || 401) {
          removeUser();
          router.push('/auth');
        }
        return Promise.reject(error);
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
      </Store>
    );
  }
}

export default withMaterial(withRouter(MyApp));
