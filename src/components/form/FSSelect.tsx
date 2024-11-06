import { Select, SelectItem } from "@nextui-org/select";
import { Controller, useFormContext } from "react-hook-form";
import { IInput } from "@/src/types";

interface IProps extends IInput {
    options: {
        key: string|boolean;
        label: string;
    }[];
}

export default function FSSelect({
    options,
    name,
    label,
    variant = "bordered",
    disabled,
    required = true,
    defaultValue,
}: IProps) {
    const {
        control,
        formState: { errors }
    } = useFormContext();

    return (
        <div className="w-full">
            <Controller
                control={control}
                defaultValue={defaultValue}
                name={name}
                render={({ field }) => (
                    <Select
                        {...field}
                        className="!capitalize"
                        isDisabled={disabled}
                        label={label}
                        required={required}
                        variant={variant}
                    >
                        {options?.map((option) => (
                            <SelectItem key={option.key as string} className="capitalize">
                                {option.label}
                            </SelectItem>
                        ))}
                    </Select>
                )}
                rules={{
                    required: required ? `${label} is required` : false
                }}
            />
            {errors[name] && (
                <p className="text-red-500 text-sm">
                    {errors[name]?.message as string}
                </p>
            )}
        </div>
    );
}
