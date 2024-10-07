"use client";

import { Input } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";
import { IInput } from "@/src/types";
import { ReactNode } from "react";

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
            errorMessage={errors[name] ? (errors[name].message as string) : ""}
            isInvalid={!!errors[name]}
            label={label}
            required={required}
            size={size}
            type={type}
            variant={variant}
            endContent={endContent}
            startContent={startContent}
            placeholder={placeholder}
        />
    );
}
