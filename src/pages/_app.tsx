import React from 'react';
import App from 'next/app';
import AppComponentProps from 'next/app';
import withMaterial, { MaterialAppComponentProps } from '../theme/withMaterial';
import Store from '../store/Store';
import { NavBar, Footer, Layout, AdminFooter, AdminBar } from '../components';
import { Section, Category } from 'models';
import { getSections } from '../services/CatalogApi';
import { PRODUCT_CATALOG_ID } from '../constants';
import axios, { AxiosError } from 'axios';
import { retrieveUser, storeUser, removeUser } from '../utils/User';
import moment from 'moment';
import { refreshToken } from '../services/TokenApi';
import { withRouter } from 'next/router';
import { CustomSnackBar } from '../components/shared';
import CircularProgress from '@material-ui/core/CircularProgress';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { Roles } from '../models/Roles';

const REFRESH_TOKEN_FREQ = 5;
const REFRESH_TOKEN_FREQ_UNIT = 'days';

interface AppState {
  snackOpen: boolean;
  handleSnackClose: () => void;
  sectionList: Section[];
  categoryList: Category[];
  isLoading: boolean;
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
  isAdminSection = false;

  setLoading(flag: boolean) {
    this.setState({
      ...this.state,
      ...{
        isLoading: flag
      }
    });
  }

  state: AppState = {
    snackOpen: false,
    handleSnackClose: () => {
      this.setState({
        ...this.state,
        ...{
          snackOpen: false
        }
      });
    },
    sectionList: [],
    categoryList: [],
    isLoading: false
  };

  handleSnackOpen() {
    this.setState({
      ...this.state,
      ...{
        snackOpen: true
      }
    });
  }

  router = this.props.router;

  handleAdminRoutes() {
    if (this.router.route.toString().match(/^\/admin/)) {
      const user = retrieveUser();
      if (!user || !user.metadata.roles.includes(Roles.Admin)) {
        this.router.push('/403');
      } else {
        this.isAdminSection = true;
      }
    }
  }

  handleAxiosRequest() {
    axios.interceptors.request.use(
      async (config) => {
        this.setLoading(true);
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
  }

  handleAxiosResponse() {
    axios.interceptors.response.use(
      (response) => {
        this.setLoading(false);
        return response;
      },
      (error: AxiosError) => {
        const { status } = error.response;
        if (status && status === (403 || 401)) {
          removeUser();
          this.handleSnackOpen();
          this.router.push('/auth');
        }
        this.setLoading(false);
        return Promise.reject(error);
      }
    );
  }

  UNSAFE_componentWillReceiveProps() {
    if (this.router.route.toString().match(/^\/admin/)) {
      this.isAdminSection = true;
    } else {
      this.isAdminSection = false;
    }
  }

  componentDidMount() {
    this.handleAdminRoutes();
    this.handleAxiosRequest();
    this.handleAxiosResponse();

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
        {this.isAdminSection ? <AdminBar /> : <NavBar {...navBarProps} />}
        <Layout>
          <Component pageContext={pageContext} {...pageProps} />
        </Layout>
        <CustomSnackBar
          open={this.state.snackOpen}
          success={false}
          text={'Время вашей сессии истекло. Введите ваш Е-Майл/Пароль'}
          handleClose={this.state.handleSnackClose}
        />
        {this.state.isLoading && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%'
            }}
          >
            <CircularProgress color="secondary" size={70} thickness={5} />
          </div>
        )}
        {this.isAdminSection ? <AdminFooter/> : <Footer />}
      </Store>
    );
  }
}

export default withMaterial(withRouter(MyApp));
