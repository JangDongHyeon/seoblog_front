
import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Layout from '../../components/Layout';
import React, { useState, useEffect } from 'react';
import Card from '../../components/blog/Card';
import wrapper from '../../store/configureStore';
import axios from 'axios';
import { LOAD_USER_REQUEST, BLOG_GET_REQUEST } from '../../actions/types';
import { END } from 'redux-saga';
import { useDispatch, useSelector } from 'react-redux';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
const Blogs = ({ router }) => {
    const dispatch = useDispatch();
    const { categorys } = useSelector((state) => state.category);
    const { blogs, size } = useSelector((state) => state.blog);
    const { tags } = useSelector((state) => state.tag);

    const [limit, setLimit] = useState(2);
    const [skip, setSkip] = useState(0);
    // const [size, setSize] = useState(0);

    // useEffect(() => {
    //     if (size)
    //         setSize(size)
    // }, [size])

    const head = () => (
        <Head>
            <title>프로그램 블로그 | {APP_NAME}</title>
            <meta
                name="description"
                content="Programming blogs and tutorials on react node next vue php laravel and web developoment"
            />
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
            <meta property="og:title" content={`Latest web developoment tutorials | ${APP_NAME}`} />
            <meta
                property="og:description"
                content="Programming blogs and tutorials on react node next vue php laravel and web developoment"
            />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${DOMAIN}/static/images/seoblog.jpg`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/seoblog.jpg`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    );

    const loadMore = () => {
        let toSkip = skip + limit;
        dispatch({
            type: BLOG_GET_REQUEST,
            data: { skip: toSkip, limit }
        })
        setSkip(toSkip)
    }

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-outline-primary btn-lg">
                    더 보기
                </button>
            )
        )
    }

    const showAllBlogs = () => {
        return blogs.map((blog, i) => {
            return (
                <article key={i}>
                    <Card blog={blog} />
                    <hr />
                </article>
            )
        });
    }

    const showAllCategories = () => {
        return categorys.map((c, i) => (
            <Link href={`/categories/${c.slug}`} key={i}>
                <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
            </Link>
        ));
    };

    const showAllTags = () => {
        return tags.map((t, i) => (
            <Link href={`/tags/${t.slug}`} key={i}>
                <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
            </Link>
        ));
    };

    return (
        <>
            {head()}
            <Layout>
                <main>
                    <div className="container-fluid">
                        <header>
                            <div className="col-md-12 pt-3">
                                <h1 className="display-4 font-weight-bold text-center">
                                    프로그래밍 블로그 및 튜토리얼
                                </h1>
                            </div>
                            <section>
                                <div className="pb-5 text-center">
                                    {categorys && showAllCategories()}
                                    <br />
                                    {tags && showAllTags()}
                                </div>
                            </section>
                        </header>
                    </div>
                    <div className="container-fluid">{blogs && showAllBlogs()}</div>
                    {/* <div className="container-fluid">{showLoadedBlogs()}</div> */}
                    <div className="text-center pt-5 pb-5">{loadMoreButton()}</div>
                </main>
            </Layout>
        </>
    );
};



export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const data = {
        skip: 0,
        limit: 2
    }

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
        data: data
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();

});


export default withRouter(Blogs);