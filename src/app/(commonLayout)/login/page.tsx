"use client"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox, Link } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { LockIcon, MailIcon } from "@/src/assets/icons";
import FSInput from "@/src/components/form/FSInput";
import FSForm from "@/src/components/form/TSForm";
import { useUserLogin } from "@/src/hooks/auth.hook";
import Loading from "@/src/components/ui/Loading";
import { useUser } from "@/src/context/user.provider";



const Login = async () => {
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect');
    const router = useRouter();
    const [isPass, setIsPass] = useState<boolean>(true);
    const { mutate: handleLogin, isPending, isSuccess } = useUserLogin();
    const { setIsLoading } = useUser(); 

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        handleLogin(data);
        setIsLoading(true);
    }

    if (isSuccess && !isPending) {
        if (redirect) {
            router.push(redirect);
        } else {
            router.push("/");
        }
    }

    return (
        <div>
            {isPending && <Loading />}
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
                                    <Button fullWidth color="primary" isLoading={isPending} type="submit">
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