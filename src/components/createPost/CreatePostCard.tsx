/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client"

import { Avatar } from '@nextui-org/avatar';
import { Card, CardFooter, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import albumIcon from "../../assets/icons/album.png";
import vedioIcon from "../../assets/icons/video-call.png";
import AnimatedButton from '../framerMotion/AnimatedButton';
import { useUser } from '@/src/context/user.provider';

const CreatePostCard = () => {
    const { user } = useUser();
    const router = useRouter()
    const handleCreatPostBtn = () => {
        router.push("/create-post");
    }

    return (
        <div className='pt-10 space-y-4'>
            <h1 className='font-semibold text-lg'>Create A New Post!</h1>
            <Card className="w-full">
                <CardHeader className="flex gap-3">
                    <Avatar isBordered
                        className='w-11 h-11'
                        color={user?.email ? 'success' : "default"}
                        src={user?.profilePhoto || 'https://i.ibb.co.com/nb7ZFPP/user.png'}
                    />
                    <div className='flex-1'>
                        <div className='bg-default-100 hover:bg-default-200 text-default-400 py-2 px-4 w-full text-start rounded-full text-sm cursor-pointer' onClick={handleCreatPostBtn}>
                            Share your mind!
                        </div>
                    </div>

                </CardHeader>
                <Divider className='' />

                <CardFooter className='flex justify-around'>
                    <AnimatedButton>
                        <div className='flex items-center gap-1' onClick={handleCreatPostBtn}>
                            <Image
                                alt='album icon'
                                height={30}
                                src={albumIcon}
                                width={30}
                            />
                            <span>Photo</span>
                        </div>
                    </AnimatedButton>
                    <div className='w-[1px] h-[25px] bg-default-400' />
                    <AnimatedButton>
                        <div className='flex items-center gap-1' onClick={handleCreatPostBtn}>
                            <Image
                                alt='Vedio icon'
                                height={30}
                                src={vedioIcon}
                                width={30}
                            />
                            <span>Vedio</span>
                        </div>
                    </AnimatedButton>
                </CardFooter>
            </Card>
        </div>
    );
};

export default CreatePostCard;