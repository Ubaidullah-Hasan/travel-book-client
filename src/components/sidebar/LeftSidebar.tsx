/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client"
import React, { useEffect } from 'react';
import { AiOutlineLogin } from "react-icons/ai";
import Link from 'next/link';
import { RiLogoutCircleLine } from "react-icons/ri";
import SidebarOption from './sidebarOption/SidebarOption';
import { Logo } from '@/src/assets/icons';
import { useUser } from '@/src/context/user.provider';
import { logoutUser } from '@/src/services/authService';
import { LuBadgeAlert, LuBadgeCheck } from "react-icons/lu";
import { useRouter } from 'next/navigation';
import { useGetSinglUserById } from '@/src/hooks/user.hook';



const LeftSidebar = () => {
    const router = useRouter();
    const { user, setIsLoading } = useUser();
    const { data: userRes } = useGetSinglUserById(user?._id);
    const fullUserData = (userRes?.result);

    const handleLogOut = async () => {
        await logoutUser();
        setIsLoading(true);
        router.push("/");
    }

    return (
        <div className='w-[25%] px-3 py-4 fixed top-0 bottom-0 left-0 overflow-y-scroll '>
            <div className='flex gap-1 items-center mt-7'>
                <Logo />
                <p className='font-bold uppercase'>TravelBook</p>
            </div>
            <div className='space-y-2 mt-6'>

                <SidebarOption />
                {
                    fullUserData?.isVerified ? (
                        <div className='cursor-default duration-200 bg-default-100 hover:bg-default-100 py-2 px-4 rounded-lg font-semibold flex items-center gap-2'>
                            <LuBadgeCheck className='text-green-600' />
                            Verified
                        </div>
                    ) : (
                        <div className='cursor-pointer duration-200 bg-default-200 hover:bg-default-100 py-2 px-4 rounded-lg font-semibold flex items-center gap-2' onClick={() => router.push("/verify-account")}>
                            <LuBadgeAlert className='text-warning-600' />
                            Verified Account
                        </div>
                    )
                }

                {
                    !user?.email ? (
                        <div>
                            <Link href='/login'>
                                <div className='duration-200 bg-default-200 hover:bg-default-100 py-2 px-4 rounded-lg font-semibold flex items-center gap-2'>
                                    <AiOutlineLogin />
                                    Login
                                </div>
                            </Link>
                        </div>
                    ) : (
                        <div className='cursor-pointer duration-200 bg-default-200 hover:bg-default-100 py-2 px-4 rounded-lg font-semibold flex items-center gap-2' onClick={handleLogOut}>
                            <RiLogoutCircleLine />
                            Log Out
                        </div>
                    )
                }
            </div>

        </div>
    );
};

export default LeftSidebar;