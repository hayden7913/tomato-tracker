import { BASE_URL } from  '../srcConfig/baseURL';
import { push } from 'react-router-redux';

import { configureStore } from '../store/configureStore';
const store = configureStore();

export const routeToProjectsPage = () => {
  store.dispatch(push('/projects'));
  window.scrollTo(0, 0);
};

export const routeToTimerPage = () => {
  store.dispatch(push('/'));
  window.scrollTo(0, 0);
};
