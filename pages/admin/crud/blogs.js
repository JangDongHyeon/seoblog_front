import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import BlogRead from '../../../components/crud/BlogRead';
import Link from 'next/link';
import wrapper from '../../../store/configureStore';
import axios from 'axios';
import { LOAD_USER_REQUEST, BLOG_GET_REQUEST } from '../../../actions/types';
import { END } from 'redux-saga';
const Blogs = () => {
    return (
        <Layout>
            <Admin>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>블로그 관리</h2>
                        </div>
                        <div className="col-md-12">
                            <BlogRead />
                        </div>
                    </div>
                </div>
            </Admin>
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
        type: BLOG_GET_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();

});

export default Blogs;