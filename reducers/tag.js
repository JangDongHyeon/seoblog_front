import {

    TAG_GET_REQUEST,
    TAG_GET_FAILURE,
    TAG_GET_SUCCESS,
    TAGS_BLOGS_GET_REQUEST,
    TAGS_BLOGS_GET_FAILURE,
    TAGS_BLOGS_GET_SUCCESS,
    TAG_READ_REQUEST,
    TAG_READ_FAILURE,
    TAG_READ_SUCCESS,
    TAG_ADD_REQUEST,
    TAG_ADD_FAILURE,
    TAG_ADD_SUCCESS,
    TAG_DELETE_REQUEST,
    TAG_DELETE_FAILURE,
    TAG_DELETE_SUCCESS,
    TAG_MOUSE_MOVE_REQUEST
} from '../actions/types';
import { produce } from 'immer';



const initialState = {
    tags: null,
    tag: null,
    tagBlogs: [],
    loading: false,
    loadTgasDone: false,
    loadTgasLoading: false,
    loadTgasError: null,

    loadTgaBlogsDone: false,
    loadTgaBlogsLoading: false,
    loadTgaBlogsError: null,

    readTgasError: null,
    readTgasDone: false,
    readTgasLoading: false,
    addTgasDone: false,
    addTgasLoading: false,
    addTgasError: null,
    deleteTgasDone: false,
    deleteTgasLoading: false,
    deleteTgasError: null
};

export const tagReset = () => ({
    type: TAG_MOUSE_MOVE_REQUEST,
});

const reducer = (state = initialState, action) => produce(state, (draft) => {

    switch (action.type) {
        case TAG_GET_REQUEST:
            draft.loadTgasLoading = true;
            draft.loadTgasDone = false;
            draft.loadTgasError = null;
            break;
        case TAG_GET_SUCCESS:

            draft.loadTgasLoading = false;
            draft.loadTgasDone = true;

            draft.tags = action.data.tags;
            break;

        case TAG_GET_FAILURE:

            draft.loadTgasLoading = false;
            draft.loadTgasError = action.error;
            break;
        case TAGS_BLOGS_GET_REQUEST:
            draft.loadTgaBlogsLoading = true;
            draft.loadTgaBlogsDone = false;
            draft.loadTgaBlogsError = null;
            break;
        case TAGS_BLOGS_GET_SUCCESS:

            draft.loadTgaBlogsLoading = false;
            draft.loadTgaBlogsDone = true;
            draft.tagBlogs = draft.tagBlogs.concat(action.data.blogs)
            draft.tag = action.data.tag;
            break;

        case TAGS_BLOGS_GET_FAILURE:

            draft.loadTgaBlogsLoading = false;
            draft.loadTgaBlogsError = action.error;
            break;
        case TAG_READ_REQUEST:
            draft.readTgasLoading = true;
            draft.readTgasDone = false;
            draft.readTgasError = null;
            break;
        case TAG_READ_SUCCESS:

            draft.readTgasLoading = false;
            draft.readTgasDone = true;
            draft.tag = action.data;
            break;

        case TAG_READ_FAILURE:

            draft.readTgasLoading = false;
            draft.tag = null
            draft.readTgasError = action.error;
            break;

        case TAG_ADD_REQUEST:
            draft.addTgasLoading = true;
            draft.addTgasDone = false;
            draft.addTgasError = null;
            break;
        case TAG_ADD_SUCCESS:

            draft.addTgasLoading = false;
            draft.addTgasDone = true;
            draft.tags = draft.tags.concat(action.data.tag);
            break;

        case TAG_ADD_FAILURE:

            draft.addTgasLoading = false;
            draft.addTgasError = action.error;
            break;


        case TAG_DELETE_REQUEST:
            draft.deleteTgasLoading = true;
            draft.deleteTgasDone = false;
            draft.deleteTgasError = null;
            break;
        case TAG_DELETE_SUCCESS:

            draft.deleteTgasLoading = false;
            draft.deleteTgasDone = true;
            draft.tags = draft.tags.filter(item => item._id !== action.data._id);
            break;

        case TAG_DELETE_FAILURE:

            draft.deleteTgasLoading = false;
            draft.deleteTgasError = action.error;
            break;
        case TAG_MOUSE_MOVE_REQUEST:

            draft.addTgasDone = false
            draft.addTgasError = false
            draft.deleteTgasDone = false
            break;
        default:
            break;
    }
});
export default reducer;