// "use client"
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import { IChildren } from "@/src/types";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";


interface IModalProps extends IChildren {
    title: string;
}


const FormModal = ({ children, title }: IModalProps) => {

    return (
        <div className="relative">
            <Link href={"/"} className="z-[100] p-2 rounded-full bg-default-200 hover:bg-default-300 duration-300 absolute translate-x-[525px]  translate-y-[275px]">
                <IoMdClose size={15} />
            </Link>
            <Modal
                hideCloseButton
                className="py-5 "
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