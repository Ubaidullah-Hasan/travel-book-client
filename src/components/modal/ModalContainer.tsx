"use client"
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/modal';
import React, { ReactNode } from 'react';
import ModalCloseIcon from '../ui/ModalCloseIcon';
import { IChildren } from '@/src/types';
import { usePathname } from 'next/navigation';


interface IProps extends IChildren {
    title: string;
    buttonCompo?: ReactNode;
    className?: string;
}

const ModalContainer = ({ title, children }: IProps) => {
    const pathName = usePathname();

    return (
        <>

            <Modal
                hideCloseButton
                backdrop="opaque"
                className='pb-5 mx-2 bg-default-50 '
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
                placement={pathName === "/create-post" ? "center" : "top"}
            >
                <ModalContent className='relative'>
                    {() => (
                        <>
                            <ModalCloseIcon />
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

export default ModalContainer;