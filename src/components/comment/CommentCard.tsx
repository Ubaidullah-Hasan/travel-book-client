
import Link from "next/link";
import { RxDotsHorizontal } from "react-icons/rx";
import { Card, CardBody, Avatar, Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem } from "@nextui-org/react";
import AnimatedButton from "../framerMotion/AnimatedButton";
import { useDeleteCommentsById } from "@/src/hooks/comments.hook";
import Loading from "../ui/Loading";




const CommentCard = ({ commentsOfPost, userId }: { commentsOfPost: any, userId: string }) => {
    const { mutate: deleteComment, isPending } = useDeleteCommentsById(userId);

    const handleCommentDelete = (commentId: string) => {
        deleteComment(commentId);
    }

    return (
        <div>
            {isPending && <Loading />}
            {
                commentsOfPost?.length > 0 ?
                    <div className="space-y-1 bg-default-100 p-6 pb-4 rounded-b-md">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-lg font-semibold ">Comments</h1>
                            {commentsOfPost?.length > 2 &&
                                <Link className="text-violet-500 underline text-sm font-semibold" href={"post-comments"}>See All</Link>
                            }
                        </div>
                        {commentsOfPost?.slice(0, 2)?.map((comment: any) => (
                            <Card key={comment?._id} className="rounded shadow-none border border-default-300">
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
                                            <Dropdown backdrop="blur">
                                                <DropdownTrigger>
                                                    <Button
                                                        className="p-0 border-none"
                                                        variant="bordered"
                                                    >
                                                        <AnimatedButton >
                                                            <div className="text-default-900">
                                                                <RxDotsHorizontal className="" size={20} />
                                                            </div>
                                                        </AnimatedButton>
                                                    </Button>
                                                </DropdownTrigger>
                                                <DropdownMenu aria-label="Static Actions" variant="faded">
                                                    <DropdownItem key="edit" >Edit file</DropdownItem>
                                                    <DropdownItem
                                                        onClick={() => handleCommentDelete(comment?._id)}
                                                        key="delete"
                                                        className="text-danger"
                                                        color="danger"
                                                    >
                                                        Delete file
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>

                                        }
                                    </div>

                                </CardBody>
                            </Card>
                        ))}


                    </div> :
                    ""
            }
        </div>
    );
};

export default CommentCard;