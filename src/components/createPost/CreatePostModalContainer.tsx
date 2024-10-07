"use client"
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { Button } from '@nextui-org/button';
import FSInput from '../form/FSInput';
import FSForm from '../form/TSForm';
import CreatePostModal from '../modal/CreatePostModal';
import FSTextEditor from '../form/FSTextEditor';
import ImageUpload from '../form/ImageUpload';
import { IChildren } from '@/src/types';


interface IProps extends IChildren {
    className?: string;
}

const CreatePostModalContainer = ({ children, className }: IProps) => {
    const [value, setValue] = useState('');

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
                        <FSInput label='Category' name='title' />
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