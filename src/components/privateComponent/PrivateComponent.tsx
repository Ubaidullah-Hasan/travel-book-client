import Link from 'next/link';
import React from 'react';
import { useUser } from '@/src/context/user.provider';
import { IChildren } from '@/src/types';

const PrivateComponent = ({ children }: IChildren) => {
    const { user } = useUser();

    if (user?.email) {
        return children;
    }

    

    return (
        <Link href={"/login"} >
            {children}
        </Link>
    );
};

export default PrivateComponent;