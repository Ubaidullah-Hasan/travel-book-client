"use client"

import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { LockIcon } from "@/src/assets/icons";
import FSInput from "@/src/components/form/FSInput";
import FSForm from "@/src/components/form/TSForm";
import FormModal from "@/src/components/modal/FormModal";
import AnimatedButton from "@/src/components/framerMotion/AnimatedButton";
import { usePasswordReset } from "@/src/hooks/auth.hook";
import Loading from "@/src/components/ui/Loading";
import { logoutUser } from "@/src/services/authService";
import { useUser } from "@/src/context/user.provider";

interface IParams {
    params: {
        token: string
    }
}

const ResetPage = ({ params }: IParams) => {
    const [isPass, setIsPass] = useState<boolean>(true);
    const { mutate: handleReset, isSuccess, isPending } = usePasswordReset();
    const router = useRouter();
    const { setIsLoading } = useUser();

    const handlSubmit: SubmitHandler<FieldValues> = (data) => {
        const dataInfo = {
            password: data.password,
            token: params.token[0],
        }

        handleReset(dataInfo);
    }

    const handleRedirect = async () => {
        if (isSuccess && !isPending) {
            await logoutUser();
            setIsLoading(true);
            router.push("/login")
        }
    }

    useEffect(() => {
        handleRedirect();
    }, [isSuccess, isPending])


    return (
        <div>
            {isPending && <Loading />}
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
                        name="password"
                        placeholder="Enter your new password"
                        type={isPass ? "password" : "text"}
                        variant="bordered"
                    />

                    <div className="mt-3 space-y-2">

                        <AnimatedButton scaleValue={1.01}>
                            <Button fullWidth color="primary" type="submit">
                                Reset Password
                            </Button>
                        </AnimatedButton>
                    </div>
                </FSForm>
            </FormModal>
        </div>
    );
};

export default ResetPage;
