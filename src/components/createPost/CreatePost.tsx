import { Avatar } from '@nextui-org/avatar';
import { Card, CardFooter, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import Image from 'next/image';
import albumIcon from "../../assets/icons/album.png";
import vedioIcon from "../../assets/icons/video-call.png";
import AnimatedButton from '../framerMotion/AnimatedButton';

const CreatePost = () => {
    return (
        <Card className="w-full">
            <CardHeader className="flex gap-3">
                <Avatar className='w-14 h-11 ' src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                <div className='bg-default-100 hover:bg-default-200 text-default-400 py-2 px-4 w-full rounded-full text-sm cursor-pointer'>
                    Share your mind!
                </div>
            </CardHeader>
            <Divider />

            <CardFooter className='flex justify-around'>
                <AnimatedButton>
                    <div className='flex items-center gap-1'>
                        <Image
                            alt='album icon'
                            height={30}
                            src={albumIcon}
                            width={30}
                        />
                        <span>Photo</span>
                    </div>
                </AnimatedButton>
                <div className='w-[1px] h-[25px] bg-default-400'/>
                <AnimatedButton>
                    <div className='flex items-center gap-1'>
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
    );
};

export default CreatePost;