import Link from 'next/link';
import React from 'react';
import { IoHomeOutline, IoNewspaperOutline } from "react-icons/io5";
import { GrUserSettings } from "react-icons/gr";
import { TbPasswordUser } from "react-icons/tb";
import { RiFunctionAddLine } from "react-icons/ri";
import { USER_ROLE } from '@/src/constant';
import { useUser } from '@/src/context/user.provider';


type TResponsiveProps = {
    setIsOpen?: any,
    isOpen?: boolean,
}


const SidebarOption = ({ setIsOpen, isOpen }: TResponsiveProps) => {
    const { user } = useUser();
    const sidebarLinkAdmin = [
        {
            icon: <IoHomeOutline size={20} />,
            label: "Home",
            path: "/",
        },
        {
            icon: <IoNewspaperOutline size={20} />,
            label: "Profile",
            path: "/my-profile",
        },
        {
            icon: <GrUserSettings />,
            label: "Seeting",
            path: "/profile-seetings",
        },
        {
            icon: <TbPasswordUser />,
            label: "change password",
            path: "/change-password",
        },
        {
            icon: <RiFunctionAddLine />,
            label: "Add Category",
            path: "/add-category",
        },
    ]
    const sidebarLinkUser = [
        {
            icon: <IoHomeOutline size={20} />,
            label: "Home",
            path: "/",
        },
        {
            icon: <IoNewspaperOutline size={20} />,
            label: "Profile",
            path: "/my-profile",
        },
        {
            icon: <GrUserSettings />,
            label: "Seeting",
            path: "/profile-seetings",
        },
        {
            icon: <TbPasswordUser />,
            label: "change password",
            path: "/change-password",
        },
        {
            icon: <RiFunctionAddLine />,
            label: "Add Category",
            path: "/add-category",
        },
    ]

    return (
        <div className='uppercase space-y-2'>
            {user?.role === USER_ROLE.ADMIN ?
                sidebarLinkAdmin?.map((item) => (
                    <div key={item?.path}>
                        <Link
                            className='mt-3'
                            href={item.path} onClick={() => setIsOpen(!isOpen)}>
                            <div className='duration-200 bg-default-200 hover:bg-default-100 py-2 px-4 rounded-lg font-semibold flex items-center gap-2'>
                                {item.icon}
                                {item.label}
                            </div>
                        </Link>
                    </div>
                )) :
                sidebarLinkUser?.map((item) => (
                    <div key={item?.path}>
                        <Link
                            className='mt-3'
                            href={item.path} onClick={() => setIsOpen(!isOpen)}>
                            <div className='duration-200 bg-default-200 hover:bg-default-100 py-2 px-4 rounded-lg font-semibold flex items-center gap-2'>
                                {item.icon}
                                {item.label}
                            </div>
                        </Link>
                    </div>
                ))
            }
        </div>
    );
};

export default SidebarOption;