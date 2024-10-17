// "use client"
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import { IChildren } from "@/src/types";
import ModalCloseIcon from "../ui/ModalCloseIcon";


interface IModalProps extends IChildren {
    title: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
}


const FormModal = ({ children, title, size = "md" }: IModalProps) => {

    return (
        <div className="relative">
            <ModalCloseIcon />
            <Modal
                hideCloseButton
                className="py-5 relative"
                isOpen={true}
                placement="top-center"
                size={size}
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