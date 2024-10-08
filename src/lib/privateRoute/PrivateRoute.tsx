// components/PrivateRoute.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/src/context/user.provider';  // Import the context
import { IChildren } from '@/src/types';

const PrivateRoute = ({ children }: IChildren) => {
    const { user, isLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
        }
    }, [user, isLoading, router]);

    // Show loading indicator while user state is being fetched
    if (isLoading && !user) {
        return <div>Loading...</div>;
    }

    // If user is logged in, render the protected content
    if (user) {
        return children;
    }

    return null;
};

export default PrivateRoute;
