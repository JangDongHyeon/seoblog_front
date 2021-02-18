import Router from 'next/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';


const Admin = ({ children }) => {
    const { me } = useSelector((state) => state.user);
    useEffect(() => {
        if (!me)
            Router.push(`/signin`);
        else if (me.role !== 1)
            Router.push(`/`);

    }, []);
    return <>{children}</>;
}

export default Admin;