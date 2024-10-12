"use client"
import { Avatar } from '@nextui-org/avatar';
import { Skeleton } from "@nextui-org/react";
import { Image } from "@nextui-org/image";
import PostCard from '@/src/components/createPost/PostCard';
import { useUser } from '@/src/context/user.provider';
import { useGetUserAllPosts } from '@/src/hooks/post.hook';
import { useGetUserFollow } from '@/src/hooks/user.hook';
import { TPost } from '@/src/types';


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

    // console.log(followData);

    return (
        <div className='space-y-8'>
            <div className='space-y-3 flex flex-col items-center justify-center '>
                <Skeleton className="rounded-full shadow-md border" isLoaded={!isLoading || !isFetching}>
                    <Avatar fallback className="w-[120px] h-[120px] text-large" src={user?.profilePhoto} />
                </Skeleton>
                <h4 className='font-semibold'>{user?.name}</h4>
            </div>

            {/* followers section => todo: show user img */}
            {
                followers?.length > 0 && (
                    <div>
                        <h2 className='font-semibold mb-2'>Followers {followersCount}</h2>
                        <div className='grid grid-cols-4 gap-1 justify-between'>
                            {
                                followers?.map((follower: string) => (
                                    <div key={follower}>
                                        <Skeleton className="rounded-lg w-full h-auto" isLoaded={followDataLoading}>
                                            <Image
                                                alt="NextUI hero Image with delay"
                                                height={200}
                                                src="https://app.requestly.io/delay/5000/https://nextui.org/images/hero-card-complete.jpeg"
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
                        <h2 className='font-semibold mb-2'>Followings {followingCount}</h2>
                        <div className='grid grid-cols-4 gap-1'>
                            {
                                following?.map((following: string) => (
                                    <div key={following}>
                                        <Skeleton className="rounded-lg" isLoaded={followDataLoading}>
                                            <Image
                                                alt="NextUI hero Image with delay"
                                                height={200}
                                                src="https://app.requestly.io/delay/5000/https://nextui.org/images/hero-card-complete.jpeg"
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