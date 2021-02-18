import { takeLatest, put, all, call, fork, throttle, takeEvery } from 'redux-saga/effects';
import {
    BLOG_GET_REQUEST, BLOG_GET_SUCCESS, BLOG_GET_FAILURE,
    BLOG_ADD_REQUEST,
    BLOG_ADD_FAILURE,
    BLOG_ADD_SUCCESS,
    BLOG_SEARCH_REQUEST,
    BLOG_SEARCH_FAILURE,
    BLOG_SEARCH_SUCCESS,
    BLOG_DELETE_REQUEST,
    BLOG_DELETE_FAILURE,
    BLOG_DELETE_SUCCESS,
    BLOG_READ_REQUEST,
    BLOG_READ_FAILURE,
    BLOG_READ_SUCCESS,
    BLOG_UPDATE_REQUEST,
    BLOG_UPDATE_FAILURE,
    BLOG_UPDATE_SUCCESS,
    CATEGORY_GET_SUCCESS,
    TAG_GET_SUCCESS,
    BLOG_RELATED_REQUEST,
    BLOG_RELATED_FAILURE,
    BLOG_RELATED_SUCCESS,
} from '../actions/types';
import axios from 'axios'


function blogGetAPI(data) {
    return axios.post('/blog/blogs-categories-tags', data);
}


function* blogGet(action) {
    try {

        const result = yield call(blogGetAPI, action.data);

        yield put({
            type: BLOG_GET_SUCCESS,
            data: result.data,
        });

        yield put({
            type: CATEGORY_GET_SUCCESS,
            data: { categorys: result.data.categories }
        })

        yield put({
            type: TAG_GET_SUCCESS,
            data: { tags: result.data.tags }
        })

    }
    catch (error) {
        console.error(error);
        yield put({
            type: BLOG_GET_FAILURE,
            error: error.rsesponse.data,
        });
    }
}

function blogSearchAPI(data) {
    return axios.get(`/blog/search?search=${data.search}`);
}


function* blogSearch(action) {
    try {

        const result = yield call(blogSearchAPI, action.data);

        yield put({
            type: BLOG_SEARCH_SUCCESS,
            data: result.data,
        });


    }
    catch (error) {
        console.error(error);
        yield put({
            type: BLOG_SEARCH_FAILURE,
            error: error.response.data,
        });
    }
}



function blogRelatedGetAPI(data) {
    return axios.post('/blog/related', data);
}


function* blogRelatedGet(action) {
    try {

        const result = yield call(blogRelatedGetAPI, action.data);

        yield put({
            type: BLOG_RELATED_SUCCESS,
            data: result.data,
        });



    }
    catch (error) {
        console.error(error);
        yield put({
            type: BLOG_RELATED_FAILURE,
            error: error.response.data,
        });
    }
}

function blogReadAPI(data) {
    return axios.get(`/blog/${data}`);
}


function* blogRead(action) {
    try {

        const result = yield call(blogReadAPI, action.data);

        yield put({
            type: BLOG_READ_SUCCESS,
            data: result.data,
        });

    }
    catch (error) {
        console.error(error);
        yield put({
            type: BLOG_READ_FAILURE,
            error: error.response.data,
        });
    }
}


function blogAddAPI(data) {

    return axios.post('/blog/create', data);
}


function* blogAdd(action) {
    try {

        const result = yield call(blogAddAPI, action.data);
        console.log(result.data)
        yield put({
            type: BLOG_ADD_SUCCESS,
            data: result.data,
        });

    }
    catch (error) {

        console.error(error);
        yield put({
            type: BLOG_ADD_FAILURE,
            error: error.response.data.error,
        });
    }
}

function blogUpdateAPI(data) {

    return axios.put(`/blog/${data.slug}`);
}


function* blogUpdate(action) {
    try {

        const result = yield call(blogUpdateAPI, action.data);
        console.log(result.data)
        yield put({
            type: BLOG_UPDATE_SUCCESS,
            data: result.data,
        });

    }
    catch (error) {

        console.error(error);
        yield put({
            type: BLOG_UPDATE_FAILURE,
            error: error.response.data.error,
        });
    }
}


function blogDeleteAPI(data) {
    return axios.delete(`/blog/${data.slug}`);
}

function* blogDelete(action) {
    try {

        const result = yield call(blogDeleteAPI, action.data);

        yield put({
            type: BLOG_DELETE_SUCCESS,
            data: result.data,
        });

    }
    catch (error) {
        console.error(error);
        yield put({
            type: BLOG_DELETE_FAILURE,
            error: error.response.data,
        });
    }
}


export function* watchBlogRelatedGet() {

    yield takeLatest(BLOG_RELATED_REQUEST, blogRelatedGet);
}

export function* watchBlogGet() {

    yield takeLatest(BLOG_GET_REQUEST, blogGet);
}

export function* watchBlogSearchGet() {

    yield takeLatest(BLOG_SEARCH_REQUEST, blogSearch);
}

export function* watchBlogRead() {

    yield takeLatest(BLOG_READ_REQUEST, blogRead);
}

export function* watchBlogAdd() {

    yield takeLatest(BLOG_ADD_REQUEST, blogAdd);
}
export function* watchBlogUpdate() {

    yield takeLatest(BLOG_UPDATE_REQUEST, blogUpdate);
}

export function* watchBlogDelete() {

    yield takeLatest(BLOG_DELETE_REQUEST, blogDelete);
}

export default function* blogSaga() {
    yield all([
        fork(watchBlogGet),
        fork(watchBlogRelatedGet),
        fork(watchBlogRead),
        fork(watchBlogAdd),
        fork(watchBlogDelete),
        fork(watchBlogUpdate),
        fork(watchBlogSearchGet)
    ]);
}