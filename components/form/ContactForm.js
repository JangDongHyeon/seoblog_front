import React, { useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { FORM_AUTHOR_MEESAGE_GET, FORM_MEESAGE_GET } from '../../actions/types';

const ContactForm = ({ authorEmail }) => {
    const dispatch = useDispatch();
    const { messageDone, messageError } = useSelector((state) => state.form);
    const [values, setValues] = useState({
        message: '',
        name: '',
        email: '',
        sent: false,
        buttonText: 'Send Message',
    });

    const { message, name, email, sent, buttonText } = values;

    const clickSubmit = e => {
        e.preventDefault();
        setValues({ ...values, buttonText: 'Sending...' });
        if (!authorEmail)
            dispatch({
                type: FORM_MEESAGE_GET,
                data: { message, name, email }
            })
        else
            dispatch({
                type: FORM_AUTHOR_MEESAGE_GET,
                data: { authorEmail, message, name, email }
            })
    }

    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value, buttonText: 'Send Message' });
    };

    const showSuccessMessage = () => messageDone && <div className="alert alert-info">연락주셔서 감사합니다..</div>;

    const showErrorMessage = () => (
        <div className="alert alert-danger" style={{ display: messageError ? '' : 'none' }}>
            {messageError}
        </div>
    )

    const contactForm = () => {
        return (
            <form onSubmit={clickSubmit} className="pb-5">
                <div className="form-group">
                    <label className="lead">Message</label>
                    <textarea
                        onChange={handleChange('message')}
                        type="text"
                        className="form-control"
                        value={message}
                        required
                        rows="10"
                    ></textarea>

                </div>

                <div className="form-group">
                    <label className="lead">이름</label>
                    <input type="text" onChange={handleChange('name')} className="form-control" value={name} required />
                </div>
                <div className="form-group">
                    <label className="lead">이메일</label>
                    <input
                        type="email"
                        onChange={handleChange('email')}
                        className="form-control"
                        value={email}
                        required
                    />
                </div>
                <div>
                    <button className="btn btn-primary">{buttonText}</button>
                </div>
            </form>
        )
    }
    return (
        <>
            {showSuccessMessage()}
            {showErrorMessage()}
            {contactForm()}
        </>
    );
}

export default ContactForm;
