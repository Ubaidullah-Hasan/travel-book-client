/* eslint-disable @typescript-eslint/no-unused-vars */
import { Textarea } from "@nextui-org/input";
import { useFormContext, useWatch } from "react-hook-form";
import { IInput } from "@/src/types";
import { useEffect, useState } from "react";

interface IProps extends IInput {
    type?: string;
    defaultValue?: string;
}

export default function FSTextarea({
    name,
    label,
    variant = "bordered",
    defaultValue = "",
    required = true,
}: IProps) {
    const {
        register,
        setValue,
        formState: { errors },

    } = useFormContext();

    const [currentValue, setCurrentValue] = useState(defaultValue);

    // Sync useWatch with state to ensure defaultValue is used only initially
    const watchedValue = useWatch({ name });

    useEffect(() => {
        if (watchedValue === undefined) {
            setValue(name, defaultValue);  // Reset to default if undefined
        } else {
            setCurrentValue(watchedValue); // Otherwise, update state with current value
        }
    }, [watchedValue, setValue, name, defaultValue]);

    return (
        <>
            <Textarea
                {...register(name, { required })}
                label={label}
                minRows={6}
                value={currentValue || ""}  // Use state to control value
                onChange={(e) => setCurrentValue(e.target.value)} // Update value on input change
                variant={variant}
            />
        </>
    );
}
