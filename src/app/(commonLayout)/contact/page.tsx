"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import { SiNamecheap } from "react-icons/si";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useSendMessage } from "@/src/hooks/user.hook";
import FSForm from "@/src/components/form/TSForm";
import FSInput from "@/src/components/form/FSInput";
import { MailIcon } from "@/src/assets/icons";
import FSTextarea from "@/src/components/form/FSTextArea";


const ContactPage = () => {
    const { mutate: sendMessage, isPending } = useSendMessage();


    const handleSubmit: SubmitHandler<FieldValues> = (data) => {
        sendMessage(data);
    }


    return (
        <div className="container mx-auto p-6">
            <h1 className="text-center text-3xl mb-8">Contact Us</h1>

            <FSForm onSubmit={handleSubmit}>
                <div className="space-y-3">
                    <FSInput
                        endContent={
                            <SiNamecheap className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label="Name"
                        name="name"
                        placeholder="Enter your name"
                        variant="bordered"
                    />
                    <FSInput
                        endContent={
                            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label="Email"
                        name="email"
                        placeholder="Enter your email"
                        variant="bordered"
                    />
                    <FSTextarea label='Message' name='message' />
                </div>
                <div className="mt-3 space-y-2">
                    <Button disabled={isPending} type="submit">
                        {isPending ? "Sending..." : "Send Message"}
                    </Button>
                </div>
            </FSForm>


        </div>
    );
};

export default ContactPage;
