import { Avatar } from '@nextui-org/avatar';
import { Image } from '@nextui-org/image';
import { Link } from '@nextui-org/link';
import React, { useEffect, useState } from 'react';
import { LuBadgeCheck } from 'react-icons/lu';
import { useGetSinglePostsByPostId } from '@/src/hooks/post.hook';
import { getSinglePostByPostId } from '@/src/services/post';

type TProps = {
    sharedPostIdForm: string,
}
const SharedPostCard = ({ sharedPostIdForm }: TProps) => {

    const [sharedPost, setPost] = useState<any>(null); 
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPost = async (id: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const postData = await getSinglePostByPostId(id);
            setPost(postData?.result);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (sharedPostIdForm) {
            fetchPost(sharedPostIdForm);
        }
    }, [sharedPostIdForm]);

    function stripHtml(html: any) {
        const spaceAdd = (html?.replace(/<\/[^>]+>/g, '$& '));
        const tempDiv = document.createElement('div');

        tempDiv.innerHTML = spaceAdd;

        return tempDiv.innerText || tempDiv.textContent || '';
    }

    const userId = sharedPost?.userId
    const title = sharedPost?.title;
    const images = sharedPost?.images;
    const categoryId = sharedPost?.categoryId;
    const description = sharedPost?.description;
    const cleanText = stripHtml(description);

    return (
        isLoading ? <div className='border rounded-lg my-2 h-[400px] flex items-center justify-center'>
            Loading...
        </div>
            :
            <Link href={`/${sharedPostIdForm}/comments`}>
                <div className='border rounded-lg my-2 p-4 w-full'>
                    <div className="flex pb-3 border-b gap-5">
                        <Avatar
                            isBordered
                            radius="full"
                            size="md"
                            src={userId?.profilePhoto || "https://nextui.org/avatars/avatar-1.png"}
                        />
                        <div className="flex flex-col gap-1 items-start justify-center">
                            <div>
                                {
                                    <h4 className="text-small font-semibold leading-none text-default-600 flex gap-1 items-center">
                                        {userId?.name || "Unknown"}
                                        {userId?.isVerified && <LuBadgeCheck className="text-green-500" />}
                                    </h4>
                                }
                            </div>
                            <h5 className="text-small tracking-tight text-default-400">{userId?.role}</h5>
                        </div>
                    </div>
                    <div className=" py-1  text-small text-default-400 my-1">
                        <h2 className="text-lg text-default-800 mb-2">{title}</h2>
                        {/* description */}
                        <p className="text-default-900">
                            {cleanText}
                        </p>


                        <div className="space-y-2 my-2">
                            {
                                images?.map((image: string, i: number) => (
                                    <Image
                                        key={i}
                                        alt={`${title}-${i}`}
                                        className="rounded w-full"
                                        src={image}
                                        width={1000}
                                    />
                                ))
                            }
                        </div>
                        {categoryId &&
                            <span className="pt-2 capitalize">
                                #{categoryId?.name}
                            </span>
                        }
                    </div>
                </div>
            </Link>

    );
};

export default SharedPostCard;