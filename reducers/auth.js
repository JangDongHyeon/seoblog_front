import {
    LOG_IN_FAILURE,
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE_DELETE,
    LOG_OUT_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    SIGN_UP_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE_DELETE,
    LOAD_USER_FAILURE,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    USER_PROFILE_REQUEST,
    USER_PROFILE_FAILURE,
    USER_PROFILE_SUCCESS,
    USER_UPDATE_REQUEST,
    USER_UPDATE_FAILURE,
    USER_UPDATE_SUCCESS,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_FAILURE,
    FORGOT_PASSWORD_SUCCESS,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_FAILURE,
    RESET_PASSWORD_SUCCESS,
} from '../actions/types'
import { produce } from 'immer';
// import { AsyncStorage } from 'react-native';


const initialState = {
    loadMyInfoLoading: false, // 유저 정보 가져오기 시도중
    loadMyInfoDone: false,
    loadMyInfoError: null,
    isAuthenticated: false,
    logInLoading: false, // 로그인 시도중
    logInDone: false,
    logInError: null,
    signUpLoading: false, // 회원가입 시도중
    signUpDone: false,
    signUpError: null,
    logOutLoading: false, // 로그아웃 시도중
    logOutDone: false,
    logOutError: null,
    profileLoading: false,
    profileDone: false,
    profileError: null,
    profileUpdateLoading: false,
    profileUpdateDone: false,
    profileUpdateError: null,
    forgotPasswordLoading: false, //
    forgotPasswordDone: false,
    forgotPasswordError: null,
    forgotPasswordMsg: null,
    resetPasswordLoading: false, // 
    resetPasswordDone: false,
    resetPasswordError: null,
    me: null,
    profileBlogs: [],
    you: null
};

const reducer = (state = initialState, action) => produce(state, (draft) => {

    switch (action.type) {
        case USER_UPDATE_REQUEST:
            draft.profileUpdateLoading = true;
            draft.profileUpdateError = null;

            break;

        case USER_UPDATE_SUCCESS:

            // AsyncStorage.setItem('token', action.data.token);
            draft.profileUpdateLoading = false;

            draft.profileUpdateDone = true;
            draft.me = action.data;
            break;
        case USER_UPDATE_FAILURE:

            draft.profileUpdateLoading = false;
            draft.profileUpdateDone = false;

            draft.profileUpdateError = action.error;
            break;


        case USER_PROFILE_REQUEST:
            draft.profileLoading = true;
            draft.profileError = null;

            break;

        case USER_PROFILE_SUCCESS:

            // AsyncStorage.setItem('token', action.data.token);
            draft.profileLoading = false;

            draft.profileDone = true;
            draft.profileBlogs = draft.profileBlogs.concat(action.data.blogs);
            draft.you = action.data.user;
            break;
        case USER_PROFILE_FAILURE:

            draft.profileLoading = false;
            draft.profileDone = false;

            draft.profileError = action.error;
            break;

        case LOG_IN_REQUEST:
            draft.logInLoading = true;
            draft.logInError = null;

            break;

        case LOG_IN_SUCCESS:

            // AsyncStorage.setItem('token', action.data.token);
            draft.logInLoading = false;

            draft.logInDone = true;
            draft.me = action.data;
            break;
        case LOG_IN_FAILURE:

            draft.logInLoading = false;
            draft.logInDone = false;

            draft.logInError = action.error;
            break;

        case LOG_IN_FAILURE_DELETE:

            draft.logInLoading = false;
            draft.logInDone = false;

            draft.logInError = null;
            break;


        case SIGN_UP_REQUEST:

            draft.signUpLoading = true;
            draft.signUpError = null;


            break;

        case SIGN_UP_SUCCESS:
            // AsyncStorage.setItem('token', action.data.token);
            draft.me = action.data;
            draft.isAuthenticated = true;
            draft.signUpLoading = false;
            draft.signUpDone = true;
            // draft.me = action.data.user;
            break;


        case SIGN_UP_FAILURE:

            draft.isAuthenticated = false;
            draft.signUpLoading = false;
            draft.signUpDone = false;
            draft.signUpError = action.error;
            break;

        case SIGN_UP_FAILURE_DELETE:

            draft.isAuthenticated = false;
            draft.signUpLoading = false;
            draft.signUpDone = false;
            draft.signUpError = null;
            break;



        case LOG_OUT_REQUEST:

            draft.logOutLoading = true;
            draft.logOutDone = false;
            draft.logOutError = null;
            break;

        case LOG_OUT_SUCCESS:
            // AsyncStorage.removeItem('token');
            draft.logOutLoading = false;
            draft.isAuthenticated = false;
            draft.logOutDone = true;
            draft.me = null;
            break;

        case LOG_OUT_FAILURE:

            draft.logOutLoading = false;
            draft.changeNicknameError = action.error;
            break;

        case LOAD_USER_REQUEST:
            draft.loadMyInfoLoading = true;
            draft.loadMyInfoError = null;
            break;

        case LOAD_USER_SUCCESS:

            draft.loadMyInfoLoading = false;

            draft.loadMyInfoDone = true;
            draft.me = action.data;
            break;
        case LOAD_USER_FAILURE:

            draft.loadMyInfoLoading = false;
            draft.loadMyInfoDone = false;
            draft.loadMyInfoError = action.error;
            break;
        case FORGOT_PASSWORD_REQUEST:
            draft.forgotPasswordLoading = true;
            draft.forgotPasswordError = null;
            draft.forgotPasswordMsg = null;
            break;

        case FORGOT_PASSWORD_SUCCESS:
            draft.forgotPasswordLoading = false;
            draft.forgotPasswordDone = true;
            draft.forgotPasswordMsg = action.data.message;
            break;
        case FORGOT_PASSWORD_FAILURE:

            draft.forgotPasswordLoading = false;
            draft.forgotPasswordDone = false;
            draft.forgotPasswordError = action.error;
            draft.forgotPasswordMsg = null;
            break;
        case RESET_PASSWORD_REQUEST:
            draft.resetPasswordLoading = true;
            draft.resetPasswordError = null;
            break;

        case RESET_PASSWORD_SUCCESS:
            draft.resetPasswordLoading = false;
            draft.resetPasswordDone = true;
            break;
        case RESET_PASSWORD_FAILURE:

            draft.resetPasswordLoading = false;
            draft.resetPasswordDone = false;
            draft.resetPasswordError = action.error;
            break;
        default:
            break;
    }
});
export default reducer;