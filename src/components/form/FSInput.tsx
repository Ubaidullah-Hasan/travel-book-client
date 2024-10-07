"use client";

import { Input } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";
import { ReactNode } from "react";
import { IInput } from "@/src/types";

interface IProps extends IInput {
    endContent?: ReactNode;
    startContent?: ReactNode;
    placeholder?: string;
}

export default function FSInput({
    variant = "bordered",
    size = "md",
    required = true,
    type = "text",
    label,
    name,
    endContent,
    startContent,
    placeholder,
}: IProps) {
    const {
        register,
        formState: { errors },
    } = useFormContext();



    return (
        <Input
            {...register(name)}
            endContent={endContent}
            errorMessage={errors[name] ? (errors[name].message as string) : ""}
            isInvalid={!!errors[name]}
            label={label}
            placeholder={placeholder}
            required={required}
            size={size}
            startContent={startContent}
            type={type}
            variant={variant}
        />
    );
}
