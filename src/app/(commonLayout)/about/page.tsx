"use client";

import { Card, Spacer } from "@nextui-org/react";
import Image from "next/image";

const teamMembers = [
    { name: "John Doe", role: "Project Manager", avatar: "https://i.ibb.co.com/9hSy5C4/free-images.jpg" },
    { name: "Jane Smith", role: "Lead Developer", avatar: "https://i.ibb.co.com/DpVWwPv/1.png" },
    { name: "Alice Johnson", role: "UI/UX Designer", avatar: "https://i.ibb.co.com/8MCqzR6/3.png" },
];

const AboutPage = () => {
    return (
        <div className="container mx-auto px-4 lg:px-16 py-8">
            {/* Title */}
            <h1 className="text-center text-3xl lg:text-5xl font-bold mb-6">
                About Us
            </h1>
            <Spacer y={1} />

            {/* Mission Section */}
            <Card className="p-6 my-6 bg-gray-100 dark:bg-gray-800 shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="text-base md:text-lg">
                    Our mission is to create a seamless and intuitive platform for users to share their travel experiences,
                    discover new destinations, and connect with a community of explorers worldwide. We believe that travel
                    is more than just visiting places; it’s about creating memories, sharing stories, and building friendships.
                </p>
            </Card>

            {/* Project Information Section */}
            <Card className="p-6 my-6 bg-gray-100 dark:bg-gray-800 shadow-md">
                <h2 className="text-2xl font-semibold mb-4">About the Project</h2>
                <p className="text-base md:text-lg">
                    This project was initiated to provide an open platform where travel enthusiasts can share their journeys
                    and inspire others. Through user-contributed posts, images, and recommendations, we aim to foster a community
                    that celebrates diversity, adventure, and the beauty of our planet.
                </p>
            </Card>

            {/* Team Section */}
            <h2 className="text-center text-3xl lg:text-4xl font-bold mt-8 mb-4">
                Meet Our Team
            </h2>
            <Spacer y={1} />

            {/* Team Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 justify-between gap-1">
                {teamMembers.map((member) => (
                    <div key={member.name} className="p-4 ">
                        <Card isHoverable isPressable className="p-6 bg-white dark:bg-gray-900 shadow-lg">
                            <div className="flex flex-col justify-center items-center text-center">
                                <Image
                                    alt={member.name}
                                    className="rounded-full w-[100px] h-[100px] object-cover"
                                    height={200}
                                    src={member.avatar}
                                    width={200}
                                />
                                <h3 className="text-xl font-semibold mt-3">{member.name}</h3>
                                <p className="text-gray-500 dark:text-gray-400">{member.role}</p>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AboutPage;
