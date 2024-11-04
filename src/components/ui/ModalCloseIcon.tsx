import Link from 'next/link';
import React from 'react';
import { IoMdClose } from 'react-icons/io';

const ModalCloseIcon = () => {
    return (
        <Link className="z-[100] p-2 rounded-full bg-default-200 hover:bg-default-300 duration-500 fixed right-[50%] top-[80px] animate-ping" href={"/"}>
            <IoMdClose size={15} />
        </Link>
    );
};

export default ModalCloseIcon;