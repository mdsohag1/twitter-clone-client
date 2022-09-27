import React from 'react';
import Posts from '../Posts/Posts';
import PostSheare from '../PostSheare/PostSheare';
import './PostSide.css'

const PostSide = () => {
    return (
        <div className='postSide'>
            <PostSheare/>
            <Posts></Posts>
        </div>
    );
};

export default PostSide;