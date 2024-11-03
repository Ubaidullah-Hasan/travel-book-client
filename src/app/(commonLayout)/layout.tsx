import { ReactNode } from 'react';
import LeftSidebar from '@/src/components/sidebar/LeftSidebar';
import RightSidebar from '@/src/components/sidebar/RightSidebar';
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { ThemeSwitch } from '@/src/components/ui/theme-switch';
import { RiMenuUnfold3Fill } from 'react-icons/ri';
import HeaderForSmallDevice from '@/src/components/responsiveHeader/HeaderForSmallDevice';


type TProps = {
    children: ReactNode,
}

const layout = ({ children }: TProps) => {
    return (
        <div className='flex justify-between gap-2 lg:gap-3 xl:gap-6 '>
            <aside className='w-[25%] hidden lg:block relative '>
                <LeftSidebar />
            </aside>

            <main className='relative flex flex-col flex-1 min-h-screen lg:my-5 p-1 lg:p-0'>
                {/* header for 768px */}
                <div className='lg:hidden'>
                    <HeaderForSmallDevice />
                </div>

                {children}
            </main>

            <aside className='w-[38%] lg:w-[25%] bg-default-50'>
                <RightSidebar />
            </aside>
        </div>
    );
};

export default layout;