"use client"
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/modal';
import React, { ReactNode } from 'react';
import { IChildren } from '@/src/types';


interface IProps extends IChildren {
    title: string;
    buttonCompo?: ReactNode;
    className?: string;
}

const CreatePostModal = ({ title, children }: IProps) => {

    return (
        <>

            <Modal
                hideCloseButton
                backdrop="opaque"
                className='pb-5'
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
                            <ModalHeader className="flex flex-col gap-1 text-center border-b border-default-200">
                                {title}
                            </ModalHeader>
                            <ModalBody>
                                {children}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default CreatePostModal;