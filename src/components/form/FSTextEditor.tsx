/* eslint-disable react-hooks/rules-of-hooks */

import { Controller, useFormContext } from "react-hook-form";
// import ReactQuill from "react-quill";
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

import { IInput } from "@/src/types";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

interface IProps extends IInput {
    type?: string;
}

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
                    />
                )}
                rules={{ required: `${name} is required` }}
            />
        </div>
    );
}
