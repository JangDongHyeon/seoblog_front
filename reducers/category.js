import {

    CATEGORY_GET_REQUEST,
    CATEGORY_GET_FAILURE,
    CATEGORY_GET_SUCCESS,

    CATEGORY_BLOGS_GET_REQUEST,
    CATEGORY_BLOGS_GET_FAILURE,
    CATEGORY_BLOGS_GET_SUCCESS,

    CATEGORY_READ_REQUEST,
    CATEGORY_READ_FAILURE,
    CATEGORY_READ_SUCCESS,
    CATEGORY_ADD_REQUEST,
    CATEGORY_ADD_FAILURE,
    CATEGORY_ADD_SUCCESS,
    CATEGORY_DELETE_REQUEST,
    CATEGORY_DELETE_FAILURE,
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_MOUSE_MOVE_REQUEST
} from '../actions/types';
import { produce } from 'immer';




const initialState = {
    categorys: null,
    category: null,
    categoryBlogs: [],
    loading: false,
    loadCategorysDone: false,
    loadCategorysLoading: false,
    loadCategorysError: null,

    loadCategoryBlogDone: false,
    loadCategoryBlogLoading: false,
    loadCategoryBlogError: null,

    readCategorysError: null,
    readCategorysDone: false,
    readCategorysLoading: false,
    addCategorysDone: false,
    addCategorysLoading: false,
    addCategorysError: null,
    deleteCategorysDone: false,
    deleteCategorysLoading: false,
    deleteCategorysError: null
};

export const categoryReset = () => ({
    type: CATEGORY_MOUSE_MOVE_REQUEST,
});

const reducer = (state = initialState, action) => produce(state, (draft) => {

    switch (action.type) {
        case CATEGORY_GET_REQUEST:
            draft.loadCategorysLoading = true;
            draft.loadCategorysDone = false;
            draft.loadCategorysError = null;
            break;
        case CATEGORY_GET_SUCCESS:

            draft.loadCategorysLoading = false;
            draft.loadCategorysDone = true;

            draft.categorys = action.data.categorys;
            break;

        case CATEGORY_GET_FAILURE:

            draft.loadCategorysLoading = false;
            draft.loadCategorysError = action.error;
            break;
        case CATEGORY_BLOGS_GET_REQUEST:
            draft.loadCategoryBlogLoading = true;
            draft.loadCategoryBlogDone = false;
            draft.loadCategoryBlogError = null;
            break;
        case CATEGORY_BLOGS_GET_SUCCESS:

            draft.loadCategoryBlogLoading = false;
            draft.loadCategoryBlogDone = true;
            draft.categoryBlogs = draft.categoryBlogs.concat(action.data.blogs)
            draft.category = action.data.category;
            break;

        case CATEGORY_BLOGS_GET_FAILURE:

            draft.loadCategoryBlogLoading = false;
            draft.loadCategoryBlogError = action.error;
            break;
        case CATEGORY_READ_REQUEST:
            draft.readCategorysLoading = true;
            draft.readCategorysDone = false;
            draft.readCategorysError = null;
            break;
        case CATEGORY_READ_SUCCESS:

            draft.readCategorysLoading = false;
            draft.readCategorysDone = true;
            draft.category = action.data;
            break;

        case CATEGORY_READ_FAILURE:

            draft.readCategorysLoading = false;
            draft.category = null
            draft.readCategorysError = action.error;
            break;

        case CATEGORY_ADD_REQUEST:
            draft.addCategorysLoading = true;
            draft.addCategorysDone = false;
            draft.addCategorysError = null;
            break;
        case CATEGORY_ADD_SUCCESS:

            draft.addCategorysLoading = false;
            draft.addCategorysDone = true;
            draft.categorys = draft.categorys.concat(action.data.category);
            break;

        case CATEGORY_ADD_FAILURE:

            draft.addCategorysLoading = false;
            draft.addCategorysError = action.error;
            break;


        case CATEGORY_DELETE_REQUEST:
            draft.deleteCategorysLoading = true;
            draft.deleteCategorysDone = false;
            draft.deleteCategorysError = null;
            break;
        case CATEGORY_DELETE_SUCCESS:

            draft.deleteCategorysLoading = false;
            draft.deleteCategorysDone = true;
            draft.categorys = draft.categorys.filter(item => item._id !== action.data._id);
            break;

        case CATEGORY_DELETE_FAILURE:

            draft.deleteCategorysLoading = false;
            draft.deleteCategorysError = action.error;
            break;
        case CATEGORY_MOUSE_MOVE_REQUEST:

            draft.addCategorysDone = false
            draft.addCategorysError = false
            draft.deleteCategorysDone = false
            break;
        default:
            break;
    }
});
export default reducer;