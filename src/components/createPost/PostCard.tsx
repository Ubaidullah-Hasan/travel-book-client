/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button, ButtonGroup } from "@nextui-org/react";
import { useState } from "react";
import { BiMessageRoundedDetail } from "react-icons/bi";
import parse from 'html-react-parser';
import { Image } from "@nextui-org/image";
import AnimatedButton from "../framerMotion/AnimatedButton";
import { TFollow, TPost } from "@/src/types";
import { useGetUserFollow, useUpdateUserFollow } from "@/src/hooks/user.hook";
import { useUser } from "@/src/context/user.provider";
import { useRouter } from "next/navigation";
import { GoHeart } from "react-icons/go";
import { IoHeartSharp } from "react-icons/io5";
import { useTogglePostDownVote, useTogglePostUpVote } from "@/src/hooks/post.hook";
import { TToggleVote } from "@/src/services/post";
import { LuBadgeAlert, LuBadgeCheck } from "react-icons/lu";


const PostCard = ({ post }: { post: TPost }) => {
    const router = useRouter();
    const { user } = useUser();
    const [isExpanded, setIsExpanded] = useState(false);
    const { data: followInfo } = useGetUserFollow(user?._id);
    const { mutate: updateUpVote, isPending: upVoteUpdating } = useTogglePostUpVote();
    const { mutate: updateDownVote, isPending: downVoteUpdating } = useTogglePostDownVote();

    const followData = (followInfo?.result);
    const followers = followData?.followers;
    const followersCount = followData?.followersCount;
    const following = followData?.following;
    const followingCount = followData?.followingCount;

    const { mutate: handleFollowUpdate, isPending: updating } = useUpdateUserFollow();
    const { description, title, userId, categoryId, images, upVote, downVote, _id } = post;
    const descriptionText = parse(description);

    const isFollowed = followers?.some((follow: TFollow) => follow?._id?.match(userId?._id));

    function stripHtml(html: any) {
        const spaceAdd = (html.replace(/<\/[^>]+>/g, '$& '));
        const tempDiv = document.createElement('div');

        tempDiv.innerHTML = spaceAdd;

        return tempDiv.innerText || tempDiv.textContent || '';
    }


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
        <Card className="rounded-md " shadow="sm">
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
                <AnimatedButton scaleValue={1.05}>
                    {userId?._id !== user?._id ?
                        <Button
                            className={`${isFollowed ? "bg-transparent text-foreground border-default-200" : ""} uppercase`}
                            color="primary"
                            radius="full"
                            size="sm"
                            variant={isFollowed ? "bordered" : "solid"}
                            onPress={handleFollow}
                            isLoading={updating}
                        >
                            {isFollowed ? "Unfollow" : "Follow"}
                        </Button>
                        :
                        <Button
                            className='uppercase'
                            color="primary"
                            radius="full"
                            size="sm"
                            onPress={() => router.push("/my-profile")}
                        >
                            VIEW
                        </Button>
                    }
                </AnimatedButton>
            </CardHeader>
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
                            />
                        ))
                    }
                </div>
                <span className="pt-2 capitalize">
                    #{categoryId?.name}
                </span>
            </CardBody>

            <CardFooter className="gap-3 justify-between border-t border-default-200">
                <div className="flex gap-1">
                    <ButtonGroup radius="full" size="sm"  >
                        <Button
                            className="hover:bg-default-200"
                            onClick={() => handleUpVote(_id)}
                            isLoading={upVoteUpdating}
                            isDisabled={isDownVote}
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
                        >{upVote?.length}</Button>

                        <Button
                            className="bg-transparent/20 hover:bg-default-200 disabled:bg-default-200"
                            onClick={() => handleDownVote(_id)}
                            isLoading={downVoteUpdating}
                            disabled={isUpvote}
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
                        >{downVote?.length}</Button>
                    </ButtonGroup>
                </div>
                <AnimatedButton>
                    <div className="flex gap-1 items-center cursor-pointer">
                        <BiMessageRoundedDetail size={20} />
                        <p className="text-default-400 text-small">Comments</p>
                        <p className="text-small text-default-400">(9)</p>
                    </div>
                </AnimatedButton>
                <div className="flex gap-1">
                    <p className="font-semibold text-default-400 text-small">100</p>
                    <p className="text-default-400 text-small">Seen</p>
                </div>
            </CardFooter>
        </Card>
    );
};

export default PostCard;