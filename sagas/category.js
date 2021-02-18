import { takeLatest, put, all, call, fork, throttle, takeEvery } from 'redux-saga/effects';
import {
    CATEGORY_GET_REQUEST, CATEGORY_GET_SUCCESS, CATEGORY_GET_FAILURE,
    CATEGORY_ADD_REQUEST,
    CATEGORY_ADD_FAILURE,
    CATEGORY_ADD_SUCCESS,
    CATEGORY_DELETE_REQUEST,
    CATEGORY_DELETE_FAILURE,
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_READ_REQUEST,
    CATEGORY_READ_FAILURE,
    CATEGORY_READ_SUCCESS,
    CATEGORY_BLOGS_GET_REQUEST,
    CATEGORY_BLOGS_GET_FAILURE,
    CATEGORY_BLOGS_GET_SUCCESS,
} from '../actions/types';
import axios from 'axios'


function categoryGetAPI() {
    return axios.get('/category/list');
}


function* categoryGet() {
    try {

        const result = yield call(categoryGetAPI);

        yield put({
            type: CATEGORY_GET_SUCCESS,
            data: result.data,
        });

    }
    catch (error) {
        console.error(error);
        yield put({
            type: CATEGORY_GET_FAILURE,
            error: error.response.data,
        });
    }
}

function categoryBlogGetAPI(data) {
    return axios.get(`/category/${data}`);
}


function* categoryBlogGet(action) {
    try {

        const result = yield call(categoryBlogGetAPI, action.data);

        yield put({
            type: CATEGORY_BLOGS_GET_SUCCESS,
            data: result.data,
        });

    }
    catch (error) {
        console.error(error);
        yield put({
            type: CATEGORY_BLOGS_GET_FAILURE,
            error: error.response.data,
        });
    }
}



function categoryReadAPI(data) {
    return axios.get(`/category/${data.slug}`);
}


function* categoryRead(action) {
    try {

        const result = yield call(categoryReadAPI, action.data);

        yield put({
            type: CATEGORY_READ_SUCCESS,
            data: result.data,
        });

    }
    catch (error) {
        console.error(error);
        yield put({
            type: CATEGORY_READ_FAILURE,
            error: error.response.data,
        });
    }
}


function categoryAddAPI(data) {

    return axios.post('/category/create', data);
}


function* categoryAdd(action) {
    try {

        const result = yield call(categoryAddAPI, action.data);

        yield put({
            type: CATEGORY_ADD_SUCCESS,
            data: result.data,
        });

    }
    catch (error) {
        console.error(error);
        yield put({
            type: CATEGORY_ADD_FAILURE,
            error: error.response.data,
        });
    }
}


function categoryDeleteAPI(data) {
    return axios.delete(`/category/${data.slug}`);
}

function* categoryDelete(action) {
    try {

        const result = yield call(categoryDeleteAPI, action.data);

        yield put({
            type: CATEGORY_DELETE_SUCCESS,
            data: result.data,
        });

    }
    catch (error) {
        console.error(error);
        yield put({
            type: CATEGORY_DELETE_FAILURE,
            error: error.response.data,
        });
    }
}

export function* watchCategoryGet() {

    yield takeLatest(CATEGORY_GET_REQUEST, categoryGet);
}
export function* watchCategoryBlogGet() {

    yield takeLatest(CATEGORY_BLOGS_GET_REQUEST, categoryBlogGet);
}


export function* watchCategoryRead() {

    yield takeLatest(CATEGORY_READ_REQUEST, categoryRead);
}

export function* watchCategoryAdd() {

    yield takeLatest(CATEGORY_ADD_REQUEST, categoryAdd);
}

export function* watchCategoryDelete() {

    yield takeLatest(CATEGORY_DELETE_REQUEST, categoryDelete);
}

export default function* categorySaga() {
    yield all([
        fork(watchCategoryGet),
        fork(watchCategoryRead),
        fork(watchCategoryAdd),
        fork(watchCategoryDelete),
        fork(watchCategoryBlogGet),
    ]);
}