"use client"
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { Button } from '@nextui-org/button';
import { TCategory } from '@/src/types';
import { useGetAllCategories } from '@/src/hooks/categories.hook';
import { useGetSinglePostsByPostId, useUpdatePost } from '@/src/hooks/post.hook';
import Loading from '@/src/components/ui/Loading';
import ModalContainer from '@/src/components/modal/ModalContainer';
import FSForm from '@/src/components/form/TSForm';
import FSInput from '@/src/components/form/FSInput';
import FSSelect from '@/src/components/form/FSSelect';
import { getFilledFields } from '@/src/utils/findFilledObjectFieldValue';
import FSTextEditor from '@/src/components/form/FSTextEditor';


type TParams = {
    params: {
        postId: string,
    }
}

const SinglePostEdit = ({ params }: TParams) => {
    const { data: catetoriesResponse } = useGetAllCategories();
    const { data: postRes } = useGetSinglePostsByPostId(params.postId);
    const post = postRes?.result;

    const { mutate: updatePost, isPending } = useUpdatePost(params.postId);


    const handleSubmit: SubmitHandler<FieldValues> = (data) => {
        const filledFields = getFilledFields(data);

        const updateData = {
            ...filledFields,
            isPremium: filledFields?.isPremium === "true" ? true : false,
        }

        // @ts-ignore
        updatePost(updateData);

    };


    const categoryOptions = catetoriesResponse?.result?.map((item: TCategory) => ({
        label: item?.name,
        key: item?._id,
    }))
    // const postTypeOptions = [
    //     {
    //         label: "Free",
    //         key: false,
    //     },
    //     {
    //         label: "Premium",
    //         key: true,
    //     }
    // ]

    return (
        <>
            {
                isPending && <Loading />
            }
            {
                post && (
                    <ModalContainer
                        title='Edit Post'
                    >
                        <FSForm
                            defaultValues={{
                                title: post?.title,
                                categoryId: post?.categoryId?._id,
                                isPremium: post?.isPremium,
                            }}
                            onSubmit={handleSubmit}
                        >
                            <div className='space-y-3'>
                                <div className='flex gap-5'>
                                    <FSInput label='Title' name='title' required={false} />
                                    <FSSelect label='Category' name='categoryId' options={categoryOptions} required={false} />
                                </div>

                                <FSTextEditor label='Description' name='description' required={false} value={post?.description} />

                                {/* <div className='flex gap-5'>
                                    <FSSelect label='Post type' name='isPremium' options={postTypeOptions} required={false}  />
                                </div> */}
                                <Button fullWidth color='primary' type='submit'>Update</Button>
                            </div>
                        </FSForm>
                    </ModalContainer>
                )
            }
        </>
    );
};

export default SinglePostEdit;