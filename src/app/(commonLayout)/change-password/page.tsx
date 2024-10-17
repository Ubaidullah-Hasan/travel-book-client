"use client"

import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import React, { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { LockIcon } from '@/src/assets/icons';
import FSInput from '@/src/components/form/FSInput';
import FSForm from '@/src/components/form/TSForm';
import { usePasswordChange } from '@/src/hooks/auth.hook';
import Loading from '@/src/components/ui/Loading';
import { useUser } from '@/src/context/user.provider';
import { logoutUser } from '@/src/services/authService';
import ModalCloseIcon from '@/src/components/ui/ModalCloseIcon';

const ChangePassword = () => {
    const router = useRouter();
    const { setIsLoading } = useUser();
    const [isPass, setIsPass] = useState<boolean>(true);
    const { mutate: handleChangePassword, isPending, isSuccess } = usePasswordChange();

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        handleChangePassword(data);
    }

    /* ============= ** ANOTHER WAY TO REDIRECT LOGIN *** ================ */

    const handleRedirectLogin = async () => {
        if (isSuccess && !isPending) {
            await logoutUser();
            setIsLoading(true);
            router.push("/login");
        }
    }

    useEffect(() => {
        handleRedirectLogin();
    }, [isPending, isSuccess])
    /*======================================*/

    return (
        <div>
            {isPending && <Loading />}
            <ModalCloseIcon />
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
                                <ModalHeader className="flex flex-col gap-1 text-center capitalize">Change Your Password</ModalHeader>
                                <ModalBody>

                                    <div className="space-y-3">
                                        <FSInput
                                            endContent={
                                                <LockIcon
                                                    className="text-2xl text-default-400 pointer-events-none flex-shrink-0 cursor-pointer"
                                                    onClick={() => setIsPass(!isPass)}
                                                />
                                            }
                                            label="Old Password"
                                            name="oldPassword"
                                            placeholder="Enter your old password"
                                            type={isPass ? "password" : "text"}
                                            variant="bordered"
                                        />
                                        <FSInput
                                            endContent={
                                                <LockIcon
                                                    className="text-2xl text-default-400 pointer-events-none flex-shrink-0 cursor-pointer"
                                                    onClick={() => setIsPass(!isPass)}
                                                />
                                            }
                                            label="New Password"
                                            name="newPassword"
                                            placeholder="Enter your new password"
                                            type={isPass ? "password" : "text"}
                                            variant="bordered"
                                        />
                                    </div>



                                </ModalBody>
                                <ModalFooter className="flex-col">
                                    <Button fullWidth color="primary" isLoading={isPending} type="submit">
                                        Change Password
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

export default ChangePassword;

