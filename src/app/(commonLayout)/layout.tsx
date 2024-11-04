import { ReactNode } from 'react';
import LeftSidebar from '@/src/components/sidebar/LeftSidebar';
import RightSidebar from '@/src/components/sidebar/RightSidebar';
import HeaderForSmallDevice from '@/src/components/responsiveHeader/HeaderForSmallDevice';
import CreatePostCardAndFilter from '@/src/components/responsiveHeader/CreatePostCardAndFilter';


type TProps = {
    children: ReactNode,
}

const layout = ({ children }: TProps) => {
    return (
        <div className='flex justify-between gap-2 lg:gap-3 xl:gap-6 '>
            <aside className='w-[25%] hidden lg:block relative '>
                <LeftSidebar />
            </aside>

            <main className='relative flex flex-col flex-1 min-h-screen lg:my-5 '>
                {/* responsive code */}
                <div className='lg:hidden'>
                    <HeaderForSmallDevice />
                    <CreatePostCardAndFilter />
                </div>

                <div className='mx-3 sm:mx-2 lg:mx-0'>
                    {children}
                </div>
            </main>

            <aside className='hidden sm:block w-[38%] lg:w-[25%] bg-default-50'>
                <RightSidebar />
            </aside>
        </div>
    );
};

export default layout;