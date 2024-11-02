/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client"
import { Avatar } from '@nextui-org/avatar';
import { Button, ButtonGroup } from '@nextui-org/button';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Modal, ModalBody, ModalContent } from '@nextui-org/modal';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { GoHeart } from 'react-icons/go';
import { IoHeartSharp } from 'react-icons/io5';
import { LuBadgeCheck } from 'react-icons/lu';
import { BiMessageRoundedDetail } from 'react-icons/bi';
import { Skeleton } from '@nextui-org/react';
import { IoMdClose } from 'react-icons/io';
import EditCommentModal from '@/src/components/comment/EditCommentModal';
import AnimatedButton from '@/src/components/framerMotion/AnimatedButton';
import PremiumComponent from '@/src/components/privateComponent/PremiumComponent';
import PrivateComponent from '@/src/components/privateComponent/PrivateComponent';
import DropDownPostEdit from '@/src/components/ui/DropDownPostEdit/DropDownPostEdit';
import Loading from '@/src/components/ui/Loading';
import { useUser } from '@/src/context/user.provider';
import { useDeleteCommentsById, useGetAllCommentsOfPost } from '@/src/hooks/comments.hook';
import { useGetSinglePostsByPostId, useTogglePostDownVote, useTogglePostUpVote } from '@/src/hooks/post.hook';
import { useGetUserFollow, useUpdateUserFollow } from '@/src/hooks/user.hook';
import { TToggleVote } from '@/src/services/post';
import { TFollow } from '@/src/types';
import CommentModal from '@/src/components/comment/CommentModal';


type TParams = {
    params: {
        id: string,
    }
}
const PostComments = ({ params }: TParams) => {
    const { user } = useUser();
    const router = useRouter();
    const postId = params?.id;

    const { mutate: deleteComment, isPending: commentDeleting } = useDeleteCommentsById(user?._id as string);
    const { data: commentsRes, isPending } = useGetAllCommentsOfPost(postId);
    const comments = commentsRes?.result;

    const { data: postRes, isLoading: postLoading } = useGetSinglePostsByPostId(postId);
    const post = postRes?.result;
    let description, title, userId, categoryId, images, upVote, downVote, _id, isPremium;

    description = post?.description;
    title = post?.title;
    userId = post?.userId;
    categoryId = post?.categoryId;
    images = post?.images;
    upVote = post?.upVote;
    _id = post?._id;
    downVote = post?.downVote;
    isPremium = post?.isPremium;

    const { data: followInfo } = useGetUserFollow(user?._id);
    const followData = (followInfo?.result);
    const followers = followData?.followers;
    const isFollowed = followers?.some((follow: TFollow) => follow?._id?.match(userId?._id));

    const handleCommentDelete = (commentId: string) => {
        deleteComment(commentId);
    }

    const { mutate: handleFollowUpdate, isPending: updating } = useUpdateUserFollow();


    const isShowPost = !isPremium || isPremium && (user?.isVerified === true);

    const { mutate: updateUpVote, isPending: upVoteUpdating } = useTogglePostUpVote();
    const { mutate: updateDownVote, isPending: downVoteUpdating } = useTogglePostDownVote();

    const isDownVote = downVote?.some((vote: string) => vote === user?._id) || false;
    const isUpvote = upVote?.some((vote: string) => vote === user?._id) || false;


    function stripHtml(html: any) {
        const spaceAdd = (html?.replace(/<\/[^>]+>/g, '$& '));
        const tempDiv = document.createElement('div');

        tempDiv.innerHTML = spaceAdd;

        return tempDiv.innerText || tempDiv.textContent || '';
    }

    let cleanText = "";

    useEffect(() => {
        cleanText = stripHtml(description);
    }, [description]);

    const goBack = () => {
        if (window.history.length > 1) {
            router.back();
        }
    };

    const handleFollow = () => {
        const ids = {
            userId: userId?._id,
            followingId: user?._id,
        }

        handleFollowUpdate(ids);
    };

    const handleUpVote = (postId: string) => {
        const info = {
            postId: postId,
            userId: user?._id,
        }

        updateUpVote(info as TToggleVote);
    }

    const handleDownVote = (postId: string) => {
        const info = {
            postId: postId,
            userId: user?._id,
        }

        updateDownVote(info as TToggleVote);
    }



    return (
        // todo : scroll problem
        <div className='my-4 '>
            {isPending || commentDeleting && <Loading />}

            <Modal
                hideCloseButton
                backdrop="opaque"
                className='pb-5 '
                isOpen={true}
                motionProps={{
                    variants: {
                        enter: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 0.3,
                                ease: "easeOut",
                            },
                        },
                        exit: {
                            y: -20,
                            opacity: 0,
                            transition: {
                                duration: 0.2,
                                ease: "easeIn",
                            },
                        },
                    }
                }}
                size='2xl'
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalBody>
                                {/* close button */}
                                <p className='w-fit my-2 ms-auto rounded-full bg-default-300 hover:bg-default-200 duration-200 cursor-pointer p-2' onClick={goBack}>
                                    <IoMdClose />
                                </p>
                                <Card className={`rounded-md`} shadow="sm">
                                    <CardHeader className="justify-between border-b border-default-200">
                                        <div className="flex gap-5">
                                            {
                                                postLoading ?
                                                    <Skeleton className="flex rounded-full w-12 h-12" /> :
                                                    <Avatar
                                                        isBordered
                                                        radius="full"
                                                        size="md"
                                                        src={userId?.profilePhoto}
                                                    />
                                            }

                                            <div className="flex flex-col gap-1 items-start justify-center">
                                                <div>
                                                    {
                                                        <h4 className="text-small font-semibold leading-none text-default-600 flex gap-1 items-center">
                                                            {userId?.name || "Unknown"}
                                                            {userId?.isVerified && <LuBadgeCheck className="text-green-500" />}
                                                        </h4>
                                                    }
                                                </div>
                                                <h5 className="text-small tracking-tight text-default-400">{userId?.role}</h5>
                                            </div>
                                        </div>
                                        
                                        <PrivateComponent>
                                            <AnimatedButton scaleValue={1.05} >
                                                {userId?._id !== user?._id ?
                                                    <Button
                                                        className={`${isFollowed ? "bg-transparent text-foreground border-default-200" : ""} uppercase`}
                                                        color="primary"
                                                        isLoading={updating}
                                                        radius="full"
                                                        size="sm"
                                                        variant={isFollowed ? "bordered" : "solid"}
                                                        onPress={handleFollow}
                                                    >
                                                        {isFollowed ? "Unfollow" : "Follow"}
                                                    </Button>
                                                    :
                                                    <DropDownPostEdit postId={_id} />
                                                }
                                            </AnimatedButton>
                                        </PrivateComponent>
                                    </CardHeader>

                                    {
                                        isShowPost ? (
                                            <CardBody className="px-3 py-0 text-small text-default-400 my-4">
                                                <h2 className="text-lg text-default-800 mb-2">{title}</h2>
                                                <p className="text-default-900">
                                                    {cleanText}
                                                </p>
                                                <div className="space-y-2 my-2 ">
                                                    {
                                                        images?.map((image: string, i: number) => (
                                                            <Image
                                                                key={i}
                                                                alt={`${title}-${i}`}
                                                                className="rounded w-full"
                                                                src={image}
                                                                width={1000}
                                                            />
                                                        ))
                                                    }
                                                </div>
                                                <span className="pt-2 capitalize">
                                                    #{categoryId?.name}
                                                </span>
                                            </CardBody>
                                        )
                                            : <></>
                                    }


                                    <CardFooter className="flex-col justify-between items-stretch border-t border-default-200">
                                        <div className="flex gap-3 justify-between items-center ">
                                            {/* vote buttons */}
                                            <div className="flex gap-1">
                                                <PremiumComponent isPremium={isPremium}>
                                                    <ButtonGroup radius="full" size="sm"  >
                                                        <Button
                                                            className="hover:bg-default-200"
                                                            isDisabled={isDownVote}
                                                            isLoading={upVoteUpdating}
                                                            startContent={
                                                                upVote?.some((vote: string) => vote === user?._id) ?
                                                                    (
                                                                        <AnimatedButton scaleValue={isDownVote ? 1 : 1.1}>
                                                                            <IoHeartSharp
                                                                                className={"text-red-600"}
                                                                                size={20}
                                                                            />
                                                                        </AnimatedButton>
                                                                    ) : <AnimatedButton scaleValue={isDownVote ? 1 : 1.1}>
                                                                        <GoHeart
                                                                            className="text-default-500"
                                                                            size={20} />
                                                                    </AnimatedButton>
                                                            }
                                                            onClick={() => handleUpVote(_id)}
                                                        >{upVote?.length}</Button>

                                                        <Button
                                                            className="bg-transparent/20 hover:bg-default-200 disabled:bg-default-200"
                                                            disabled={isUpvote}
                                                            isLoading={downVoteUpdating}
                                                            startContent={
                                                                downVote?.some((vote: string) => vote === user?._id) ?
                                                                    (
                                                                        <AnimatedButton scaleValue={isUpvote ? 1 : 1.1}>
                                                                            <IoHeartSharp
                                                                                className={"text-default-500"}
                                                                                size={20}
                                                                            />
                                                                        </AnimatedButton>
                                                                    ) : <AnimatedButton scaleValue={isUpvote ? 1 : 1.1}>
                                                                        <GoHeart
                                                                            className="text-default-500"
                                                                            size={20} />
                                                                    </AnimatedButton>
                                                            }
                                                            onClick={() => handleDownVote(_id)}
                                                        >{downVote?.length}</Button>
                                                    </ButtonGroup>
                                                </PremiumComponent>
                                            </div>

                                            {/* comment */}
                                            <PremiumComponent isPremium={isPremium}>
                                                <CommentModal
                                                    btnText={
                                                        <AnimatedButton>
                                                            <div className="flex gap-1 items-center cursor-pointer">
                                                                <BiMessageRoundedDetail size={20} />
                                                                <p className="text-default-400 text-small">Comments</p>
                                                                <p className="text-small text-default-400">({comments?.length})</p>
                                                            </div>
                                                        </AnimatedButton>
                                                    }
                                                    postId={post?._id}
                                                />
                                            </PremiumComponent>

                                            {/*   seen  */}
                                            <div className="flex gap-1">
                                                <p className="font-semibold text-default-400 text-small">100</p>
                                                <p className="text-default-400 text-small">Seen</p>
                                            </div>
                                        </div>
                                    </CardFooter>
                                </Card>

                                <div className="space-y-1 bg-default-100 px-4 py-4 rounded-b-md">
                                    <div className="flex items-center justify-between mb-4">
                                        <h1 className="text-lg font-semibold ">Comments</h1>
                                    </div>
                                    {comments?.map((comment: any) => (
                                        <>
                                            <Card key={comment?._id} className="rounded-xl px-6 pt-2 shadow-none border border-default-300">
                                                <CardBody className=" text-small text-default-400">
                                                    <div className="flex items-start gap-5 ">
                                                        <Avatar isBordered radius="full" size="sm" src={comment?.userId?.profilePhoto || "https://nextui.org/avatars/avatar-1.png"} />
                                                        <div className="flex-1">
                                                            <h4 className="text-sm mt-2 font-semibold leading-none text-default-600">{comment?.userId?.name}</h4>
                                                            <p className="mt-2">
                                                                {comment?.comment}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {comment?.userId?._id === user?._id &&
                                                        <div className="flex justify-end mt-5 gap-2 me-[10%] border-t border-default-100 pt-2">
                                                            <EditCommentModal
                                                                btnText={
                                                                    <p
                                                                        className="text-sm px-2 py-1 cursor-pointer"
                                                                    >Edit</p>
                                                                }
                                                                comment={comment?.comment}
                                                                commentId={comment?._id}
                                                                userId={user?._id as string}
                                                            />

                                                            <p
                                                                className="text-sm px-2 py-1 cursor-pointer text-danger"
                                                                onClick={() => handleCommentDelete(comment?._id)}
                                                            >Delete</p>
                                                        </div>
                                                    }
                                                </CardBody>
                                            </Card>
                                        </>
                                    ))}
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div >
    );
};

export default PostComments;