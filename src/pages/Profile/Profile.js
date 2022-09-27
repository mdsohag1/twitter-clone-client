import React from 'react';
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft';
import './Profile.css';
import ProfileCart from './../../components/ProfileCart/ProfileCart';
import PostSide from './../../components/PostSide/PostSide';
import RightSide from '../../components/RightSide/RightSide';

const Profile = () => {
    return (
        <div className='profile'>
            <ProfileLeft></ProfileLeft>
            <div className="profile-center">
                <ProfileCart location="profilePage"></ProfileCart>
                <PostSide></PostSide>
            </div>
            <RightSide></RightSide>
        </div>
    );
};

export default Profile;