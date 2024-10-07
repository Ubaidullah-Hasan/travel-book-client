import { Select, SelectItem } from "@nextui-org/select";
import { useFormContext } from "react-hook-form";

import { IInput } from "@/src/types";

interface IProps extends IInput {
    options: {
        key: string;
        label: string;
    }[];
}

export default function FSSelect({
    options,
    name,
    label,
    variant = "bordered",
    disabled,
}: IProps) {
    const {
        register,
    } = useFormContext();

    return (
        <Select
            {...register(name)}
            className="!capitalize"
            isDisabled={disabled}
            label={label}
            variant={variant}
            required
        >
            {options.map((option) => (
                <SelectItem key={option.key} className="capitalize">{option.label}</SelectItem>
            ))}
        </Select>
    );
}
