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
import { API } from '../../config';


const BlogUpdate = ({ router }) => {

    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const { categorys } = useSelector((state) => state.category);
    const { updateBlogsDone, updateBlogsError, deleteBlogsDone, deleteBlogsError, blog } = useSelector((state) => state.blog);
    const { tags } = useSelector((state) => state.tag);
    const [checked, setChecked] = useState([]); // categories
    const [checkedTag, setCheckedTag] = useState([]); // tags


    const [body, setBody] = useState('');
    const [values, setValues] = useState({

        formData: '',
        title: '',

    });

    const { formData, title } = values;

    const setCategoriesArray = () => {

        let ca = [];
        blog.categories.map((c, i) => {
            ca.push(c._id);
        });
        setChecked(ca);
    }

    const setTagsArray = () => {
        let ta = [];
        blog.tags.map((t, i) => {
            ta.push(t._id);
        });
        setCheckedTag(ta);
    };

    useEffect(() => {
        console.log(blog)
        setValues({ ...values, formData: new FormData() });
        if (blog) {
            if (blog.categories.length > 0)
                setCategoriesArray()
            if (blog.tags.length > 0)
                setTagsArray()
            console.log(body.body)
            setBody(blog.body);
            setValues({ ...values, title: blog.title })
        }
    }, [router, blog]);



    useEffect(() => {
        if (updateBlogsDone) {
            blogReducersInit
            if (me && me.role === 1)
                Router.replace(`/admin`);
            else if (me && me.role === 0)
                Router.replace(`/user`);


        }
    }, [updateBlogsDone]);

    const editBlog = e => {
        e.preventDefault();
        // console.log('ready to publishBlog');
        dispatch({
            type: BLOG_UPDATE_REQUEST,
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

    const findOutCategory = c => {
        console.log(checked)
        const result = checked.indexOf(c);
        if (result !== -1) {
            return true;
        } else {
            return false;
        }
    };

    const findOutTag = t => {
        const result = checkedTag.indexOf(t);
        if (result !== -1) {
            return true;
        } else {
            return false;
        }
    };




    const showCategories = () => {
        return (
            categorys &&
            categorys.map((c, i) => (
                <li key={i} className="list-unstyled">
                    <input onChange={handleToggle(c._id)} checked={findOutCategory(c._id)} type="checkbox" className="mr-2" />
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
                    <input onChange={handleTagsToggle(t._id)} checked={findOutTag(t._id)} type="checkbox" className="mr-2" />
                    <label className="form-check-label">{t.name}</label>
                </li>
            ))
        );
    };
    const showError = () => (
        <div className="alert alert-danger" style={{ display: deleteBlogsError ? '' : 'none' }}>
            {`${deleteBlogsError}`}
        </div>
    );

    const showSuccess = () => (

        <div className="alert alert-success" style={{ display: deleteBlogsDone ? '' : 'none' }}>
            {"블로그 생성 성공"}
        </div>
    );

    const updateBlogForm = () => {
        return (
            <form onSubmit={editBlog}>
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
                        블로그 업데이트
                    </button>
                </div>
            </form>
        )

    }


    return (
        <div className="container-fluid pb-5">
            <div className="row">
                <div className="col-md-8">
                    {updateBlogForm()}
                    <div className="pt-3">
                        {showError()}
                        {showSuccess()}
                    </div>
                    {blog && (
                        <img src={`${API}/api/blog/photo/${blog.slug}`} alt={title} style={{ width: '100%' }} />
                    )}
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

export default withRouter(BlogUpdate);