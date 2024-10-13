import { FieldValues, SubmitHandler } from 'react-hook-form';
import { Button } from '@nextui-org/button';
import { ReactNode } from 'react';
import { toast } from 'sonner';
import FSInput from '../form/FSInput';
import FSForm from '../form/TSForm';
import FSTextEditor from '../form/FSTextEditor';
import ImageUpload from '../form/ImageUpload';
import FSSelect from '../form/FSSelect';
import Loading from '../ui/Loading';
import ModalContainer from '../modal/ModalContainer';
import { TCategory } from '@/src/types';
import { useGetAllCategories } from '@/src/hooks/categories.hook';
import { useUser } from '@/src/context/user.provider';
import { uploadImages, useCreatePosts } from '@/src/hooks/post.hook';


interface IProps {
    className?: string;
    children?: ReactNode;
}


const CreatePostModal = ({ className }: IProps) => {
    const { data: catetoriesResponse } = useGetAllCategories();
    const { user } = useUser();
    const { mutate: createPost, isPending } = useCreatePosts();

    const handleSubmit: SubmitHandler<FieldValues> = (data) => {

        const imagesToUpload = data.images;

        const postData = {
            ...data,
            images: [],
            userId: user?._id,
            isPremium: data?.isPremium === "false" ? false : true,
        };

        console.log(postData);

        if (imagesToUpload && imagesToUpload.length > 0) {

            // Upload images
            uploadImages(imagesToUpload, {
                onSuccess: (uploadedImageUrls: any) => {
                    postData.images = uploadedImageUrls;

                    // Now create the post with the image URLs
                    // @ts-ignore
                    createPost(postData);
                },
                onError: () => {
                    toast.error("Something went wrong!");
                }
            });
        } else {
            // If no images, create the post directly
            // @ts-ignore
            createPost(postData);
        }
    };


    const categoryOptions = catetoriesResponse?.result?.map((item: TCategory) => ({
        label: item?.name,
        key: item?._id,
    }))
    const postTypeOptions = [
        {
            label: "Free",
            key: false,
        },
        {
            label: "Premium",
            key: true,
        }
    ]


    return (
        <>
            {
                isPending && <Loading />
            }
            <ModalContainer
                className={className}
                title='Create Post'
            >
                <FSForm onSubmit={handleSubmit}>
                    <div className='space-y-3'>
                        <div className='flex gap-5'>
                            <FSInput label='Title' name='title' />
                            <FSSelect label='Category' name='categoryId' options={categoryOptions} />
                        </div>

                        <FSTextEditor label='Description' name='description' />

                        <div className='flex gap-5'>
                            <div className='w-[100%]'>
                                <ImageUpload name="images" />
                            </div>
                            <FSSelect label='Post type' name='isPremium' options={postTypeOptions} />
                        </div>
                        <Button fullWidth color='primary' type='submit'>Post</Button>
                    </div>
                </FSForm>
            </ModalContainer>
        </>

    );
};

export default CreatePostModal;