"use client"
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { Button } from '@nextui-org/button';
import FSInput from '../form/FSInput';
import FSForm from '../form/TSForm';
import CreatePostModal from '../modal/CreatePostModal';
import FSTextEditor from '../form/FSTextEditor';
import ImageUpload from '../form/ImageUpload';
import { IChildren, TCategory } from '@/src/types';
import FSSelect from '../form/FSSelect';
import { useGetAllCategories } from '@/src/hooks/categories.hook';


interface IProps extends IChildren {
    className?: string;
}

const CreatePostModalContainer = ({ children, className }: IProps) => {
    const { data: catetoriesResponse } = useGetAllCategories();


    const categoryOptions = catetoriesResponse?.result?.map((item: TCategory) => ({
        label: item?.name,
        key: item?._id,
    }))
    console.log(categoryOptions);


    const handleSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
    }

    return (
        <CreatePostModal
            buttonCompo={children}
            className={className}
            title='Create Post'
        >
            <FSForm onSubmit={handleSubmit}>
                <div className='space-y-3'>
                    <div className='flex gap-5'>
                        <FSInput label='Title' name='title' />
                        <FSSelect options={categoryOptions} label='Category' name='category' />
                    </div>

                    <FSTextEditor label='Description' name='description' />

                    <div>
                        <ImageUpload name="images" />
                    </div>
                    <Button fullWidth color='primary' type='submit'>Post</Button>
                </div>
            </FSForm>
        </CreatePostModal>
    );
};

export default CreatePostModalContainer;