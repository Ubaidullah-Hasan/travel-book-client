/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button, ButtonGroup } from "@nextui-org/react";
import { useState } from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { BiMessageRoundedDetail } from "react-icons/bi";
import AnimatedButton from "../framerMotion/AnimatedButton";
import { TPost } from "@/src/types";





const PostCard = ({ post }: { post: TPost }) => {
    console.log(post);
    const [isFollowed, setIsFollowed] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const { description, title, userId, categoryId, images, upVote, downVote, _id } = post;


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
                        <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5>
                    </div>
                </div>
                <Button
                    className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
                    color="primary"
                    radius="full"
                    size="sm"
                    variant={isFollowed ? "bordered" : "solid"}
                    onPress={() => setIsFollowed(!isFollowed)}
                >
                    {isFollowed ? "Unfollow" : "Follow"}
                </Button>
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400 my-4">
                <h2 className="text-lg text-default-800 mb-2">{title}</h2>
                <p>
                    {description.length <= 142 || isExpanded ? description : `${description.slice(0, 141)}`}
                    {description.length >= 142 && !isExpanded ? (
                        <span className="text-blue-500 ms-2"
                            role="button"
                            onClick={() => setIsExpanded(true)}
                        >See more...</span>
                    ) : ""
                    }
                </p>
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
                        <BiMessageRoundedDetail size={20}/>
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