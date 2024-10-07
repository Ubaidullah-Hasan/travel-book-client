import React from 'react';
import "./style.css"
import SearchField from '../form/SearchField';
import CreatePost from '../createPost/CreatePost';
import { ThemeSwitch } from '../ui/theme-switch';

const RightSidebar = async () => {
    

    return (
        <div className='px-3 py-4 fixed top-0 bottom-0 w-[25%] overflow-y-scroll space-y-5'>
            <div className='flex items-center justify-center'>
                <ThemeSwitch />
            </div>
            <SearchField />
            <CreatePost />
        </div>
    );
};

export default RightSidebar;