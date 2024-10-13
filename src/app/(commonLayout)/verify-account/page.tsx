"use client"
import { useUser } from '@/src/context/user.provider';
import { useGetSinglUserById, useUserPayment } from '@/src/hooks/user.hook';
import { logoutUser } from '@/src/services/authService';
import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';
import React from 'react';
import { LuBadgeCheck } from 'react-icons/lu';

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
            <p className='mb-2'>To access premium content please needed to virify your account!</p>
            {
                fullUserData?.isVerified ?
                    <Button
                        isLoading={paymentWaiting}
                        onClick={() => handlePayment(100)}
                        color='success'
                        disabled={fullUserData?.isVerified}
                        className='uppercase text-white'
                        startContent={
                            <LuBadgeCheck />
                        }
                    >Verified</Button> :
                    <Button
                        isLoading={paymentWaiting}
                        onClick={() => handlePayment(100)}
                        color='primary'
                    >Payment 100 tk</Button>
            }
        </div>
    );
};

export default VerifyAccount;