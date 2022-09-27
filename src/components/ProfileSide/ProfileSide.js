import React from 'react';
import FollowersCart from '../FollowersCart/FollowersCart';
import LogoSearch from '../LogoSearch/LogoSearch';
import ProfileCart from '../ProfileCart/ProfileCart';
import './ProfileSide.css'

const ProfileSide = () => {
    return (
        <div className='profileSide'>
            <LogoSearch></LogoSearch>
            <ProfileCart location="homepage"></ProfileCart>
            <FollowersCart></FollowersCart>
        </div>
    );
};

export default ProfileSide;