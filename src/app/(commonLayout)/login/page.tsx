"use client"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox, Link } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { LockIcon, MailIcon } from "@/src/assets/icons";
import FSInput from "@/src/components/form/FSInput";
import FSForm from "@/src/components/form/TSForm";
import { useUserLogin } from "@/src/hooks/auth.hook";
import { useRouter } from "next/navigation";


const Login = () => {
    const router = useRouter();
    const [isPass, setIsPass] = useState<boolean>(true);
    const { mutate: handleLogin, isSuccess, isPending } = useUserLogin();

    const handleSubmit: SubmitHandler<FieldValues> = (data) => {
        handleLogin(data);
    }

    useEffect(() => {
        if (isSuccess) {
            router.push("/")
        }

    }, [isSuccess])

    return (
        <div>
            <Modal
                hideCloseButton
                className="login-modal"
                isOpen={true}
                placement="top-center"
            >
                <ModalContent>
                    {() => (
                        <>
                            <FSForm onSubmit={handleSubmit}>
                                <ModalHeader className="flex flex-col gap-1 text-center capitalize">Welcome To Login</ModalHeader>
                                <ModalBody>

                                    <div className="space-y-3">
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

                                    <div className="flex py-2 px-1 justify-between">
                                        <Checkbox
                                            classNames={{
                                                label: "text-small",
                                            }}
                                        >
                                            Remember me
                                        </Checkbox>
                                        <Link color="primary" href="#" size="sm">
                                            Forgot password?
                                        </Link>
                                    </div>

                                </ModalBody>
                                <ModalFooter className="flex-col">
                                    <p className="flex gap-2 justify-start">
                                        Have a Account?
                                        <Link href="/register">Register</Link>
                                    </p>
                                    <Button fullWidth color="primary" type="submit" isLoading={isPending}>
                                        Sign in
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

export default Login;