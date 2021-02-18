import React, { useState, useEffect } from 'react';
import { LOG_IN_REQUEST } from '../../actions/types';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';


const SigninComponent = () => {
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        email: 'admin@admin.com',
        password: '123456',
        showForm: true
    });

    const { logInError, logInDone, logInLoading, me } = useSelector((state) => state.user);

    const { email, password, showForm } = values;
    console.log(me)
    const handleSubmit = e => {
        e.preventDefault();

        const user = { email, password };
        dispatch({
            type: LOG_IN_REQUEST,
            data: user
        })

    }
    // useEffect(()=>{
    //     Router.push(`/`);
    // },[])
    if (me) {
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
        Router.push(`/`);
    }



    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value })
    }

    const showLoading = () => (logInLoading ? <div className="alert alert-info">Loading...</div> : '');
    const showError = () => (logInError ? <div className="alert alert-danger">{logInError}</div> : '');
    // const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');

    const signupForm = () => {
        return (
            <form onSubmit={handleSubmit}>


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
                    <button className="btn btn-primary">로그인</button>
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
export default SigninComponent;