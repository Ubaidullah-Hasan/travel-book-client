"use client"
import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { MdOutlineCategory } from "react-icons/md";
import FSInput from '@/src/components/form/FSInput';
import FSForm from '@/src/components/form/TSForm';
import Loading from '@/src/components/ui/Loading';
import ModalCloseIcon from '@/src/components/ui/ModalCloseIcon';
import { useCreateCategory } from '@/src/hooks/categories.hook';


const AddCategory = () => {
    const { mutate: createCategory, isPending } = useCreateCategory();

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        const upperCaseCategory = { name: data.name.toUpperCase() }

        createCategory(upperCaseCategory);
    }

    return (
        <div>
            {isPending && <Loading />}
            <Modal
                hideCloseButton
                className="mx-2 bg-default-100"
                isOpen={true}
                placement="center"
            >
                <ModalContent className='relative'>
                    {() => (
                        <>
                            <ModalCloseIcon />
                            <FSForm onSubmit={handleSubmit}>
                                <ModalHeader className="flex flex-col gap-1 text-center capitalize">Create Post Category</ModalHeader>
                                <ModalBody>

                                    <div className="space-y-3">
                                        <FSInput
                                            endContent={
                                                <MdOutlineCategory
                                                    className="text-2xl text-default-400 pointer-events-none flex-shrink-0 cursor-pointer"
                                                />
                                            }
                                            label="Category Name"
                                            name="name"
                                            placeholder="Enter a new category name"
                                            type={"text"}
                                            variant="bordered"
                                        />

                                    </div>
                                </ModalBody>
                                <ModalFooter className="flex-col">
                                    <Button fullWidth color="primary" isLoading={isPending} type="submit">
                                        Create
                                    </Button>
                                </ModalFooter>
                            </FSForm>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default AddCategory;