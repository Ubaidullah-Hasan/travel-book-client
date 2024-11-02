import { Select, SelectItem } from '@nextui-org/select';
import { useGetAllPostsFromProvider } from '@/src/context/allPostData.provider';
import { useGetAllCategories } from '@/src/hooks/categories.hook';

const FilterCategoryField = () => {

    const { setQueryOptions } = useGetAllPostsFromProvider();


    const { data: categoriesRes } = useGetAllCategories();
    const categories = categoriesRes?.result;

    const handleCategory = (e: any) => {
        const selectValue = e.target.value;

        setQueryOptions((prev) => ({
            ...prev,
            categoryId: selectValue === "all" ? undefined : selectValue,
            page: 1 
        }))
    }


    return (
        <div>
            <Select
                classNames={{
                    mainWrapper:"border rounded-xl"
                }}
                defaultSelectedKeys={["all"]}
                label="Filter By Category"
                radius="lg"
                size='sm'
                onChange={(e) => handleCategory(e)}
            >
                <SelectItem key={"all"} value={undefined}>
                    {"All"}
                </SelectItem>
                {categories?.map((category: any) => (
                    <SelectItem key={category?._id} value={category._id}>
                        {category?.name}
                    </SelectItem>
                ))}
            </Select>
        </div>
    );
};

export default FilterCategoryField;