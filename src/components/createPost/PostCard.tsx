/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button, ButtonGroup } from "@nextui-org/react";
import { useState } from "react";
import { BiMessageRoundedDetail } from "react-icons/bi";
import parse from 'html-react-parser';
import { Image } from "@nextui-org/image";
import { useRouter } from "next/navigation";
import { GoHeart } from "react-icons/go";
import { IoHeartSharp } from "react-icons/io5";
import { LuBadgeCheck } from "react-icons/lu";
import AnimatedButton from "../framerMotion/AnimatedButton";
import DropDownPostEdit from "../ui/DropDownPostEdit/DropDownPostEdit";
import CommentModal from "../comment/CommentModal";
import CommentCard from "../comment/CommentCard";
import { TFollow, TPost } from "@/src/types";
import { useGetSinglUserById, useGetUserFollow, useUpdateUserFollow } from "@/src/hooks/user.hook";
import { useUser } from "@/src/context/user.provider";
import { useTogglePostDownVote, useTogglePostUpVote } from "@/src/hooks/post.hook";
import { TToggleVote } from "@/src/services/post";
import { useGetAllCommentsOfPost } from "@/src/hooks/comments.hook";
import PrivateComponent from "../privateComponent/PrivateComponent";
import PremiumComponent from "../privateComponent/PremiumComponent";




const PostCard = ({ post }: { post: TPost }) => {
    const router = useRouter();
    const { user } = useUser();
    const { data: userRes } = useGetSinglUserById(user?._id);
    const fullUserData = (userRes?.result);
    const [isExpanded, setIsExpanded] = useState(false);
    const { data: followInfo } = useGetUserFollow(user?._id);
    const { mutate: updateUpVote, isPending: upVoteUpdating } = useTogglePostUpVote();
    const { mutate: updateDownVote, isPending: downVoteUpdating } = useTogglePostDownVote();
    const { data: commentsOfPostRes } = useGetAllCommentsOfPost(post?._id);
    const commentsOfPost = (commentsOfPostRes?.result);

    // console.log(commentsOfPost);
    // console.log(commentsOfPost?.userId);

    const followData = (followInfo?.result);
    const followers = followData?.followers;
    // const followersCount = followData?.followersCount;
    // const following = followData?.following;
    // const followingCount = followData?.followingCount;

    const { mutate: handleFollowUpdate, isPending: updating } = useUpdateUserFollow();
    const { description, title, userId, categoryId, images, upVote, downVote, _id, isPremium } = post;
    const descriptionText = parse(description);

    const isFollowed = followers?.some((follow: TFollow) => follow?._id?.match(userId?._id));

    function stripHtml(html: any) {
        const spaceAdd = (html.replace(/<\/[^>]+>/g, '$& '));
        const tempDiv = document.createElement('div');

        tempDiv.innerHTML = spaceAdd;

        return tempDiv.innerText || tempDiv.textContent || '';
    }

    // const isShowPost = !isPremium || isPremium && (fullUserData?.isVerified === true); // todo
    const isShowPost = !isPremium || isPremium && (user?.isVerified === true); // todo

    const isDownVote = downVote?.some((vote) => vote === user?._id) || false;
    const isUpvote = upVote?.some((vote) => vote === user?._id) || false;

    const cleanText = stripHtml(description);

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
        <>

            <Card className={`${commentsOfPost?.length > 0 ? "rounded-t-md rounded-b-none " : "rounded-md"} mt-4`} shadow="sm">
                <CardHeader className="justify-between border-b border-default-200">
                    <div className="flex gap-5">
                        <Avatar
                            isBordered
                            radius="full"
                            size="md"
                            src={userId?.profilePhoto || "https://nextui.org/avatars/avatar-1.png"}
                        />
                        <div className="flex flex-col gap-1 items-start justify-center">
                            <div>
                                {
                                    <h4 className="text-small font-semibold leading-none text-default-600 flex gap-1 items-center">
                                        {userId?.name || "Unknown"}
                                        {userId.isVerified && <LuBadgeCheck className="text-green-500" />}
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
                                {
                                    cleanText.length <= 142 || isExpanded
                                        ? descriptionText
                                        : (cleanText.slice(0, 142))
                                }
                                {cleanText.length >= 142 && !isExpanded ? (
                                    <span className="text-blue-500 ms-2"
                                        role="button"
                                        onClick={() => setIsExpanded(true)}
                                    >See more...</span>
                                ) : ""
                                }
                            </p>
                            <div className="space-y-2 my-2">
                                {
                                    images?.map((image, i) => (
                                        <Image
                                            key={i}
                                            alt={`${title}-${i}`}
                                            className="rounded w-full"
                                            src={image}
                                            width={1000}
                                        // classNames={
                                        //     img
                                        // }
                                        />
                                    ))
                                }
                            </div>
                            <span className="pt-2 capitalize">
                                #{categoryId?.name}
                            </span>
                        </CardBody>
                    ) :
                        <CardBody className="py-0 text-small text-default-400 relative">
                            <div className="w-full h-full absolute bg-violet-500 top-0 left-0 z-[20] flex items-center justify-center " >
                                <Button className="bg-default-200 uppercase text-sm" onClick={() => router.push("/verify-account")}>Premium Content</Button>
                            </div>
                            <h2 className="text-lg text-default-800 mb-2">{title}</h2>
                            <p className="text-default-900">
                                {
                                    cleanText.length <= 142 || isExpanded
                                        ? descriptionText
                                        : (cleanText.slice(0, 142))
                                }
                                {cleanText.length >= 142 && !isExpanded ? (
                                    <span className="text-blue-500 ms-2"
                                        role="button"
                                        onClick={() => setIsExpanded(true)}
                                    >See more...</span>
                                ) : ""
                                }
                            </p>
                            <div className="space-y-2 my-2">
                                {
                                    images?.map((image, i) => (
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
                }


                <CardFooter className="flex-col justify-between items-stretch border-t border-default-200">
                    <div className="flex gap-3 justify-between items-center ">
                        <div className="flex gap-1">
                            <ButtonGroup radius="full" size="sm"  >
                                <Button
                                    className="hover:bg-default-200"
                                    isDisabled={isDownVote}
                                    isLoading={upVoteUpdating}
                                    startContent={
                                        upVote?.some((vote) => vote === user?._id) ?
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
                                        downVote?.some((vote) => vote === user?._id) ?
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
                        </div>
                        <PremiumComponent isPremium={isPremium}>
                            <CommentModal
                                btnText={
                                    <AnimatedButton>
                                        <div className="flex gap-1 items-center cursor-pointer">
                                            <BiMessageRoundedDetail size={20} />
                                            <p className="text-default-400 text-small">Comments</p>
                                            <p className="text-small text-default-400">({commentsOfPost?.length})</p>
                                        </div>
                                    </AnimatedButton>
                                }
                                postId={post?._id}
                            />
                        </PremiumComponent>

                        <div className="flex gap-1">
                            <p className="font-semibold text-default-400 text-small">100</p>
                            <p className="text-default-400 text-small">Seen</p>
                        </div>
                    </div>


                </CardFooter>
            </Card>

            {/* comment display */}
            <CommentCard commentsOfPost={commentsOfPost} userId={user?._id as string} />
            {/* {
                commentsOfPost?.length > 0 ?
                    <div className="space-y-1 bg-default-100 p-6 pb-4 rounded-b-md">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-lg font-semibold ">Comments</h1>
                            {commentsOfPost?.length > 2 &&
                                <Link className="text-violet-500 underline text-sm font-semibold" href={"post-comments"}>See All</Link>
                            }
                        </div>
                        {commentsOfPost?.slice(0, 2)?.map((comment: any) => (
                            <Card key={comment?._id} className=" rounded shadow-none border">
                                <CardBody className="p-5  text-small text-default-400">
                                    <div className="flex items-start gap-5">
                                        <Avatar isBordered radius="full" size="sm" src={comment?.userId?.profilePhoto || "https://nextui.org/avatars/avatar-1.png"} />
                                        <div className="flex-1">
                                            <h4 className="text-sm mt-2 font-semibold leading-none text-default-600">{comment?.userId?.name}</h4>
                                            <p className="mt-2">
                                                {comment?.comment}
                                            </p>
                                        </div>
                                        {
                                            <AnimatedButton >
                                                <RxDotsHorizontal className="mt-2" />
                                            </AnimatedButton>
                                        }
                                    </div>

                                </CardBody>
                            </Card>
                        ))}


                    </div> :
                    ""
            } */}


        </>
    );
};

export default PostCard;