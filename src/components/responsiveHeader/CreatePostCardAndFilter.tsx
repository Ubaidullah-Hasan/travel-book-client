"use client"
import { usePathname } from "next/navigation";
import CreatePostCard from '../createPost/CreatePostCard';
import FilterCategoryField from '../ui/FilterCategoryField';
import SortByUpVoteBtn from '../ui/SortByUpVoteBtn';
import { pageWithOutHeaderCompo } from "@/src/constant";

const CreatePostCardAndFilter = () => {
    const pathName = usePathname();
    const isShow = (pageWithOutHeaderCompo?.some((path) => pathName.match(path)));

    return (
        <div className='mx-3 sm:hidden mb-3'>
            {
                !isShow &&
                <div className={`my-5`}>
                    <CreatePostCard />
                </div>
            }

            {
                !isShow &&
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