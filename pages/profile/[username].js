import Head from 'next/head';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import moment from 'moment';
import ContactForm from '../../components/form/ContactForm';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'next/router';
import wrapper from '../../store/configureStore';
import axios from 'axios';
import { LOAD_USER_REQUEST, USER_PROFILE_REQUEST } from '../../actions/types';
import { END } from 'redux-saga';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';

const UserProfile = ({ router }) => {
    const dispatch = useDispatch();
    const { you, profileBlogs } = useSelector((state) => state.user);
    const head = () => (
        <Head>
            <title>
                {you.username} | {APP_NAME}
            </title>
            <meta name="description" content={`Blogs by ${you.username}`} />
            <link rel="canonical" href={`${DOMAIN}/profile/${router.query.username}`} />
            <meta property="og:title" content={`${you.username}| ${APP_NAME}`} />
            <meta property="og:description" content={`Blogs by ${you.username}`} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}/profile/${router.query.username}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${DOMAIN}/static/images/seoblog.jpg`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/seoblog.jpg`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    );
    const showUserBlogs = () => {
        return profileBlogs.map((blog, i) => {
            return (
                <div className="mt-4 mb-4" key={i}>
                    <Link href={`/blogs/${blog.slug}`}>
                        <a className="lead">{blog.title}</a>
                    </Link>
                </div>
            );
        })
    }

    return you && (
        <>
            {head()}
            <Layout>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <h5>{you.name}</h5>
                                            <p className="text-muted">사용자 {moment(you.createdAt).fromNow()}</p>
                                        </div>
                                        <div className="col-md-4">
                                            <img
                                                src={`${API}/api/user/photo/${you.username}`}
                                                className="img img-fluid img-thumbnail mb-3"
                                                style={{ maxHeight: '100px', maxWidth: '100%' }}
                                                alt="user profile"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <br />

                <div className="container pb-5">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title bg-primary pt-4 pb-4 pl-4 pr-4 text-white">
                                        최근 블로그 {you.name}
                                    </h5>

                                    {showUserBlogs()}
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title bg-primary pt-4 pb-4 pl-4 pr-4 text-light">
                                        메시지 {you.name}
                                    </h5>
                                    <br />
                                    <ContactForm authorEmail={you.email} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )

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
    context.store.dispatch({
        type: USER_PROFILE_REQUEST,
        data: context.params.username,
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();

});


export default withRouter(UserProfile);