"use client"
import React from 'react';
import CreatePostModalContainer from '@/src/components/createPost/CreatePostModalContainer';
import PrivateRoute from '@/src/lib/privateRoute/PrivateRoute';

const CreatePost = () => {
    return (
        <PrivateRoute>
            <CreatePostModalContainer />
        </PrivateRoute>
    );
};

export default CreatePost;