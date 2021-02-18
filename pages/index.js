import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';

import Layout from "../components/Layout"
import Link from 'next/link';
import wrapper from '../store/configureStore';
import { LOAD_USER_REQUEST } from '../actions/types'

const Index = () => {
    return (
        <Layout>
            <article className="overflow-hidden">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1 className="display-4 font-weight-bold">
                                프로그래밍 및 웹 개발 블로그 / 튜토리얼
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center pt-4 pb-5">
                            <p className="lead">
                                React Node NextJs에 대한 최고의 프로그래밍 및 웹 개발 블로그와 튜토리얼 자바 스크립트
                            </p>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="flip flip-horizontal">
                                <div
                                    className="front"
                                    style={{
                                        backgroundImage:
                                            'url(' +
                                            'https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg' +
                                            ')'
                                    }}
                                >
                                    <h2 className="text-shadow text-center h1">React</h2>
                                </div>
                                <div className="back text-center">
                                    <Link href="/categories/react">
                                        <a>
                                            <h3 className="h1">React Js</h3>
                                        </a>
                                    </Link>
                                    <p className="lead">세계에서 가장 인기있는 프론트 엔드 웹 개발 라이브러리</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="flip flip-horizontal">
                                <div
                                    className="front"
                                    style={{
                                        backgroundImage:
                                            'url(' +
                                            'https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg' +
                                            ')'
                                    }}
                                >
                                    <h2 className="text-shadow text-center h1">Node</h2>
                                </div>
                                <div className="back text-center">
                                    <Link href="/categories/node">
                                        <a>
                                            <h3 className="h1">Node Js</h3>
                                        </a>
                                    </Link>
                                    <p className="lead">
                                        JavaScript Ninjas를위한 세계에서 가장 인기있는 백엔드 개발 도구
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="flip flip-horizontal">
                                <div
                                    className="front"
                                    style={{
                                        backgroundImage:
                                            'url(' +
                                            'https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg' +
                                            ')'
                                    }}
                                >
                                    <h2 className="text-shadow text-center h1">Next</h2>
                                </div>
                                <div className="back text-center">
                                    <Link href="/categories/nextjs">
                                        <a>
                                            <h3 className="h1">Next Js</h3>
                                        </a>
                                    </Link>
                                    <p className="lead">SEO React 앱 구축을위한 프로덕션 준비 웹 프레임 워크</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </Layout>
    );


    // return <Layout>
    //     <h2>Index Page</h2>
    //     <Link href="/signup">
    //         <a>Signup</a>
    //     </Link>
    // </Layout>
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
export default Index;