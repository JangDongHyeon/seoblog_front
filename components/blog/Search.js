import Link from 'next/link';
import renderHTML from 'react-render-html';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BLOG_SEARCH_REQUEST } from '../../actions/types'

const Search = () => {
    const dispatch = useDispatch();
    const { searchBlogs, searchBlogsError, searchBlogsDone } = useSelector((state) => state.blog);
    const [values, setValues] = useState({
        search: undefined,
        searched: false,
        message: ''
    });
    const { search } = values;

    const searchSubmit = e => {
        e.preventDefault();

        dispatch({
            type: BLOG_SEARCH_REQUEST,
            data: { search }
        })
    }

    const handleChange = e => {
        // console.log(e.target.value);
        setValues({ ...values, search: e.target.value });
    };

    const searchedBlogs = () => {
        return (
            <div className="jumbotron bg-white">
                {searchBlogsError && <p className="pt-4 text-muted font-italic">{searchBlogsError}</p>}

                {searchBlogs.length > 0 && searchBlogs.map((blog, i) => {
                    return (
                        <div key={i}>
                            <Link href={`/blogs/${blog.slug}`}>
                                <a className="text-primary">{blog.title}</a>
                            </Link>
                        </div>
                    )
                })}

            </div>


        )
    }

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <div className="row">
                <div className="col-md-8">
                    <input type="search" className="form-control" placeholder="Search blogs" onChange={handleChange} />
                </div>

                <div className="col-md-4">
                    <button className="btn btn-block btn-outline-primary" type="submit">
                        검색
                    </button>
                </div>
            </div>
        </form>
    );

    return (
        <div className="container-fluid">
            <div className="pt-3 pb-5">{searchForm()}</div>
            {searchBlogsDone && <div style={{ marginTop: '-120px', marginBottom: '-80px' }}>{searchedBlogs()}</div>}
        </div>
    );
}

export default Search;