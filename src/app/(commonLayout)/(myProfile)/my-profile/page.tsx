"use client"
import { Avatar } from '@nextui-org/avatar';
import { Divider, Skeleton } from "@nextui-org/react";
import { Image } from "@nextui-org/image";
import { IoIosWarning } from 'react-icons/io';
import PostCard from '@/src/components/createPost/PostCard';
import { useUser } from '@/src/context/user.provider';
import { useGetUserAllPosts } from '@/src/hooks/post.hook';
import { useGetUserFollow } from '@/src/hooks/user.hook';
import { TFollow, TPost } from '@/src/types';
import Loading from '@/src/components/ui/Loading';


const MyProfile = () => {
    const { user } = useUser();
    const queryOptions = {
        sortBy: '-updatedAt',
    };

    const { data: postData, isLoading, isFetching } = useGetUserAllPosts(queryOptions, user?._id);
    const posts = (postData?.result)

    const { data: followInfo, isLoading: followDataLoading } = useGetUserFollow(user?._id);

    const followData = (followInfo?.result);
    const followers = followData?.followers;
    const followersCount = followData?.followersCount;
    const following = followData?.following;
    const followingCount = followData?.followingCount;

    return (
        <div className='space-y-8'>
            {/* loading */}
            {isFetching && < Loading />}


            <div className='space-y-3 flex flex-col items-center justify-center'>
                <Skeleton className="rounded-full shadow-md border" isLoaded={!isLoading || !isFetching}>
                    <Avatar fallback className="w-[120px] h-[120px] text-large " src={user?.profilePhoto} />
                </Skeleton>
                <h4 className='font-semibold'>{user?.name}</h4>
            </div>

            <Divider />

            {/* followers section => todo: show user img */}
            {
                followers?.length > 0 && (
                    <div>
                        <h2 className='font-semibold mb-2'>Followings {followersCount}</h2> {/* self profile */}
                        <div className='grid grid-cols-2 sm:grid-cols-3  gap-1 justify-between'>
                            {
                                followers?.map((follower: TFollow) => (
                                    <div key={follower?._id}>
                                        <Skeleton className="rounded-lg w-full h-auto" isLoaded={!followDataLoading}>
                                            <Image
                                                alt={follower?.name}
                                                className='border object-cover'
                                                height={200}
                                                src={follower?.profilePhoto}
                                                width={200}
                                            />
                                        </Skeleton>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
            }

            {/* following section => todo: show following user img */}
            {
                following?.length > 0 && (
                    <div>
                        <h2 className='font-semibold mb-2'>Followers {followingCount}</h2> {/* self profile */}
                        <div className='grid grid-cols-2 sm:grid-cols-3  gap-1'>
                            {
                                following?.map((following: TFollow) => (
                                    <div key={following?._id}>
                                        <Skeleton className="rounded-lg" isLoaded={!followDataLoading}>
                                            <Image
                                                alt={following?.name}
                                                className='border object-cover'
                                                height={200}
                                                src={following?.profilePhoto}
                                                width={200}
                                            />
                                        </Skeleton>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
            }

            {posts?.length === 0
                && <div className='items-center flex justify-center flex-col mt-[20%]'>
                    <IoIosWarning size={100} />
                    <h3 className='text-lg font-semibold'>No Post Abailable Here!</h3>
                </div>
            }

            <div className='space-y-4'>
                {
                    posts?.map((post: TPost) => (
                        <PostCard key={post._id} post={post} />
                    ))
                }
            </div>
        </div>
    );
};

export default MyProfile;