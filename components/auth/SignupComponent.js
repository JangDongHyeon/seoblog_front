import React, { useState, useEffect } from 'react';
import { SIGN_UP_REQUEST } from '../../actions/types';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';


const SignupComponent = () => {
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        name: 'jang',
        email: 'test10@test10.com',
        password: '123456',
        showForm: true
    });

    const { signUpError, signUpDone, signUpLoading, me } = useSelector((state) => state.user);

    const { name, email, password, showForm } = values;

    const handleSubmit = e => {
        e.preventDefault();

        const user = { name, email, password };
        dispatch({
            type: SIGN_UP_REQUEST,
            data: user
        })

    }

    if (me) {
        // setValues({ ...values, showForm: false });
        Router.push(`/`);
    }

    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value })
    }

    const showLoading = () => (signUpLoading ? <div className="alert alert-info">Loading...</div> : '');
    const showError = () => (signUpError ? <div className="alert alert-danger">{signUpError}</div> : '');
    // const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');

    const signupForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        value={name}
                        onChange={handleChange('name')}
                        type="text"
                        className="form-control"
                        placeholder="이름"
                    />
                </div>

                <div className="form-group">
                    <input
                        value={email}
                        onChange={handleChange('email')}
                        type="email"
                        className="form-control"
                        placeholder="이메일"
                    />
                </div>

                <div className="form-group">
                    <input
                        value={password}
                        onChange={handleChange('password')}
                        type="password"
                        className="form-control"
                        placeholder="패스워드"
                    />
                </div>
                <div>
                    <button className="btn btn-primary">회원가입</button>
                </div>
            </form>
        )
    };

    return (
        <>
            {showError()}
            {showLoading()}
            {showForm && signupForm()}
        </>
    )


}
export default SignupComponent;