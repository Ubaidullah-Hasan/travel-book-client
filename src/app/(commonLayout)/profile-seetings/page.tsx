/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { Button } from '@nextui-org/button';
import React, { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { BiPhone } from 'react-icons/bi';
import { FaRegUser } from 'react-icons/fa';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { MailIcon } from '@/src/assets/icons';
import FSInput from '@/src/components/form/FSInput';
import FSForm from '@/src/components/form/TSForm';
import AnimatedButton from '@/src/components/framerMotion/AnimatedButton';
import FormModal from '@/src/components/modal/FormModal';
import { uploadImages } from '@/src/hooks/post.hook';
import { useUpdateProfile } from '@/src/hooks/user.hook';
import { useUser } from '@/src/context/user.provider';
import Loading from '@/src/components/ui/Loading';
import { logoutUser } from '@/src/services/authService';

const ProfileSeetings = () => {
    const router = useRouter();
    const { user, setIsLoading } = useUser();
    const [profilePhoto, setProfilePhoto] = useState<File[]>([]);
    const { mutate: handleUpdateProfile, isSuccess, isPending } = useUpdateProfile(user?.email as string);

    const handlSubmit: SubmitHandler<FieldValues> = (data) => {
        const filledData = Object.fromEntries(
            Object.entries(data).filter(([key, value]) => value !== '')
        );
        let updateInfo = {
            ...filledData,
        };

        if (profilePhoto.length > 0) {
            // Upload images
            uploadImages(profilePhoto, {
                onSuccess: (uploadedImageUrl: any) => {
                    updateInfo.profilePhoto = uploadedImageUrl[0];
                    handleUpdateProfile(updateInfo);
                },
                onError: () => {
                    toast.error("Something went wrong!");
                }
            });
        }
        else {
            handleUpdateProfile(updateInfo);
        }
    };

    const handleFileUpload = (e: any) => {
        const file = e.target.files?.[0];

        if (file) {
            const profilePhoto = [file];

            setProfilePhoto(profilePhoto);
        }
    }

    // logout after successful update profile
    const handleRedirect = async () => {
        if (!isPending && isSuccess) {
            await logoutUser();
            setIsLoading(true);
            router.push("/login");
        }
    }

    useEffect(() => {
        handleRedirect();
    }, [isPending, isSuccess]);

    return (
        <div>
            {isPending && <Loading />}
            <FormModal size="2xl" title="Profile Information Update!">
                <FSForm onSubmit={handlSubmit}>

                    <div className="space-y-3">
                        <div className='flex gap-3'>
                            <FSInput
                                endContent={
                                    <FaRegUser
                                        className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                                    />
                                }
                                label="Name"
                                name="name"
                                placeholder="Update your name"
                                required={false}
                                type="text"
                                variant="bordered"
                            />
                            <FSInput
                                endContent={
                                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                label="Email"
                                name="email"
                                placeholder="Update your email"
                                required={false}
                                variant="bordered"
                            />
                        </div>
                        <div className='flex gap-3'>
                            <FSInput
                                endContent={
                                    <>
                                        <BiPhone
                                            className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                                            size={20}
                                        />
                                    </>
                                }
                                label="Phone Number"
                                name="mobileNumber"
                                placeholder="Update your phone number"
                                required={false}
                                type="text"
                                variant="bordered"
                            />
                            <div className='w-full'>
                                <label
                                    className="flex items-center w-full border p-4 rounded-xl text-sm cursor-pointer font-semibold text-blue-700 bg-blue-100"
                                    htmlFor="file-upload">
                                    Upload Profile Photo
                                </label>
                                <input
                                    accept="image/*"
                                    className='hidden'
                                    id="file-upload"
                                    type="file"
                                    onChange={handleFileUpload}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-3 space-y-2">

                        <AnimatedButton scaleValue={1.01}>
                            <Button fullWidth color="primary" type="submit">
                                Update Profile
                            </Button>
                        </AnimatedButton>
                    </div>
                </FSForm>
            </FormModal>
        </div>
    );
};

export default ProfileSeetings;