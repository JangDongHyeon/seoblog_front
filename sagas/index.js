import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import authSaga from './auth'
import categorySaga from './category'
import tagSaga from './tag'
import blogSaga from './blog'
import formSaga from './form'
import { backUrl } from '../config/config';


axios.defaults.baseURL = `${backUrl}`;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
    yield all([
        fork(authSaga),
        fork(tagSaga),
        fork(categorySaga),
        fork(blogSaga),
        fork(formSaga),
    ]);
}