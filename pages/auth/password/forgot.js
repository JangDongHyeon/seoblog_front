import react, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FORGOT_PASSWORD_REQUEST } from '../../../actions/types';
import Layout from '../../../components/Layout';


const ForgotPassword = () => {
    const { forgotPasswordLoading, forgotPasswordDone, forgotPasswordError, forgotPasswordMsg } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        email: '',
    });



    const { email } = values;

    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        dispatch({
            type: FORGOT_PASSWORD_REQUEST,
            data: { email }
        })

    };

    const showError = () => (forgotPasswordError ? <div className="alert alert-danger">{forgotPasswordError}</div> : '');
    const showMessage = () => (forgotPasswordDone ? <div className="alert alert-success">{forgotPasswordMsg}</div> : '');

    const passwordForgotForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group pt-5">
                <input
                    type="email"
                    onChange={handleChange('email')}
                    className="form-control"
                    value={email}
                    placeholder="Type your email"
                    required
                />
            </div>
            <div>
                <button className="btn btn-primary">비밀번호 재설정 링크 보내기</button>
            </div>
        </form>
    );

    return (
        <Layout>
            <div className="container">
                <h2>비밀번호를 잊으 셨나요?</h2>
                <hr />
                {showError()}
                {showMessage()}
                {passwordForgotForm()}
            </div>
        </Layout>
    );
}


export default ForgotPassword;