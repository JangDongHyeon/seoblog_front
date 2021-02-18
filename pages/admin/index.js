import React from 'react';
import Layout from '../../components/Layout';
import Admin from '../../components/auth/Admin';
import Link from 'next/link';
import wrapper from '../../store/configureStore';
import axios from 'axios';
import { LOAD_USER_REQUEST } from '../../actions/types';
import { END } from 'redux-saga';

const AdminIndex = () => {
    return (
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>관리자 페이지</h2>
                        </div>
                        <div className="col-md-4">
                            <ul class="list-group">
                                <li className="list-group-item">
                                    <Link href="/admin/crud/category-tag">
                                        <a>카테고리 생성</a>
                                    </Link>
                                </li>

                                <li className="list-group-item">
                                    <Link href="/admin/crud/category-tag">
                                        <a>태그 생성</a>
                                    </Link>
                                </li>

                                <li className="list-group-item">
                                    <a href="/admin/crud/blog">블로그 생성</a>
                                </li>

                                <li className="list-group-item">
                                    <Link href="/admin/crud/blogs">
                                        <a>블로그 업데이트/삭제</a>
                                    </Link>
                                </li>

                                <li className="list-group-item">
                                    <Link href="/user/update">
                                        <a>사용자 업데이트</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-8">오른쪽</div>
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
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();

});

export default AdminIndex;