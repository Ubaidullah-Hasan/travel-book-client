"use client"
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import InfiniteScroll from 'react-infinite-scroll-component';
import { IoIosWarning } from 'react-icons/io';
import { TPost } from '@/src/types';
import { useGetAllPostsFromProvider } from '@/src/context/allPostData.provider';
import { logoutUser } from '@/src/services/authService';
import { useUser } from '@/src/context/user.provider';
import Loading from '@/src/components/ui/Loading';

const PostCard = dynamic(() => import('@/src/components/createPost/PostCard'), { ssr: false });

const RecentPosts = () => {
    const [items, setItems] = useState<TPost[]>([]);
    const [intoFirst, setIntoFirst] = useState(true);
    const [isQueryChanging, setIsQueryChanging] = useState(false);
    const [updatePostId, setUpdatePostId] = useState("");

    const { posts, setQueryOptions, queryOptions } = useGetAllPostsFromProvider();
    const page = queryOptions?.page;

    useEffect(() => {
        if (posts?.length === 0 && items?.length % 10 === 0) {
            setItems(items)
            setIsQueryChanging(false);
        } else if (posts?.length === 0) {
            setItems([])
            setIsQueryChanging(false);
        }

        if (posts?.length > 0) {
            setItems((prevItems) => {
                const updatedItem = posts.find((item) => item?._id === updatePostId);
                const withoutUpdatedItems = prevItems.filter((item) => item?._id !== updatePostId);

                // // If there's an updated item, include it at the same position in the array
                let newItems = updatedItem ? [
                    ...withoutUpdatedItems.slice(0, prevItems.findIndex(item => item._id === updatePostId)),
                    updatedItem,
                    ...withoutUpdatedItems.slice(prevItems.findIndex(item => item._id === updatePostId))
                ] : [...prevItems];


                if (queryOptions.searchTerm) {
                    return [...posts];
                }
                if (queryOptions.categoryId) {

                    return [...posts];
                }
                if (queryOptions.sortBy) {
                    if (intoFirst) {
                        setIntoFirst(false);

                        return [...posts];
                    }
                    const newPosts = posts.filter(post => !prevItems.some(item => item._id === post._id));

                    return [...newItems, ...newPosts];
                }
                if (queryOptions.sortBy === "") {
                    setIsQueryChanging(false);
                    if (!intoFirst) {
                        setIntoFirst(true);

                        return [...posts];
                    }

                    const newPosts = posts.filter(post => !prevItems.some(item => item._id === post._id));

                    return [...newItems, ...newPosts];
                }
                else {
                    const newPosts = posts.filter(post => !prevItems.some(item => item._id === post._id));

                    return [...newItems, ...newPosts];
                }
            });
            setIsQueryChanging(false);
        }
    }, [posts, queryOptions]);

    // console.log({ items, queryOptions, posts });


    useEffect(() => {
        setIsQueryChanging(true);
    }, [queryOptions]);


    // const hasMore = posts?.length < 10;
    const hasMore = posts?.length === 10;

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
            {isQueryChanging && <Loading />}
            {items?.length === 0
                ? <div className='items-center flex justify-center flex-col mt-[20%]'>
                    <IoIosWarning size={100} />
                    <h3 className='text-lg font-semibold'>No Post Abailable Here!</h3>
                </div> :

                <InfiniteScroll
                    dataLength={items?.length}
                    endMessage={
                        items.length > 0 && <p className='text-center'>No more posts!</p>
                    }
                    // hasMore={hasMore}
                    hasMore={hasMore}
                    loader={<p className='text-center'>Loading more posts...</p>}
                    next={fetchMoreData}
                >
                    <div className='min-h-screen pb-4 space-y-4 '>
                        {items?.map((post: TPost) => (
                            <PostCard key={post._id} post={post} setUpdatePostId={setUpdatePostId} />
                        ))}
                    </div>
                </InfiniteScroll>
            }

        </div>
    );
};

export default RecentPosts;


