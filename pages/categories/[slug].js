import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Layout from '../../components/Layout';
import moment from 'moment';
import Card from '../../components/blog/Card';
import wrapper from '../../store/configureStore';
import axios from 'axios';
import { LOAD_USER_REQUEST, CATEGORY_BLOGS_GET_REQUEST } from '../../actions/types';
import { END } from 'redux-saga';
import { useDispatch, useSelector } from 'react-redux';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
const categories = ({ router }) => {
    const { category, categoryBlogs } = useSelector((state) => state.category);
    console.log(category)
    const head = () => (
        <Head>
            <title>
                {category.name} | {APP_NAME}
            </title>
            <meta name="description" content={`Best programming tutorials on ${category.name}`} />
            <link rel="canonical" href={`${DOMAIN}/categories/${router.query.slug}`} />
            <meta property="og:title" content={`${category.name}| ${APP_NAME}`} />
            <meta property="og:description" content={`Best programming tutorials on ${category.name}`} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}/categories/${router.query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${DOMAIN}/static/images/seoblog.jpg`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/seoblog.jpg`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    );

    return category && (
        <>
            {head()}
            <Layout>
                <main>
                    <div className="container-fluid text-center">
                        <header>
                            <div className="col-md-12 pt-3">
                                <h1 className="display-4 font-weight-bold">{category.name}</h1>
                                {categoryBlogs.length > 0 && categoryBlogs.map((b, i) => (
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
        type: CATEGORY_BLOGS_GET_REQUEST,
        data: context.params.slug,
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();

});


export default withRouter(categories);