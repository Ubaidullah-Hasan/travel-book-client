"use client"
import React from 'react';
import "./style.css"
import SearchField from '../form/SearchField';
import CreatePost from '../createPost/CreatePostCard';
import { ThemeSwitch } from '../ui/theme-switch';
import FilterCategoryField from '../ui/FilterCategoryField';
import SortByUpVoteBtn from '../ui/SortByUpVoteBtn';

const RightSidebar = () => {

    return (
        <div className='px-3 py-4 fixed top-0 bottom-0 w-[25%] overflow-y-scroll space-y-5'>
            <div className='flex items-center justify-center'>
                <ThemeSwitch />
            </div>
            <SearchField />
            <FilterCategoryField />
            <SortByUpVoteBtn />
            <CreatePost />
        </div>
    );
};

export default RightSidebar;