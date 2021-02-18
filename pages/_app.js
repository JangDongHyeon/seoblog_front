import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import withReduxSaga from 'next-redux-saga';

import wrapper from '../store/configureStore';
import { Provider } from 'react-redux';

const Seoblog = ({ Component }) => (

    <>

        <Head>
            <meta charSet="utf-8" />
            <title>Seoblog</title>
        </Head>
        <Component />

    </>
);

Seoblog.propTypes = {
    Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(Seoblog);