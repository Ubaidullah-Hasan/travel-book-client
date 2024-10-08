import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { IChildren } from '@/src/types';
import { useUser } from '@/src/context/user.provider';

const PrivateCompo = ({ children }: IChildren) => {
    const router = useRouter();
    const { user, isLoading } = useUser();

    // Handle redirect after user state is fetched
    useEffect(() => {
        if (!isLoading && !user?.email) {
            router.push("/login");
        }
    }, [isLoading, user, router]);


    // If user is logged in, render the protected content
    if (user?.email) {
        return children;
    }

    return null; 
};

export default PrivateCompo;
