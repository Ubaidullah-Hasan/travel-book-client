/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactNode } from 'react';
import { Button } from '@nextui-org/button';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/modal';
import FSForm from '../form/TSForm';
import FSTextarea from '../form/FSTextArea';
import Loading from '../ui/Loading';
import { useCreateComment } from '@/src/hooks/comments.hook';
import { useUser } from '@/src/context/user.provider';

const CommentModal = ({ postId, btnText, }: { postId: string, btnText: ReactNode }) => {
    const { user } = useUser();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { mutate: createComment, isPending } = useCreateComment();


    const handleSubmit: SubmitHandler<FieldValues> = (data) => {
        const commentData = {
            userId: user?._id,
            postId: postId,
            ...data,
        }


        createComment(commentData);
    }

    return (
        <>
            {
                isPending && <Loading />
            }
            <Button className='p-0 bg-transparent w-fit px-3' onPress={onOpen}>
                {btnText}
            </Button>
            
            {
                user?.email
                && <Modal className='z-[100]' isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Drop A Comment</ModalHeader>
                                <ModalBody>
                                    <FSForm onSubmit={handleSubmit}>
                                        <div className='space-y-3'>
                                            <div className='flex gap-5'>
                                                <FSTextarea label='Comment' name='comment' />
                                            </div>

                                            <Button fullWidth color='primary' type='submit'>Comment</Button>
                                        </div>
                                    </FSForm>
                                </ModalBody>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            }
        </>
    );
};

export default CommentModal;