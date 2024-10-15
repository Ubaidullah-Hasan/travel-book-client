/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactNode } from 'react';
import { Button } from '@nextui-org/button';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/modal';
import FSForm from '../form/TSForm';
import FSTextarea from '../form/FSTextArea';
import Loading from '../ui/Loading';
import { useCreateComment, useEditCommentsByOwner } from '@/src/hooks/comments.hook';
import { useUser } from '@/src/context/user.provider';

type TProps = {
    userId: string,
    btnText: ReactNode,
    commentId: string,
    comment: string,
}

const EditCommentModal = ({ userId, btnText, commentId, comment }: TProps) => {
    const { user } = useUser();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { mutate: editComment, isPending } = useEditCommentsByOwner(userId);



    const handleSubmit: SubmitHandler<FieldValues> = (data) => {
        const commentData = {
            commentId,
            ...data,
        }
        console.log(commentData);
        editComment(commentData);
    }

    return (
        <>
            {
                isPending && <Loading />
            }
            <Button size='sm' className='bg-transparent w-fit text-sm p-0' onPress={onOpen}>
                {btnText}
            </Button>
            <Modal
                className='z-[100]'
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Edit Your Comment</ModalHeader>
                            <ModalBody>
                                <FSForm onSubmit={handleSubmit}>
                                    <div className='space-y-3'>
                                        <div className='flex gap-5'>
                                            <FSTextarea defaultValue={comment} label='Comment' name='comment' />
                                        </div>

                                        <Button fullWidth color='primary' type='submit'>Edit</Button>
                                    </div>
                                </FSForm>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default EditCommentModal;