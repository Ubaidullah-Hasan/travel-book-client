import { ReactNode } from 'react';
import LeftSidebar from '@/src/components/sidebar/LeftSidebar';
import RightSidebar from '@/src/components/sidebar/RightSidebar';

type TProps = {
    children: ReactNode,
}

const layout = ({ children }: TProps) => {
    return (
        <div className='flex justify-between gap-6'>
            <aside className='w-[25%] relative'>
                <LeftSidebar />
            </aside>

            <main className='relative flex flex-col flex-1 h-screen my-5'>
                {children}
            </main>

            <aside className='w-[25%] '>
                <RightSidebar />
            </aside>
        </div>
    );
};

export default layout;