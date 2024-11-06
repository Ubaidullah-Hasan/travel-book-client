import { Button } from '@nextui-org/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { useRouter } from 'next/navigation';
import React from 'react';
import { CiMenuKebab } from 'react-icons/ci';
import { useDeletePostPermanantly } from '@/src/hooks/post.hook';



const DropDownPostEdit = ({postId}:{postId:string}) => {
    const router = useRouter();
    const {mutate: deletePost, isPending} = useDeletePostPermanantly();

    const handleEditPost = (postId:string) => {
        router.push(`/edit-post/${postId}`);
    };

    const handleDeletePost = (postId:string) => {
        deletePost(postId); 
    };

    const items = [
        {
            key: "edit",
            label: "Edit Post",
            onClick: () => handleEditPost(postId),
        },
        {
            key: "delete",
            label: "Delete Post",
            onClick: () => handleDeletePost(postId),
        }
    ];

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button className='p-0 rounded-full '>
                    <CiMenuKebab className="hover:text-default-500" size={20} />
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Dynamic Actions" items={items}>
                {(item) => (
                    <DropdownItem
                        key={item.key}
                        className={item.key === "delete" ? "text-danger" : ""}
                        color={item.key === "delete" ? "danger" : "default"}
                        onClick={item.onClick} 
                    >
                        {item.label}{isPending && item.key === "delete" && "..."}
                    </DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown>
    );
};

export default DropDownPostEdit;