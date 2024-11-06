"use client"
import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';
import React from 'react';
import { LuBadgeCheck } from 'react-icons/lu';
import { useGetSinglUserById, useUserPayment } from '@/src/hooks/user.hook';
import { useUser } from '@/src/context/user.provider';

const VerifyAccount = () => {
    const { user } = useUser();
    const router = useRouter();
    const { mutate: handlePaymentCall, data: paymentData, isSuccess: paymentReqSuccess, isPending: paymentWaiting } = useUserPayment();
    const { data: userRes } = useGetSinglUserById(user?._id);
    const fullUserData = (userRes?.result);

    

    const handlePayment = (amount: number) => {
        if (user) {
            const info = {
                id: user._id,
                totalPrice: amount
            }

            handlePaymentCall(info);
        }
    }

    if (paymentReqSuccess) {
        router?.push(paymentData?.result);
    }

    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <h1 className='text-lg font-bold mb-3'>Premium Access</h1>
            <p className='mb-2 text-center'>To access premium content please needed to verify your account!</p>
            {
                fullUserData?.isVerified ?
                    <Button
                        className='uppercase text-white'
                        color='success'
                        disabled={fullUserData?.isVerified}
                        isLoading={paymentWaiting}
                        startContent={
                            <LuBadgeCheck />
                        }
                        onClick={() => handlePayment(100)}
                    >Verified</Button> :
                    <Button
                        color='primary'
                        isLoading={paymentWaiting}
                        onClick={() => handlePayment(100)}
                    >Payment 100 tk</Button>
            }
        </div>
    );
};

export default VerifyAccount;