import React, { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { TAG_ADD_REQUEST, TAG_DELETE_REQUEST, TAG_MOUSE_MOVE_REQUEST } from '../../actions/types';
import { tagReset } from '../../reducers/tag';

const Category = props => {
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const { tags, addCategorysDone, addCategorysError, deleteCategorysDone } = useSelector((state) => state.tag);
    const [values, setValues] = useState({
        name: '',
    });

    const { name } = values;

    const showCategories = () => {

        if (tags.length > 0) {
            return tags.map((c, i) => {
                return (
                    <button
                        onDoubleClick={() => deleteConfirm(c.slug)}
                        title="삭제하려면 두 번 클릭하세요."
                        key={i}
                        className="btn btn-outline-primary mr-1 ml-1 mt-3"
                    >
                        {c.name}
                    </button>

                )
            });
        } else
            return <></>
    }

    const deleteConfirm = slug => {
        let answer = window.confirm('이 카테고리를 삭제 하시겠습니까?');
        if (answer) {
            dispatch({
                type: TAG_DELETE_REQUEST,
                data: { slug }
            })
        }
    };

    const clickSubmit = e => {
        e.preventDefault();
        // console.log('create tag', name);
        dispatch({
            type: TAG_ADD_REQUEST,
            data: { name }
        })
    };

    const handleChange = e => {
        setValues({ ...values, name: e.target.value });
    };

    const showSuccess = () => {
        if (addCategorysDone) {
            return <p className="text-success">카테고리가 생성되었습니다.</p>;
        }
    };

    const showError = () => {
        if (addCategorysError) {
            return <p className="text-danger">카테고리가 이미 존재합니다.</p>;
        }
    };

    const showRemoved = () => {
        if (deleteCategorysDone) {
            return <p className="text-danger">카테고리가 제거되었습니다.</p>;
        }
    };

    const mouseMoveHandler = e => {
        //    dispatch({
        //        type:TAG_MOUSE_MOVE_REQUEST
        //    })
        console.log(addCategorysDone)
        console.log(addCategorysError)
        console.log(deleteCategorysDone)
        if (addCategorysDone || addCategorysError || deleteCategorysDone) {
            console.log('2222222222222222')
            tagReset();
        }
    };

    const newCategoryFom = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">이름</label>
                <input type="text" className="form-control" onChange={handleChange} value={name} required />
            </div>
            <div>
                <button type="submit" className="btn btn-primary">
                    만들기
                </button>
            </div>
        </form>
    );

    return (
        <>
            {showSuccess()}
            {showError()}
            {showRemoved()}
            <div onMouseMove={mouseMoveHandler()}>
                {newCategoryFom()}
                {tags && showCategories()}
            </div>
        </>
    );
};

Category.propTypes = {

};

export default Category;