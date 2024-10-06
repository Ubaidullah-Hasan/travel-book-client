import CreatePostModal from '../modal/CreatePostModal';
import { IChildren } from '@/src/types';

interface IProps extends IChildren {
    className?: string;
}

const CreatePostModalContainer = ({ children, className }: IProps) => {
    return (
        <CreatePostModal
            buttonCompo={children}
            title='Create Post'
            className={className}
        >
            create post
        </CreatePostModal>
    );
};

export default CreatePostModalContainer;