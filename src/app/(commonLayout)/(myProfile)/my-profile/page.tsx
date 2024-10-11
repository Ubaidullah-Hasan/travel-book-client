"use client"
import PostCard from '@/src/components/createPost/PostCard';
import { useUser } from '@/src/context/user.provider';
import { useGetUserAllPosts } from '@/src/hooks/post.hook';
import { TPost } from '@/src/types';
import React from 'react';

const MyProfile = () => {
    const {user} = useUser();
    const queryOptions = {
        sortBy: '-updatedAt',
    };
    const { data: posstData, isLoading } = useGetUserAllPosts(queryOptions, user?._id);
    const posts = (posstData?.result)
    console.log(posts)

    return (
        <div className='min-h-screen space-y-4'>
            {
                posts?.map((post: TPost) => (
                    <PostCard key={post._id} post={post} />
                ))
            }
        </div>
    );
};

export default MyProfile;