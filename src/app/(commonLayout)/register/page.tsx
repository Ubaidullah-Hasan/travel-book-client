"use client"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Link } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { FaRegUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { LockIcon, MailIcon } from "@/src/assets/icons";
import FSInput from "@/src/components/form/FSInput";
import FSForm from "@/src/components/form/TSForm";
import { useUserRegistration } from "@/src/hooks/auth.hook";
import { logoutUser } from "@/src/services/authService";
import { useUser } from "@/src/context/user.provider";


const Register = () => {
    const {setIsLoading} = useUser();
    const router = useRouter();
    const [isPass, setIsPass] = useState<boolean>(true);
    const { mutate: handleRegister, isPending, isSuccess } = useUserRegistration();

    const handleSubmit: SubmitHandler<FieldValues> = (data) => {
        handleRegister(data);
    }

    const handleRedirect = async () => {

        if (isSuccess) {
            await logoutUser();
            setIsLoading(true);
            router.push("/login");
        }
    }

    useEffect(() => {
        handleRedirect();
    }, [isSuccess])

    return (
        <div>
            <Modal
                hideCloseButton
                className="bg-default-100 mx-2"
                isOpen={true}
                placement="center"
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
                                    <Button
                                        fullWidth
                                        color="primary"
                                        isLoading={isPending}
                                        type="submit"
                                    >
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