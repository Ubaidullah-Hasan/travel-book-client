/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Button } from '@nextui-org/button';
import { FaRegCheckCircle } from 'react-icons/fa';
import { Input } from '@nextui-org/input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useGetAllPosts } from '@/src/hooks/post.hook';
import { useGetAllCategories } from '@/src/hooks/categories.hook';
import { TPost } from '@/src/types';
import useDebounce from '@/src/hooks/debounce.hook';
import { SearchIcon } from '@/src/assets/icons';

const PostCard = dynamic(() => import('@/src/components/createPost/PostCard'), { ssr: false });

const RecentPosts = () => {
    const { register, handleSubmit, watch } = useForm();
    const [searT, setSearT] = useState('');
    const [sort, setSort] = useState<string>("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState<TPost[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [isFirstLoad, setIsFirstLoad] = useState(true); 


    const searchValue = watch("search");
    const searchTerm = useDebounce(searchValue);

    const queryOptions = {
        searchTerm: searT,
        sortBy: sort,
        selectedCategories: selectedCategories,
        page,
    };

    const { data: fetchedPosts, isLoading } = useGetAllPosts(queryOptions);
    const postsData = fetchedPosts?.result; console.log({ postsData, posts });


    // const { data: categoriesRes } = useGetAllCategories();
    // const categories = categoriesRes?.result;


    useEffect(() => {
        if (isFirstLoad) {
            setIsFirstLoad(false);
            return;
        }

        if (searchTerm) {
            setPosts([]);
            setSearT(searchTerm);

            return;
        } else if (searchTerm === "") {
            setPosts([]);
            setPage(1);
            setSearT("");
        }

    }, [searchTerm])




    // Handle scroll event to trigger loading more posts
    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && hasMore && !isLoading) {
            setPage(prevPage => prevPage + 1);  // Load next page
        }
    };

    // Append new posts to existing posts when page changes
    useEffect(() => {
        if (postsData?.length) {
            setPosts(prevPosts => [...prevPosts, ...postsData]);
            if (postsData.length < 10) {
                setHasMore(false);
            }
        }
    }, [postsData]);

    // Set up scroll event listener
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hasMore, isLoading]);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data.search);

        if (!data.search) {
            setPosts([]);
            setSearT("");

            return;
        }

        setPosts([]);
        setSearT(data.search);

    };

    return (
        <div>
            <div className='mb-4 flex justify-between items-center gap-1'>
                <Button color='primary' onClick={() => { setSort("-upVote"); setPage(1); setPosts([]); }}>
                    Sort By Upvote
                    {sort === "-upVote" && <FaRegCheckCircle />}
                </Button>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <motion.div
                        animate={{ opacity: 1, scale: 1 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ scale: 1.01 }}
                    >
                        <Input
                            {...register('search')}
                            aria-label="Search"
                            classNames={{
                                inputWrapper: "shadow",
                                input: "text-sm ",
                            }}
                            placeholder="Search Moment"
                            size='lg'
                            startContent={
                                <SearchIcon className="pointer-events-none flex-shrink-0 text-base text-default-600" />
                            }
                            type="text"
                        />
                    </motion.div>
                </form>

                {/* Uncomment if you want to use category filtering */}
                {/* <Select
                    label="Filter By Category"
                    className="max-w-xs"
                    size='sm'
                    onChange={(e) => setSelectedCategories([e.target.value])}
                >
                    {categories?.map((category: any) => (
                        <SelectItem key={category?._id} value={category._id}>
                            {category?.name}
                        </SelectItem>
                    ))}
                </Select> */}
            </div>

            <div className='min-h-screen space-y-4'>
                {posts.map((post: TPost) => (
                    <PostCard key={post._id} post={post} />
                ))}
                {isLoading && <p className='text-center'>Loading more posts...</p>}
                {!hasMore && <p className='text-center'>No more posts to load.</p>}
            </div>
        </div>
    );
};

export default RecentPosts;
