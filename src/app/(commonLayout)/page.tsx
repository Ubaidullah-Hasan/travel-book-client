"use client"
import dynamic from 'next/dynamic';
import { TPost } from '@/src/types';
import Loading from '@/src/components/ui/Loading';
import { useGetAllPostsFromProvider } from '@/src/context/allPostData.provider';
import { IoIosWarning } from "react-icons/io";
import { useEffect } from 'react';
import { logoutUser } from '@/src/services/authService';
import { useUser } from '@/src/context/user.provider';
import { useRouter, useSearchParams } from 'next/navigation';

const PostCard = dynamic(() => import('@/src/components/createPost/PostCard'), { ssr: false });

const RecentPosts = () => {
    // const [searT, setSearT] = useState('');
    // const [sort, setSort] = useState<string>("");
    // const [categoryId, setCategoryId] = useState<string>("");
    // const [page, setPage] = useState(1);
    // const [hasMore, setHasMore] = useState(true);

    const { posts, isLoading } = useGetAllPostsFromProvider();


    // // Handle scroll event to trigger loading more posts
    // const handleScroll = () => {
    //     if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && hasMore && !isLoading) {
    //         setPage(prevPage => prevPage + 1);
    //         setPosts([]); // Clear posts when loading new page
    //     }
    // };

    // // Append new posts to existing posts when page changes
    // useEffect(() => {
    //     if (postsData?.length) {
    //         setPosts(prevPosts => [...prevPosts, ...postsData]);
    //         if (postsData.length < 10) {
    //             setHasMore(false);
    //         } else {
    //             setHasMore(true); // Ensure hasMore is true if there are more posts
    //         }
    //     }
    // }, [postsData]);

    // // Set up scroll event listener
    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);

    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, [hasMore, isLoading]);

    // const onSubmit: SubmitHandler<FieldValues> = (data) => {

    //     if (!data.search) {
    //         // setPosts([]);
    //         setSearT("");

    //         return;
    //     }
    //     // setPosts([]);
    //     setSearT(data.search);

    // };
    const { setIsLoading } = useUser();
    const router = useRouter();
    const searchParams = useSearchParams(); 

    const logout = searchParams.get('logout');

    const handleLogout = async () => {
        if (logout === 'true') {
            await logoutUser();
            setIsLoading(true);
            router.push("/");
        }
    }

    useEffect(() => {
        handleLogout();
    }, [logout]);

    return (
        <div>
            {posts?.length === 0 &&
                <div className='items-center flex justify-center flex-col mt-[20%]'>
                    <IoIosWarning size={100} />
                    <h3 className='text-lg font-semibold'>No Post Abailable Here!</h3>
                </div>
            }
            {isLoading && <Loading />}
            <div className='min-h-screen pb-4'>

                {posts?.map((post: TPost) => (
                    <PostCard key={post._id} post={post} />
                ))}
                {/* {isLoading && <p className='text-center'>Loading more posts...</p>}
                {!hasMore && <p className='text-center'>No more posts to load.</p>} */}
            </div>
        </div>
    );
};

export default RecentPosts;


