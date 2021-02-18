import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Layout from '../../components/Layout';
import moment from 'moment';
import Card from '../../components/blog/Card';
import wrapper from '../../store/configureStore';
import axios from 'axios';
import { LOAD_USER_REQUEST, TAGS_BLOGS_GET_REQUEST } from '../../actions/types';
import { END } from 'redux-saga';
import { useDispatch, useSelector } from 'react-redux';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
const tags = ({ router }) => {
    const { tagBlogs, tag } = useSelector((state) => state.tag);
    console.log(tagBlogs)
    const head = () => (
        <Head>
            <title>
                {tag.name} | {APP_NAME}
            </title>
            <meta name="description" content={`Best programming tutorials on ${tag.name}`} />
            <link rel="canonical" href={`${DOMAIN}/categories/${router.query.slug}`} />
            <meta property="og:title" content={`${tag.name}| ${APP_NAME}`} />
            <meta property="og:description" content={`Best programming tutorials on ${tag.name}`} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}/categories/${router.query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${DOMAIN}/static/images/seoblog.jpg`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/seoblog.jpg`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    );

    return tag && (
        <>
            {head()}
            <Layout>
                <main>
                    <div className="container-fluid text-center">
                        <header>
                            <div className="col-md-12 pt-3">
                                <h1 className="display-4 font-weight-bold">{tag.name}</h1>
                                {tagBlogs.length > 0 && tagBlogs.map((b, i) => (
                                    <div>
                                        <Card key={i} blog={b} />
                                        <hr />
                                    </div>
                                ))}
                            </div>
                        </header>
                    </div>
                </main>
            </Layout>
        </>
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
        type: TAGS_BLOGS_GET_REQUEST,
        data: context.params.slug,
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();

});


export default withRouter(tags);