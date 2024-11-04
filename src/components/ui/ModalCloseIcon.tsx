import Link from 'next/link';
import React from 'react';
import { IoMdClose } from 'react-icons/io';

const ModalCloseIcon = () => {
    return (
        <Link className="z-[100] p-2 rounded-full border-2 border-default-400 bg-default-200 hover:bg-default-300 hover:rotate-180 duration-500 absolute right-4 top-4 " href={"/"}>
            <IoMdClose size={15} />
        </Link>
    );
};

export default ModalCloseIcon;