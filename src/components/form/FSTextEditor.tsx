/* eslint-disable import/order */
/* eslint-disable react-hooks/rules-of-hooks */
import { Controller, useFormContext } from "react-hook-form";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

import dynamic from "next/dynamic";
import { IInput } from "@/src/types";
import "react-quill/dist/quill.snow.css";
import "./style.css"

interface IProps extends IInput {
    type?: string;
    value?: string;
}


const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, 4, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }], // Add color and background options
        ['clean'] // Remove formatting button
    ],
};


export default function FSTextEditor({
    name,
    value,
    required=true,
}: IProps) {
    const { control, formState: { errors } } = useFormContext();

    if (typeof window === "undefined") return null;

    return (
        <div className={`${errors[name]?.message ? 'border-2 border-red-500 rounded-xl' : ''}`}>
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <ReactQuill
                        modules={modules}
                        theme="snow"
                        value={field.value || value}
                        onChange={field.onChange}
                    />
                )}

                rules={{
                    required: required ? `${name} is required` : false
                }}

            />
        </div>
    );
}
