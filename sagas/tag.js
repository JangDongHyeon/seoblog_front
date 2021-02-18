import { takeLatest, put, all, call, fork, throttle, takeEvery } from 'redux-saga/effects';
import {
    TAG_GET_REQUEST, TAG_GET_SUCCESS, TAG_GET_FAILURE,
    TAGS_BLOGS_GET_REQUEST,
    TAGS_BLOGS_GET_FAILURE,
    TAGS_BLOGS_GET_SUCCESS,
    TAG_ADD_REQUEST,
    TAG_ADD_FAILURE,
    TAG_ADD_SUCCESS,
    TAG_DELETE_REQUEST,
    TAG_DELETE_FAILURE,
    TAG_DELETE_SUCCESS,
    TAG_READ_REQUEST,
    TAG_READ_FAILURE,
    TAG_READ_SUCCESS,
} from '../actions/types';
import axios from 'axios'


function tagGetAPI() {
    return axios.get('/tag/list');
}


function* tagGet() {
    try {

        const result = yield call(tagGetAPI);

        yield put({
            type: TAG_GET_SUCCESS,
            data: result.data,
        });

    }
    catch (error) {
        console.error(error);
        yield put({
            type: TAG_GET_FAILURE,
            error: error.response.data,
        });
    }
}

function tagBlogsGetAPI(data) {
    return axios.get(`/tag/${data}`);
}


function* tagBlogsGet(action) {
    try {

        const result = yield call(tagBlogsGetAPI, action.data);

        yield put({
            type: TAGS_BLOGS_GET_SUCCESS,
            data: result.data,
        });

    }
    catch (error) {
        console.error(error);
        yield put({
            type: TAGS_BLOGS_GET_FAILURE,
            error: error.response.data,
        });
    }
}

function tagReadAPI(data) {
    return axios.get(`/tag/${data.slug}`);
}


function* tagRead(action) {
    try {

        const result = yield call(tagReadAPI, action.data);

        yield put({
            type: TAG_READ_SUCCESS,
            data: result.data,
        });

    }
    catch (error) {
        console.error(error);
        yield put({
            type: TAG_READ_FAILURE,
            error: error.response.data,
        });
    }
}


function tagAddAPI(data) {

    return axios.post('/tag/create', data);
}


function* tagAdd(action) {
    try {

        const result = yield call(tagAddAPI, action.data);

        yield put({
            type: TAG_ADD_SUCCESS,
            data: result.data,
        });

    }
    catch (error) {
        console.error(error);
        yield put({
            type: TAG_ADD_FAILURE,
            error: error.response.data,
        });
    }
}


function tagDeleteAPI(data) {
    return axios.delete(`/tag/${data.slug}`);
}

function* tagDelete(action) {
    try {

        const result = yield call(tagDeleteAPI, action.data);

        yield put({
            type: TAG_DELETE_SUCCESS,
            data: result.data,
        });

    }
    catch (error) {
        console.error(error);
        yield put({
            type: TAG_DELETE_FAILURE,
            error: error.response.data,
        });
    }
}

export function* watchTagGet() {

    yield takeLatest(TAG_GET_REQUEST, tagGet);
}

export function* watchTagBlogsGet() {

    yield takeLatest(TAGS_BLOGS_GET_REQUEST, tagBlogsGet);
}


export function* watchTagRead() {

    yield takeLatest(TAG_READ_REQUEST, tagRead);
}

export function* watchTagAdd() {

    yield takeLatest(TAG_ADD_REQUEST, tagAdd);
}

export function* watchTagDelete() {

    yield takeLatest(TAG_DELETE_REQUEST, tagDelete);
}

export default function* tagSaga() {
    yield all([
        fork(watchTagGet),
        fork(watchTagRead),
        fork(watchTagAdd),
        fork(watchTagDelete),
        fork(watchTagBlogsGet)
    ]);
}