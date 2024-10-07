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
    const { control, formState: { errors } } = useFormContext();

    return (
        <div className={`${errors[name]?.message ? 'border border-default-900' : ''}`}>
            <Controller
                control={control}
                name={name}
                rules={{ required: `${name} is required` }}
                render={({ field }) => (
                    <ReactQuill
                        theme="snow"
                        value={field.value || ""}
                        onChange={field.onChange}
                    />
                )}
            />
        </div>
    );
}
