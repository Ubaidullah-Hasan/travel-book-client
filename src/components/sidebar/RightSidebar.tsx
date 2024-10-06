import React from 'react';
import "./style.css"
import SearchField from '../form/SearchField';
import CreatePost from '../createPost/CreatePost';


const RightSidebar = () => {
    return (
        <div className='px-3 py-4 fixed top-0 bottom-0 w-[25%] overflow-y-scroll'>
            <SearchField />
            <CreatePost />
        </div>
    );
};

export default RightSidebar;