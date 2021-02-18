import Layout from "../components/Layout"
import SignupComponent from '../components/auth/SignupComponent';
import Link from 'next/link';
import wrapper from "../store/configureStore";
import { END } from 'redux-saga';
import axios from 'axios';
import { LOAD_USER_REQUEST } from "../actions/types";

const Signup = () => {
    return <Layout>
        <div className="container-fluid">
            <h2 className="text-center pt-4 pb-4">Signup</h2>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <SignupComponent />
                </div>
            </div>
        </div>

    </Layout>
}
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {

        axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
        type: LOAD_USER_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();

});
export default Signup;