/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import Link from "next/link";
import { RxDotsHorizontal } from "react-icons/rx";
import { Card, CardBody, Avatar, Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem, user } from "@nextui-org/react";
import AnimatedButton from "../framerMotion/AnimatedButton";
import { useDeleteCommentsById } from "@/src/hooks/comments.hook";
import Loading from "../ui/Loading";
import { useState } from "react";
import EditCommentModal from "./EditCommentModal";




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
                    <div className="space-y-1 bg-default-100 px-4 py-4 rounded-b-md">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-lg font-semibold ">Comments</h1>
                            {commentsOfPost?.length > 2 &&
                                <Link className="text-violet-500 underline text-sm font-semibold" href={"post-comments"}>See All</Link>
                            }
                        </div>
                        {commentsOfPost?.slice(0, 2)?.map((comment: any) => (
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


                                            {/* it for 3dot ... text i will design it, */}
                                            {/* {comment?.userId?._id === userId &&
                                                < Dropdown closeOnSelect>
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

                                                        <DropdownItem
                                                            key="edit"
                                                            className="p-0"
                                                        >
                                                            <EditCommentModal
                                                                btnText={
                                                                    "Edit file"
                                                                }
                                                                userId={userId}
                                                                commentId={comment?._id}
                                                                comment={comment?.comment}
                                                            />
                                                        </DropdownItem>

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
                                            } */}

                                        </div>

                                        {comment?.userId?._id === userId &&
                                            <div className="flex justify-end mt-5 gap-2 me-[10%] border-t border-default-100 pt-2">
                                                <EditCommentModal
                                                    btnText={
                                                        <p
                                                            className="text-sm px-2 py-1 cursor-pointer"
                                                        >Edit</p>
                                                    }
                                                    userId={userId}
                                                    commentId={comment?._id}
                                                    comment={comment?.comment}
                                                />

                                                <p
                                                    onClick={() => handleCommentDelete(comment?._id)}
                                                    className="text-sm px-2 py-1 cursor-pointer text-danger"
                                                >Delete</p>
                                            </div>
                                        }
                                    </CardBody>
                                </Card>

                            </>
                        ))}


                    </div> :
                    ""
            }
        </div >
    );
};

export default CommentCard;