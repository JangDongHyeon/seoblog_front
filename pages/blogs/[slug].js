import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Layout from '../../components/Layout';
import React, { useState, useEffect } from 'react';
import renderHTML from 'react-render-html';
import moment from 'moment';
import SmallCard from '../../components/blog/SmallCard';
import wrapper from '../../store/configureStore';
import axios from 'axios';
import { LOAD_USER_REQUEST, BLOG_READ_REQUEST, BLOG_RELATED_REQUEST } from '../../actions/types';
import { END } from 'redux-saga';
import { useDispatch, useSelector } from 'react-redux';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';

const SingleBlog = ({ router }) => {
    const dispatch = useDispatch();
    const { blog, size, relatedBlogs } = useSelector((state) => state.blog);
    const { me } = useSelector((state) => state.user);
    const loadRelated = () => {
        dispatch({
            type: BLOG_RELATED_REQUEST,
            data: { blog: blog }
        })
    };

    useEffect(() => {
        loadRelated();
    }, [blog]);

    const head = () => (
        <Head>
            <title>
                {me.username} | {APP_NAME}
            </title>
            <meta name="description" content={`Blogs by ${me.username}`} />
            <link rel="canonical" href={`${DOMAIN}/profile/${me.username}`} />
            <meta property="og:title" content={`${me.username}| ${APP_NAME}`} />
            <meta property="og:description" content={`Blogs by ${me.username}`} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}/profile/${me.username}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${DOMAIN}/static/images/seoblog.jpg`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/seoblog.jpg`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    );

    const showBlogCategories = blog => {
        blog.categories.map((c, i) => (
            <Link key={i} href={`/categories/${c.slug}`}>
                <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
            </Link>
        ))
    }

    const showBlogTags = blog =>
        blog.tags.map((t, i) => (
            <Link key={i} href={`/tags/${t.slug}`}>
                <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
            </Link>
        ));

    const showRelatedBlog = () => {
        return relatedBlogs.map((blog, i) => (
            <div className="col-md-4" key={i}>
                <article>
                    <SmallCard blog={blog} />
                </article>
            </div>
        ));
    };

    return blog && (
        <>
            {me && head()}
            <Layout>
                <main>
                    <article>
                        <div className="container-fluid">
                            <section>
                                <div className="row" style={{ marginTop: '-30px' }}>
                                    <img
                                        src={`${API}/api/blog/photo/${blog.slug}`}
                                        alt={blog.title}
                                        className="img img-fluid featured-image"
                                    />
                                </div>
                            </section>
                            <section>
                                <div className="container">
                                    <h1 className="display-2 pb-3 pt-3 text-center font-weight-bold">{blog.title}</h1>
                                    <p className="lead mt-3 mark">
                                        Written by{' '}
                                        <Link href={`/profile/${blog.postedBy.username}`}>
                                            <a>{blog.postedBy.username}</a>
                                        </Link>{' '}
                                        | Published {moment(blog.updatedAt).fromNow()}
                                    </p>

                                    <div className="pb-3">
                                        {showBlogCategories(blog)}
                                        {showBlogTags(blog)}
                                        <br />
                                        <br />
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div className="container">
                            <section>
                                <div className="col-md-12 lead">{renderHTML(blog.body)}</div>
                            </section>
                        </div>

                        <div className="container">
                            <h4 className="text-center pt-5 pb-5 h2">Related blogs</h4>
                            <div className="row">{relatedBlogs.length > 0 && showRelatedBlog()}</div>
                        </div>

                        <div className="container pb-5">
                            <p>show comments</p>
                        </div>
                    </article>
                </main>
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
        type: BLOG_READ_REQUEST,
        data: context.params.slug,
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();

});


export default withRouter(SingleBlog);