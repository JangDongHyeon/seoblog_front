import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import Layout from '../../../../components/Layout';
import { withRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

const ActivateAccount = ({ router }) => {
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        name: '',
        token: '',
    });

    const { name, token } = values;
    const { signUpError, signUpDone, signUpLoading, me } = useSelector((state) => state.user);

    useEffect(() => {
        let token = router.query.id;
        if (token) {
            const { name } = jwt.decode(token);
            setValues({ ...values, name, token });
        }
    }, [router]);


    const clickSubmit = e => {
        e.preventDefault();
        setValues({ ...values, loading: true, error: false });

    };

    const showLoading = () => (loading ? <h2>로딩중...</h2> : '');

    return (
        <Layout>
            <div className="container">
                <h3 className="pb-4">Hey {name}, 로그인할 준비 되었어?</h3>
                {showLoading()}
                {error && error}
                {success && 'You have successfully activated your account. Please signin.'}
                {showButton && (
                    <button className="btn btn-outline-primary" onClick={clickSubmit}>
                        Activate Account
                    </button>
                )}
            </div>
        </Layout>
    );
};

export default withRouter(ActivateAccount);