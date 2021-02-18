import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { backUrl } from '../../config/config';
import { useDispatch, useSelector } from 'react-redux';
import { USER_UPDATE_REQUEST } from '../../actions/types';

const ProfileUpdate = () => {
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        username: '',
        name: '',
        email: '',
        about: '',
        password: '',
        photo: '',
        userData: ''
    });

    const { username, name, email, about, password, photo, userData } = values;
    const { me, profileUpdateError, profileUpdateDone, profileUpdateLoding } = useSelector((state) => state.user);

    useEffect(() => {
        if (me)
            setValues({
                ...values,
                username: me.username,
                name: me.name,
                email: me.email,
                about: me.about
            });
    }, [me])

    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        let userFormData = new FormData();
        userFormData.set(name, value);
        setValues({ ...values, [name]: value, userData: userFormData });
    };


    const handleSubmit = e => {
        e.preventDefault();
        dispatch({
            type: USER_UPDATE_REQUEST,
            data: userData
        })
    }

    const profileUpdateForm = () => (

        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="btn btn-outline-info">
                    Profile photo
                    <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                </label>
            </div>
            <div className="form-group">
                <label className="text-muted">별명</label>
                <input onChange={handleChange('username')} type="text" value={username} className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">이름</label>
                <input onChange={handleChange('name')} type="text" value={name} className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">이메일</label>
                <input onChange={handleChange('email')} type="text" value={email} className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">About</label>
                <textarea onChange={handleChange('about')} type="text" value={about} className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">비밀번호</label>
                <input onChange={handleChange('password')} type="password" value={password} className="form-control" />
            </div>
            <div>
                <button type="submit" className="btn btn-primary">
                    클릭
                </button>
            </div>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: profileUpdateError ? '' : 'none' }}>
            {profileUpdateError}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: profileUpdateDone ? '' : 'none' }}>
            Profile 업데이트 완료
        </div>
    );

    const showLoading = () => (
        <div className="alert alert-info" style={{ display: profileUpdateLoding ? '' : 'none' }}>
            로딩중...
        </div>
    );


    return me ? (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <img
                            src={`${backUrl}/user/photo/${me.username}`}
                            className="img img-fluid img-thumbnail mb-3"
                            style={{ maxHeight: 'auto', maxWidth: '100%' }}
                            alt="user profile"
                        />
                    </div>
                    <div className="col-md-8 mb-5">
                        {showSuccess()}
                        {showError()}
                        {showLoading()}
                        {profileUpdateForm()}
                    </div>
                </div>
            </div>
        </>
    ) : (<></>);
};

export default ProfileUpdate;