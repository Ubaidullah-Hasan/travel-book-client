"use client"

import { LockIcon } from "@/src/assets/icons";
import FSInput from "@/src/components/form/FSInput";
import FSForm from "@/src/components/form/TSForm";
import FormModal from "@/src/components/modal/FormModal";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

interface IParams {
    params: {
        token: string
    }
}

const ResetPage = ({ params }: IParams) => {
    const [isPass, setIsPass] = useState<boolean>(true);
    const handlSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data)

    }

    return (
        <div>
            <FormModal title="Reset Password">
                <FSForm onSubmit={handlSubmit}>
                    <FSInput
                        endContent={
                            <LockIcon
                                className="text-2xl text-default-400 pointer-events-none flex-shrink-0 cursor-pointer"
                                onClick={() => setIsPass(!isPass)}
                            />
                        }
                        label="New Password"
                        name="newPassword"
                        placeholder="Enter your new password"
                        type={isPass ? "password" : "text"}
                        variant="bordered"
                    />

                    <div className="mt-3 space-y-2">

                        <Button fullWidth color="primary" type="submit">
                            Reset Password
                        </Button>
                    </div>
                </FSForm>
            </FormModal>
        </div>
    );
};

export default ResetPage;