/* eslint-disable react-hooks/rules-of-hooks */

import { Controller, useFormContext } from "react-hook-form";
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

import dynamic from "next/dynamic";
import { IInput } from "@/src/types";
import "react-quill/dist/quill.snow.css";

interface IProps extends IInput {
    type?: string;
}


const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }], // Add color and background options
        ['clean'] // Remove formatting button
    ],
};


export default function FSTextEditor({
    name,
}: IProps) {
    const { control, formState: { errors } } = useFormContext();

    if (typeof window === "undefined") return;

    return (
        <div className={`${errors[name]?.message ? 'border border-default-900' : ''}`}>
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <ReactQuill
                        theme="snow"
                        value={field.value || ""}
                        onChange={field.onChange}
                        modules={modules}
                    />
                )}
                rules={{ required: `${name} is required` }}
            />
        </div>
    );
}
