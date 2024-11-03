"use client"
import { usePathname } from "next/navigation";
import CreatePostCard from '../createPost/CreatePostCard';
import FilterCategoryField from '../ui/FilterCategoryField';
import SortByUpVoteBtn from '../ui/SortByUpVoteBtn';

const CreatePostCardAndFilter = () => {
    const pathName = usePathname();

    return (
        <div className='mx-3 sm:hidden mb-3'>
            {
                pathName !== "/my-profile" &&
                <div className={`my-5`}>
                    <CreatePostCard />
                </div>
            }

            {
                pathName !== "/my-profile" &&
                <div className='flex items-center justify-between gap-2'>
                    <div className='flex-1'>
                        <FilterCategoryField />
                    </div>
                    <div className='w-[150px]'>
                        <SortByUpVoteBtn />
                    </div>
                </div>
            }
        </div>
    );
};

export default CreatePostCardAndFilter;