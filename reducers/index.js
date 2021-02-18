import { HYDRATE } from 'next-redux-wrapper';
import {
    combineReducers
} from 'redux';


import user from './auth';
import category from './category';
import tag from './tag';
import blog from './blog';
import form from './form';


// (이전상태, 액션) => 다음상태
const rootReducer = (state, action) => {
    switch (action.type) {
        case HYDRATE:
            console.log('HYDRATE', action);
            return action.payload;
        default: {
            const combinedReducer = combineReducers({
                user,
                category,
                tag,
                blog,
                form
            });
            return combinedReducer(state, action);
        }
    }
};

export default rootReducer;

