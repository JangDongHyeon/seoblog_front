import Layout from '../../components/Layout';
import Private from '../../components/auth/Private';
import React, { useState, useEffect } from 'react';
import ProfileUpdate from '../../components/auth/ProfileUpdate';
import Link from 'next/link';
import wrapper from '../../store/configureStore';
import axios from 'axios';
import { LOAD_USER_REQUEST } from '../../actions/types';
import { END } from 'redux-saga'
const UserProfileUpdate = () => {
    return (
        <>
            <Layout>
                <Private>
                    <div className="container-fluid">
                        <div className="row">
                            <ProfileUpdate />
                        </div>
                    </div>
                </Private>
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
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();

});
export default UserProfileUpdate;