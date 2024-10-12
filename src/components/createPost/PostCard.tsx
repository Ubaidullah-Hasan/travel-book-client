/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button, ButtonGroup } from "@nextui-org/react";
import {  useState } from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { BiMessageRoundedDetail } from "react-icons/bi";
import parse from 'html-react-parser';
import { Image } from "@nextui-org/image";
import AnimatedButton from "../framerMotion/AnimatedButton";
import { TPost } from "@/src/types";
import { useGetUserFollow, useUpdateUserFollow } from "@/src/hooks/user.hook";
import { useUser } from "@/src/context/user.provider";
import { useRouter } from "next/navigation";



const PostCard = ({ post }: { post: TPost }) => {
    const router = useRouter();
    const { user } = useUser();
    const [isExpanded, setIsExpanded] = useState(false);
    const { data: followInfo } = useGetUserFollow(user?._id);

    const followData = (followInfo?.result);
    const followers = followData?.followers;
    const followersCount = followData?.followersCount;
    const following = followData?.following;
    const followingCount = followData?.followingCount;

    const { mutate: handleFollowUpdate, isPending: updating, isSuccess: updateSuccesfull } = useUpdateUserFollow();
    const { description, title, userId, categoryId, images, upVote, downVote } = post;
    const descriptionText = parse(description);

    const isFollowed = followers?.some((follow: string) => follow.match(userId?._id));

    function stripHtml(html: any) {
        const spaceAdd = (html.replace(/<\/[^>]+>/g, '$& '));
        const tempDiv = document.createElement('div');

        tempDiv.innerHTML = spaceAdd;

        return tempDiv.innerText || tempDiv.textContent || '';
    }

    const cleanText = stripHtml(description);

    const handleFollow = () => {
        const ids = {
            userId: userId?._id,
            followingId: user?._id,
        }

        handleFollowUpdate(ids);
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
                        <h4 className="text-small font-semibold leading-none text-default-600">{userId?.name || "Unknown"}</h4>
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
                            startContent={
                                <AnimatedButton>
                                    <AiFillLike
                                        className={`${upVote ? "text-[#e82020]" : "text-default-600"} `} size={20} />
                                </AnimatedButton>
                            }
                        >{upVote}</Button>

                        <Button
                            className="bg-transparent/20 hover:bg-default-200 "
                            startContent={
                                <AnimatedButton>
                                    <AiFillDislike
                                        className={`${downVote ? "text-[#e82020]" :
                                            "text-default-600"} `} size={20}
                                    />
                                </AnimatedButton>
                            }
                        >{downVote}</Button>
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