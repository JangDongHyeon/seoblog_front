import {

    BLOG_GET_REQUEST,
    BLOG_GET_FAILURE,
    BLOG_GET_SUCCESS,
    BLOG_SEARCH_REQUEST,
    BLOG_SEARCH_FAILURE,
    BLOG_SEARCH_SUCCESS,
    BLOG_RELATED_REQUEST,
    BLOG_RELATED_FAILURE,
    BLOG_RELATED_SUCCESS,
    BLOG_READ_REQUEST,
    BLOG_READ_FAILURE,
    BLOG_READ_SUCCESS,
    BLOG_ADD_REQUEST,
    BLOG_ADD_FAILURE,
    BLOG_ADD_SUCCESS,
    BLOG_DELETE_REQUEST,
    BLOG_DELETE_FAILURE,
    BLOG_DELETE_SUCCESS,
    BLOG_UPDATE_REQUEST,
    BLOG_UPDATE_FAILURE,
    BLOG_UPDATE_SUCCESS,
    BLOG_MOUSE_MOVE_REQUEST,

} from '../actions/types';
import { produce } from 'immer';


const initialState = {
    blogs: [],
    searchBlogs: [],
    relatedBlogs: [],
    size: null,
    blog: null,
    loading: false,
    loadBlogsDone: false,
    loadBlogsLoading: false,
    loadBlogsError: null,
    searchBlogsDone: false,
    searchBlogsLoading: false,
    searchBlogsError: null,

    relatedBlogsDone: false,
    relatedBlogsLoading: false,
    relatedBlogsError: null,
    readBlogsError: null,
    readBlogsDone: false,
    readBlogsLoading: false,
    addBlogsDone: false,
    addBlogsLoading: false,
    addBlogsError: null,
    deleteBlogsDone: false,
    deleteBlogsLoading: false,
    deleteBlogsError: null,
    updateBlogsDone: false,
    updateBlogsLoading: false,
    updateBlogsError: null,
};

export const blogReducersInit = {
    type: BLOG_MOUSE_MOVE_REQUEST,
}


const reducer = (state = initialState, action) => produce(state, (draft) => {

    switch (action.type) {
        case BLOG_GET_REQUEST:
            draft.loadBlogsLoading = true;
            draft.loadBlogsDone = false;
            draft.loadBlogsError = null;
            break;
        case BLOG_GET_SUCCESS:

            draft.loadBlogsLoading = false;
            draft.loadBlogsDone = true;
            draft.size = action.data.size;
            draft.blogs = draft.blogs.concat(action.data.blogs);
            break;

        case BLOG_GET_FAILURE:

            draft.loadBlogsLoading = false;
            draft.loadBlogsError = action.error;
            break;
        case BLOG_SEARCH_REQUEST:
            draft.searchBlogsLoading = true;
            draft.searchBlogsDone = false;
            draft.searchBlogsError = null;
            break;
        case BLOG_SEARCH_SUCCESS:

            draft.searchBlogsLoading = false;
            draft.searchBlogsDone = true;
            draft.searchBlogs = draft.searchBlogs.concat(action.data.blogs);
            break;

        case BLOG_SEARCH_FAILURE:

            draft.searchBlogsLoading = false;
            draft.searchBlogsError = action.error;
            break;
        case BLOG_RELATED_REQUEST:
            draft.relatedBlogsLoading = true;
            draft.relatedBlogsDone = false;
            draft.relatedBlogsError = null;
            break;
        case BLOG_RELATED_SUCCESS:

            draft.relatedBlogsLoading = false;
            draft.relatedBlogsDone = true;
            draft.relatedBlogs = draft.relatedBlogs.concat(action.data.relatedBlogs);
            break;

        case BLOG_RELATED_FAILURE:

            draft.relatedBlogsLoading = false;
            draft.relatedBlogsError = action.error;
            break;


        case BLOG_READ_REQUEST:
            draft.readBlogsLoading = true;
            draft.readBlogsDone = false;
            draft.readBlogsError = null;
            break;
        case BLOG_READ_SUCCESS:

            draft.readBlogsLoading = false;
            draft.readBlogsDone = true;
            draft.blog = action.data.blog;
            break;

        case BLOG_READ_FAILURE:

            draft.readBlogsLoading = false;
            draft.blog = null
            draft.readBlogsError = action.error;
            break;

        case BLOG_ADD_REQUEST:
            draft.addBlogsLoading = true;
            draft.addBlogsDone = false;
            draft.addBlogsError = null;
            break;
        case BLOG_ADD_SUCCESS:

            draft.addBlogsLoading = false;
            draft.addBlogsDone = true;
            draft.blogs = draft.blogs.concat(action.data.blogs);

            break;

        case BLOG_ADD_FAILURE:

            draft.addBlogsLoading = false;
            draft.addBlogsError = action.error;
            break;
        case BLOG_UPDATE_REQUEST:
            draft.updateBlogsLoading = true;
            draft.updateBlogsDone = false;
            draft.updateBlogsError = null;
            break;
        case BLOG_UPDATE_SUCCESS:

            draft.updateBlogsLoading = false;
            draft.updateBlogsDone = true;

            break;

        case BLOG_UPDATE_FAILURE:

            draft.updateBlogsLoading = false;
            draft.updateBlogsError = action.error;
            break;

        case BLOG_DELETE_REQUEST:
            draft.deleteBlogsLoading = true;
            draft.deleteBlogsDone = false;
            draft.deleteBlogsError = null;
            break;
        case BLOG_DELETE_SUCCESS:

            draft.deleteBlogsLoading = false;
            draft.deleteBlogsDone = true;
            draft.blogs = draft.blogs.filter(item => item._id !== action.data._id);
            break;

        case BLOG_DELETE_FAILURE:

            draft.deleteBlogsLoading = false;
            draft.deleteBlogsError = action.error;
            break;
        case BLOG_MOUSE_MOVE_REQUEST:
            draft.loadBlogsDone = false,
                draft.loadBlogsLoading = false,
                draft.loadBlogsError = null,
                draft.readBlogsError = null,
                draft.readBlogsDone = false,
                draft.readBlogsLoading = false,
                draft.addBlogsDone = false,
                draft.addBlogsLoading = false,
                draft.addBlogsError = null,
                draft.deleteBlogsDone = false,
                draft.deleteBlogsLoading = false,
                draft.deleteBlogsError = null,
                draft.updateBlogsDone = false,
                draft.updateBlogsLoading = false,
                draft.updateBlogsError = null
            break;
        default:
            break;
    }
});
export default reducer;