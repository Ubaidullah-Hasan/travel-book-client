import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/modal';
import React, { ReactNode } from 'react';
import { IChildren } from '@/src/types';
import PrivateCompo from '@/src/lib/privateComponent/PrivateCompo';

interface IProps extends IChildren {
    title: string;
    buttonCompo: ReactNode;
    className?: string;
}

const CreatePostModal = ({ title, children, buttonCompo, className }: IProps) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button
                disableAnimation
                className={`w-fit p-0 ${className} bg-transparent`}
                onPress={onOpen}
            >
                {buttonCompo}
            </Button>

            <PrivateCompo>
                <Modal
                    backdrop="opaque"
                    className='pb-5'
                    isDismissable={false}
                    isOpen={isOpen}
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
                    onOpenChange={onOpenChange}
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
            </PrivateCompo>
        </>
    );
};

export default CreatePostModal;