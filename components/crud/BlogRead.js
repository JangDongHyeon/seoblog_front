
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { BLOG_DELETE_REQUEST } from '../../actions/types';

const BlogRead = props => {
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const { categorys } = useSelector((state) => state.category);
    const { blogs, deleteBlogsDone } = useSelector((state) => state.blog);
    const { tags } = useSelector((state) => state.tag);


    const deleteBlog = slug => {
        dispatch({
            type: BLOG_DELETE_REQUEST,
            data: { slug }
        })
    }

    const deleteConfirm = slug => {
        let answer = window.confirm('블로그를 삭제 하시겠습니까?');
        if (answer) {
            deleteBlog(slug);
        }
    };

    const showUpdateButton = blog => {
        if (me.role === 0) {
            return (
                <Link href={`/user/crud/${blog.slug}`}>
                    <a className="btn btn-sm btn-warning">업데이트</a>
                </Link>
            );
        } else if (me.role === 1) {
            return (
                <Link href={`/admin/crud/${blog.slug}`}>
                    <a className="ml-2 btn btn-sm btn-warning">업데이트</a>
                </Link>
            );
        }
    };

    const showAllBlogs = () => {
        return blogs.map((blog, i) => {
            return (
                <div key={i} className="pb-5">
                    <h3>{blog.title}</h3>
                    <p className="mark">
                        Written by {blog.postedBy.name} | Published on {moment(blog.updatedAt).fromNow()}
                    </p>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteConfirm(blog.slug)}>
                        삭제
                    </button>
                    {showUpdateButton(blog)}
                </div>
            )
        });

    }



    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    {deleteBlogsDone && <div className="alert alert-warning">{deleteBlogsDone}</div>}
                    {showAllBlogs()}
                </div>
            </div>
        </>
    );
};

BlogRead.propTypes = {

};

export default BlogRead;