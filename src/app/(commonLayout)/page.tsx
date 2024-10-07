"use client"
import React from 'react';
import { useGetAllPosts } from '@/src/hooks/post.hook';
import PostCard from '@/src/components/createPost/PostCard';
import { TPost } from '@/src/types';

const RecentPosts = () => {
    const queryOptions = {
        sortBy: '-updatedAt',
        searchTerm: '',
    };

    const { data: posts } = useGetAllPosts(queryOptions);

    const postsData = posts?.result;

    return (
        <div className='min-h-screen space-y-4'>
            {
                postsData?.map((post: TPost) => (
                    <PostCard key={post._id} post={post} />
                ))
            }
        </div>
    );
};

export default RecentPosts;