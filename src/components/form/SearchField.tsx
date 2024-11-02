"use client"
import { Input } from '@nextui-org/input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import useDebounce from '@/src/hooks/debounce.hook';
import { SearchIcon } from '@/src/assets/icons';
import { useGetAllPostsFromProvider } from '@/src/context/allPostData.provider';


const SearchField = () => {
    const { register, handleSubmit, watch } = useForm();
    const { setQueryOptions } = useGetAllPostsFromProvider();

    const searchValue = watch("search");
    const searchTerm = useDebounce(searchValue?.trim());


    useEffect(() => {
        if (searchTerm) {
            setQueryOptions((pre) => ({ ...pre, searchTerm: searchTerm, page: 1 }));

            return;
        }
        setQueryOptions((pre) => ({ ...pre, searchTerm: searchTerm, page: 1 }));

    }, [searchTerm])


    const onSubmit: SubmitHandler<FieldValues> = (data) => {

        if (!data.search) {
            setQueryOptions((pre) => ({ ...pre, searchTerm: "" }));

            return;
        }
        setQueryOptions((pre) => ({ ...pre, searchTerm: data.search }));
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <motion.div
                animate={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.01 }}
            >
                <Input
                    {...register('search')}
                    aria-label="Search"
                    classNames={{
                        inputWrapper: "shadow border",
                        input: "text-sm ",
                    }}
                    placeholder="Search Moment"
                    size='lg'
                    startContent={
                        <SearchIcon className="pointer-events-none flex-shrink-0 text-base text-default-600" />
                    }
                    type="text"
                />
            </motion.div>
        </form>
    );
};

export default SearchField;