import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { BLOG_ADD_REQUEST, BLOG_MOUSE_MOVE_REQUEST } from '../../actions/types';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';
import { QuillModules, QuillFormats } from '../../helpers/quill';
import { blogReducersInit } from '../../reducers/blog';

const CreateBlog = ({ router }) => {
    const blogFromLS = () => {
        if (typeof window === 'undefined') {
            return false;
        }

        if (localStorage.getItem('blog')) {
            return JSON.parse(localStorage.getItem('blog'));
        } else {
            return false;
        }
    };
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const { categorys } = useSelector((state) => state.category);
    const { addBlogsDone, addBlogsError, deleteblogsDone } = useSelector((state) => state.blog);
    const { tags } = useSelector((state) => state.tag);
    const [checked, setChecked] = useState([]); // categories
    const [checkedTag, setCheckedTag] = useState([]); // tags


    const [body, setBody] = useState(blogFromLS());
    const [values, setValues] = useState({

        formData: '',
        title: '',

    });

    const { formData, title } = values;

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
    }, [router]);

    useEffect(() => {
        if (addBlogsDone) {
            localStorage.removeItem('blog')
            Router.push('/')
            blogReducersInit
        }
    }, [addBlogsDone]);

    const publishBlog = e => {
        e.preventDefault();
        // console.log('ready to publishBlog');
        dispatch({
            type: BLOG_ADD_REQUEST,
            data: formData
        });

    };

    const handleChange = name => e => {
        // console.log(e.target.value);
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData });
    };

    const handleBody = e => {
        setBody(e);
        formData.set('body', e);
        if (typeof window !== 'undefined') {
            localStorage.setItem('blog', JSON.stringify(e));
        }
    }

    const handleToggle = c => () => {
        const clickedCategory = checked.indexOf(c);
        const all = [...checked];

        if (clickedCategory === -1)
            all.push(c);
        else
            all.splice(clickedCategory, 1);

        console.log(all);
        setChecked(all);
        formData.set('categories', all);
    }

    const handleTagsToggle = t => () => {
        setValues({ ...values, error: '' });
        // return the first index or -1
        const clickedTag = checked.indexOf(t);
        const all = [...checkedTag];

        if (clickedTag === -1) {
            all.push(t);
        } else {
            all.splice(clickedTag, 1);
        }
        console.log(all);
        setCheckedTag(all);
        formData.set('tags', all);
    };


    const showCategories = () => {
        return (
            categorys &&
            categorys.map((c, i) => (
                <li key={i} className="list-unstyled">
                    <input onChange={handleToggle(c._id)} type="checkbox" className="mr-2" />
                    <label className="form-check-label">{c.name}</label>
                </li>
            ))
        );
    };

    const showTags = () => {
        return (
            tags &&
            tags.map((t, i) => (
                <li key={i} className="list-unstyled">
                    <input onChange={handleTagsToggle(t._id)} type="checkbox" className="mr-2" />
                    <label className="form-check-label">{t.name}</label>
                </li>
            ))
        );
    };
    const showError = () => (
        <div className="alert alert-danger" style={{ display: addBlogsError ? '' : 'none' }}>
            {`${addBlogsError}`}
        </div>
    );

    const showSuccess = () => (

        <div className="alert alert-success" style={{ display: addBlogsDone ? '' : 'none' }}>
            {"블로그 생성 성공"}
        </div>
    );

    const createBlogForm = () => {
        return (
            <form onSubmit={publishBlog}>
                <div className="form-group">
                    <label className="text-muted">Title</label>
                    <input type="text" className="form-control" value={title} onChange={handleChange('title')} />
                </div>

                <div className="form-group">
                    <ReactQuill
                        modules={QuillModules}
                        formats={QuillFormats}
                        value={body}
                        placeholder="Write something amazing..."
                        onChange={handleBody}
                    />
                </div>
                <div>
                    <button type="submit" className="btn btn-primary">
                        블로그 생성
                    </button>
                </div>
            </form>
        )

    }


    return (
        <div className="container-fluid pb-5">
            <div className="row">
                <div className="col-md-8">
                    {createBlogForm()}
                    <div className="pt-3">
                        {addBlogsError && showError()}
                        {addBlogsDone && showSuccess()}
                    </div>
                </div>

                <div className="col-md-4">
                    <div>
                        <div className="form-group pb-2">
                            <h5>Featured image</h5>
                            <hr />

                            <small className="text-muted">Max size: 1mb</small>
                            <br />
                            <label className="btn btn-outline-info">
                                이미지 업로드
                                <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                            </label>
                        </div>
                    </div>
                    <div>
                        <h5>카테고리</h5>
                        <hr />

                        <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>{showCategories()}</ul>
                    </div>
                    <div>
                        <h5>#태그</h5>
                        <hr />
                        <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>{showTags()}</ul>
                    </div>
                </div>
            </div>
        </div>
    );





}

export default withRouter(CreateBlog);