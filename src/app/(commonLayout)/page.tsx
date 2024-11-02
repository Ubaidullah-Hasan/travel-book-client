"use client"
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import InfiniteScroll from 'react-infinite-scroll-component';
import { TPost } from '@/src/types';
import { useGetAllPostsFromProvider } from '@/src/context/allPostData.provider';
import { logoutUser } from '@/src/services/authService';
import { useUser } from '@/src/context/user.provider';
import { IoIosWarning } from 'react-icons/io';

const PostCard = dynamic(() => import('@/src/components/createPost/PostCard'), { ssr: false });

const RecentPosts = () => {
    const [items, setItems] = useState<TPost[]>([]);
    const [intoFirst, setIntoFirst] = useState(true);

    const { posts, setQueryOptions, queryOptions } = useGetAllPostsFromProvider();
    const page = queryOptions?.page;

    // todo: real time upvote data not update for infinite scrolling, before it updating

    useEffect(() => {
        if (posts?.length === 0) {
            setItems([])
        }

        if (posts?.length > 0) {
            setItems((prevItems) => {
                if (queryOptions.searchTerm) {
                    return [...posts];
                }
                if (queryOptions.categoryId) {

                    return [...posts];
                }
                if (queryOptions.sortBy) {
                    if(intoFirst){
                        setIntoFirst(false);

                        return[...posts];
                    }
                    const newPosts = posts.filter(post => !prevItems.some(item => item._id === post._id));

                    return [...prevItems, ...newPosts];
                } else {
                    const newPosts = posts.filter(post => !prevItems.some(item => item._id === post._id));

                    return [...prevItems, ...newPosts];
                }
            });
        }
    }, [posts, queryOptions]);

    console.log({ items, queryOptions, posts });


    const hasMore = posts?.length < 10;

    const fetchMoreData = () => {
        setQueryOptions((pre) => ({ ...pre, page: page && page + 1 }));
    }


    const { setIsLoading: userLoading } = useUser();
    const router = useRouter();
    const searchParams = useSearchParams();

    const logout = searchParams.get('logout');

    const handleLogout = async () => {
        if (logout === 'true') {
            await logoutUser();
            userLoading(true);
            router.push("/");
        }
    }

    useEffect(() => {
        handleLogout();
    }, [logout]);

    return (
        <div>
            {items?.length === 0
                && <div className='items-center flex justify-center flex-col mt-[20%]'>
                    <IoIosWarning size={100} />
                    <h3 className='text-lg font-semibold'>No Post Abailable Here!</h3>
                </div>
            }
            <InfiniteScroll
                dataLength={items?.length}
                hasMore={!hasMore}
                endMessage={
                    items.length > 0 && <p className='text-center'>No more posts!</p>
                }
                loader={<p className='text-center'>Loading more posts...</p>}
                next={fetchMoreData}
            >
                <div className='min-h-screen pb-4'>
                    {items?.map((post: TPost) => (
                        <PostCard key={post._id} post={post} />
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default RecentPosts;


