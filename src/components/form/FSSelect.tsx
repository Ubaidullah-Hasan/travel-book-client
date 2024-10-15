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
}: IProps) {
    const {
        control,
        formState: { errors }
    } = useFormContext();

    return (
        <div className="w-full">
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <Select
                        {...field}
                        required
                        className="!capitalize"
                        isDisabled={disabled}
                        label={label}
                        variant={variant}
                    >
                        {options?.map((option) => (
                            <SelectItem key={option.key as string} className="capitalize">
                                {option.label}
                            </SelectItem>
                        ))}
                    </Select>
                )}
                rules={{ required: `${label} is required` }}
            />
            {errors[name] && (
                <p className="text-red-500 text-sm">
                    {errors[name]?.message as string}
                </p>
            )}
        </div>
    );
}
