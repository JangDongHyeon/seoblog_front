import Layout from '../../../components/Layout';
import Private from '../../../components/auth/Private';
import BlogCreate from '../../../components/crud/BlogCreate';
import Link from 'next/link';
import wrapper from '../../../store/configureStore';
import axios from 'axios';
import { CATEGORY_GET_REQUEST, LOAD_USER_REQUEST, TAG_GET_REQUEST } from '../../../actions/types';
import { END } from 'redux-saga';
const CreateBlog = () => {
    return (
        <Layout>
            <Private>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>블로그 만들기</h2>
                        </div>
                        <div className="col-md-12">
                            <BlogCreate />
                        </div>
                    </div>
                </div>
            </Private>
        </Layout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {

        axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
        type: LOAD_USER_REQUEST,
    });
    context.store.dispatch({
        type: CATEGORY_GET_REQUEST,
    });
    context.store.dispatch({
        type: TAG_GET_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();

});

export default CreateBlog;