import Link from 'next/link';
import React from 'react';
import { ReactNode } from 'react';
import { useUser } from '@/src/context/user.provider';

interface IChildren {
    children: ReactNode;
}

const PrivateComponent = ({ children }: IChildren): React.ReactElement | null => {
    const { user } = useUser();

    if (user?.email) {
        return <>
            {children}
        </>;
    }

    return (
        <Link href={"/login"} >
            {children}
        </Link>
    );
};

export default PrivateComponent;