import { Controller, useFormContext } from "react-hook-form";
import ReactQuill from "react-quill";
import { IInput } from "@/src/types";
import "react-quill/dist/quill.snow.css"; 

interface IProps extends IInput {
    type?: string;
}

export default function FSTextEditor({
    name,
}: IProps) {
    const { control } = useFormContext(); 

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <ReactQuill
                    className=''
                    theme="snow"
                    value={field.value || ""} 
                    onChange={field.onChange}  
                />
            )}
        />
    );
}
