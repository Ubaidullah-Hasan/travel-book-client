// "use client"
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import { IChildren } from "@/src/types";


interface IModalProps extends IChildren {
    title: string;
}


const FormModal = ({ children, title }: IModalProps) => {

    return (
        <div className="relative">
            <Link className="z-[100] p-2 rounded-full bg-default-200 hover:bg-default-300 duration-300 absolute right-[50%] top-[80px] animate-ping" href={"/"}>
                <IoMdClose size={15} />
            </Link>
            <Modal
                hideCloseButton
                className="py-5 relative"
                isOpen={true}
                placement="top-center"
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-center capitalize">
                                {title}
                            </ModalHeader>
                            <ModalBody>
                                {children}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default FormModal;