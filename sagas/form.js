import { takeLatest, put, all, call, fork, throttle, takeEvery } from 'redux-saga/effects';
import {
    FORM_MEESAGE_GET,
    FORM_MEESAGE_SUCCESS,
    FORM_MEESAGE_FAILURE,
    FORM_AUTHOR_MEESAGE_GET,
    FORM_AUTHOR_MEESAGE_SUCCESS,
    FORM_AUTHOR_MEESAGE_FAILURE,

} from '../actions/types';
import axios from 'axios'


function messageAPI(data) {
    return axios.post('/form/contact', data);
}


function* message(action) {
    try {

        const result = yield call(messageAPI, action.data);

        yield put({
            type: FORM_MEESAGE_SUCCESS,

        });



    }
    catch (error) {
        console.error(error);
        yield put({
            type: FORM_MEESAGE_FAILURE,
            error: error.rsesponse.data,
        });
    }
}

function messageAuthorAPI(data) {
    return axios.post(`/contact-blog-author`, action.data);
}


function* messageAuthor(action) {
    try {

        const result = yield call(messageAuthorAPI, action.data);

        yield put({
            type: FORM_AUTHOR_MEESAGE_SUCCESS,
            data: result.data,
        });


    }
    catch (error) {
        console.error(error);
        yield put({
            type: FORM_AUTHOR_MEESAGE_FAILURE,
            error: error.response.data,
        });
    }
}





export function* watchMessage() {

    yield takeLatest(FORM_MEESAGE_GET, message);
}

export function* watchMessageAuthor() {

    yield takeLatest(FORM_AUTHOR_MEESAGE_GET, messageAuthor);
}


export default function* formSaga() {
    yield all([
        fork(watchMessage),
        fork(watchMessageAuthor),

    ]);
}