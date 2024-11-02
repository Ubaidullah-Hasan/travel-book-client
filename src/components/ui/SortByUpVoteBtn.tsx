"use client"
import { Button } from '@nextui-org/button';
import React, { useState } from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { useGetAllPostsFromProvider } from '@/src/context/allPostData.provider';

const SortByUpVoteBtn = () => {
    const [sort, setSort] = useState<string>("");

    const { setQueryOptions } = useGetAllPostsFromProvider();


    const handleSort = () => {
        if (sort === "") {
            setSort("-upVoteSize");
            setQueryOptions((prev) => ({ ...prev, sortBy: "-upVoteSize", page: 1 }))
        } else if (sort === "-upVoteSize") {
            setSort("");
            setQueryOptions((prev) => ({ ...prev, sortBy: "", page: 1 }))
        }
    }

    return (
        <div>
            <Button fullWidth color='primary' onClick={handleSort}>
                Popular Post
                {sort === "-upVoteSize" && <FaRegCheckCircle />}
            </Button>
        </div>
    );
};

export default SortByUpVoteBtn;