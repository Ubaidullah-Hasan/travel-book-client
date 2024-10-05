import LeftSidebar from '@/src/components/sidebar/LeftSidebar';
import RightSidebar from '@/src/components/sidebar/RightSidebar';
import { ReactNode } from 'react';

type TProps = {
    children: ReactNode,
}

const layout = ({ children }: TProps) => {
    return (
        <div className='flex justify-between gap-6'>
            <aside className='w-[25%] relative bg-red-600'>
                <LeftSidebar />
            </aside>

            <main className='relative flex flex-col flex-1 h-screen'>
                {children}
            </main>

            <aside className='w-[25%]  bg-red-600'>
                <RightSidebar />
            </aside>
        </div>
    );
};

export default layout;