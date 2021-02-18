import React, { useState } from 'react';
import Layout from '../../../../components/Layout';
import { withRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RESET_PASSWORD_REQUEST } from '../../../../actions/types';

const ResetPassword = ({ router }) => {
    const [values, setValues] = useState({
        name: '',
        newPassword: '',
    });
    const { resetPasswordLoading, resetPasswordDone, resetPasswordError, resetPasswordMsg } = useSelector((state) => state.user)
    const { name, newPassword } = values;
    const dispatch = useDispatch();
    const handleSubmit = e => {
        e.preventDefault();
        dispatch({
            type: RESET_PASSWORD_REQUEST,
            data: {
                newPassword,
                resetPasswordLink: router.query.id
            }
        })
    };

    const passwordResetForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group pt-5">
                <input
                    type="password"
                    onChange={e => setValues({ ...values, newPassword: e.target.value })}
                    className="form-control"
                    value={newPassword}
                    placeholder="Type new password"
                    required
                />
            </div>
            <div>
                <button className="btn btn-primary">비밀번호 변경</button>
            </div>
        </form>
    );

    const showError = () => (resetPasswordError ? <div className="alert alert-danger">{resetPasswordError}</div> : '');
    const showMessage = () => (resetPasswordDone ? <div className="alert alert-success">{'좋아! 이제 새 비밀번호로 로그인 할 수 있습니다.'}</div> : '');

    return (
        <Layout>
            <div className="container">
                <h2>Reset password</h2>
                <hr />
                {showError()}
                {showMessage()}
                {passwordResetForm()}
            </div>
        </Layout>
    );
};

export default withRouter(ResetPassword);
