// "use client"
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import ModalCloseIcon from "../ui/ModalCloseIcon";
import { IChildren } from "@/src/types";


interface IModalProps extends IChildren {
    title: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
}


const FormModal = ({ children, title, size = "md" }: IModalProps) => {

    return (
        <div className="relative">
            <Modal
                hideCloseButton
                className="py-5 relative mx-2 bg-default-100"
                isOpen={true}
                placement="center"
                size={size}
            >
                <ModalContent className="relative">
                    {() => (
                        <>
                            <ModalCloseIcon />
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