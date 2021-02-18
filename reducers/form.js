import {

    FORM_MEESAGE_GET,
    FORM_MEESAGE_SUCCESS,
    FORM_MEESAGE_FAILURE,
    FORM_AUTHOR_MEESAGE_GET,
    FORM_AUTHOR_MEESAGE_SUCCESS,
    FORM_AUTHOR_MEESAGE_FAILURE,


} from '../actions/types';
import { produce } from 'immer';


const initialState = {


    messageDone: false,
    messageLoading: false,
    messageError: null,
};


const reducer = (state = initialState, action) => produce(state, (draft) => {

    switch (action.type) {
        case FORM_MEESAGE_GET:
            draft.messageLoading = true;
            draft.messageDone = false;
            draft.messageError = null;
            break;
        case FORM_MEESAGE_FAILURE:

            draft.messageLoading = false;
            draft.messageDone = true;
            break;

        case FORM_MEESAGE_SUCCESS:

            draft.messageLoading = false;
            draft.messageError = action.error;
            break;
        case FORM_AUTHOR_MEESAGE_GET:
            draft.messageLoading = true;
            draft.messageDone = false;
            draft.messageError = null;
            break;
        case FORM_AUTHOR_MEESAGE_SUCCESS:

            draft.messageLoading = false;
            draft.messageDone = true;
            break;

        case FORM_AUTHOR_MEESAGE_FAILURE:

            draft.messageLoading = false;
            draft.messageError = action.error;
            break;

        default:
            break;
    }
});
export default reducer;