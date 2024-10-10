"use client"
import { Button, Link } from "@nextui-org/react";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import FormModal from '@/src/components/modal/FormModal';
import { MailIcon } from "@/src/assets/icons";
import FSInput from "@/src/components/form/FSInput";
import FSForm from "@/src/components/form/TSForm";
import { usePasswordForgot } from "@/src/hooks/auth.hook";
import Loading from "@/src/components/ui/Loading";

const ForgotPassword = () => {
    const { mutate: handleForget, isPending } = usePasswordForgot();

    const handleSubmit: SubmitHandler<FieldValues> = (data) => {
        handleForget(data)
    }

    return (
        <>
            {
                isPending && <Loading />
            }
            <FormModal
                title='Forgot Password'
            >
                <FSForm onSubmit={handleSubmit}>
                    <div className="space-y-3">
                        <FSInput
                            endContent={
                                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                            }
                            label="Email"
                            name="email"
                            placeholder="Enter your email"
                            variant="bordered"
                        />
                    </div>
                    <div className="mt-3 space-y-2">

                        <Button fullWidth color="primary" type="submit">
                            Forget Password
                        </Button>
                        <p className="flex gap-2 justify-start">
                            I Have a Account!
                            <Link href="/login">login</Link>
                        </p>
                    </div>
                </FSForm>

            </FormModal>
        </>
    );
};

export default ForgotPassword;