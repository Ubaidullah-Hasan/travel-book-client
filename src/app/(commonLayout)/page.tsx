"use client"
import React from 'react';
import { useGetAllPosts } from '@/src/hooks/post.hook';

const RecentPosts = () => {
    const { data: posts, isLoading } = useGetAllPosts();

    const postsData = posts?.result;

    return (
        <div className='bg-default-400 min-h-screen'>
            {postsData?.length}
        </div>
    );
};

export default RecentPosts;