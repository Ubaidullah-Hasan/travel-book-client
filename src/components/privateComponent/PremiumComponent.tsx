import { useUser } from '@/src/context/user.provider';
import { IChildren } from '@/src/types';
import Link from 'next/link';
import React from 'react';

interface IProps extends IChildren {
    isPremium: boolean;
}

const PremiumComponent = ({ children, isPremium }: IProps) => {
    const { user } = useUser();

    if (!user?.email || user?.isVerified === false && isPremium === true) {
        return (
            <Link href={"/verify-account"}>
                {children}
            </Link>
        );
    }

    return (
        <>
            {children}
        </>
    );
};

export default PremiumComponent;