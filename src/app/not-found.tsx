"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-lg mb-6">
                Sorry, the page you are looking for does not exist.
            </p>
            <Button onPress={() => router.push("/")}>
                Go Back Home
            </Button>
        </div>
    );
}
