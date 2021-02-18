
import React, { useEffect } from 'react';
import Router from 'next/router';
import { useSelector } from 'react-redux';

const Private = ({ children }) => {
    const { me } = useSelector((state) => state.user);
    useEffect(() => {
        if (!me)
            Router.push(`/signin`);

    }, []);
    return <>{children}</>;
};

export default Private;