/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client"
import EditCommentModal from '@/src/components/comment/EditCommentModal';
import Loading from '@/src/components/ui/Loading';
import { useUser } from '@/src/context/user.provider';
import { useDeleteCommentsById, useGetAllCommentsOfPost } from '@/src/hooks/comments.hook';
import { Avatar } from '@nextui-org/avatar';
import { Card, CardBody } from '@nextui-org/card';
import React from 'react';

type TParams = {
    params: {
        id: string,
    }
}
const PostComments = ({ params }: TParams) => {
    const { user } = useUser();
    const postId = params?.id;

    const { mutate: deleteComment, isPending: commentDeleting } = useDeleteCommentsById(user?._id as string);
    const { data: commentsRes, isPending } = useGetAllCommentsOfPost(postId);
    const comments = commentsRes?.result;

    const handleCommentDelete = (commentId: string) => {
        deleteComment(commentId);
    }

    return (
        <div>
            {isPending || commentDeleting && <Loading />}

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
        </div >
    );
};

export default PostComments;