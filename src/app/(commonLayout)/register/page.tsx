"use client"
import { LockIcon, MailIcon } from "@/src/assets/icons";
import FSInput from "@/src/components/form/FSInput";
import FSForm from "@/src/components/form/TSForm";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { FaRegUser, FaUserInjured } from "react-icons/fa";


const Register = () => {
    const [isPass, setIsPass] = useState<boolean>(true);
    const handleSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
    }

    return (
        <div>
            <Modal
                isOpen={true}
                placement="top-center"
                className="login-modal"
                hideCloseButton
            >
                <ModalContent>
                    {() => (
                        <>
                            <FSForm onSubmit={handleSubmit}>
                                <ModalHeader className="flex flex-col gap-1 text-center capitalize">Register</ModalHeader>
                                <ModalBody>

                                    <div className="space-y-3">
                                        <FSInput
                                            endContent={
                                                <FaRegUser
                                                    className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                                                />
                                            }
                                            label="Name"
                                            name="name"
                                            placeholder="Enter your name"
                                            type="text"
                                            variant="bordered"
                                        />
                                        <FSInput
                                            endContent={
                                                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                            }
                                            label="Email"
                                            name="email"
                                            placeholder="Enter your email"
                                            variant="bordered"
                                        />
                                        <FSInput
                                            endContent={
                                                <LockIcon
                                                    className="text-2xl text-default-400 pointer-events-none flex-shrink-0 cursor-pointer"
                                                    onClick={() => setIsPass(!isPass)}
                                                />
                                            }
                                            label="Password"
                                            name="password"
                                            placeholder="Enter your password"
                                            type={isPass ? "password" : "text"}
                                            variant="bordered"
                                        />
                                    </div>

                                </ModalBody>
                                <ModalFooter className="flex-col">
                                    <p className="flex gap-2 justify-start">
                                        I Have a Account!
                                        <Link href="/login">login</Link>
                                    </p>
                                    <Button fullWidth type="submit" color="primary" >
                                        Register
                                    </Button>
                                </ModalFooter>
                            </FSForm>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default Register;