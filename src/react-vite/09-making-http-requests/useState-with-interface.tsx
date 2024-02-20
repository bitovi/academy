import React, { useState } from 'react';

interface UserProfile {
    email: string;
    name: string;
}

const UserProfileComponent: React.FC = () => {
    const [userProfile, setUserProfile] = useState<UserProfile>({
        email: 'grace.hopper@example.com',
        name: 'Grace Hopper',
    });

    const updateProfile = () => {
        setUserProfile({
            email: 'ada.lovelace@example.com',
            name: 'Ada Lovelace',
        });
    };

    return (
        <form>
            <p>Name: {userProfile.name}</p>
            <p>Email: {userProfile.email}</p>
            <button onClick={updateProfile}>
                Update profile
            </button>
        </form>
    );
};

export default UserProfileComponent;
