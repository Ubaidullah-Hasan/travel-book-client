// app/500.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

export default function Custom500() {
    const router = useRouter();

    useEffect(() => {
        console.error("An internal server error occurred.");
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
            <h1 className="text-4xl font-bold mb-4">500 - Server Error</h1>
            <p className="text-lg mb-6">
                Oops! Something went wrong on our end. Please try again later.
            </p>
            <Button onPress={() => router.push("/")} >
                Go Back Home
            </Button>
        </div>
    );
}
