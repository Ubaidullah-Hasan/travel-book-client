"use client"
import React, { useEffect, useState } from 'react';
import TSTable from '@/src/components/table/TSTable';
import { getAllUsers } from '@/src/services/userServices';
import MonthlyInfoChart from '@/src/components/charts/MonthlyInfoChart';

const columns = [
    { name: "NAME", uid: "name" },
    { name: "ROLE", uid: "role" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
    { name: "ROLE CHANGE", uid: "changerole" },
];

const DashboardPage = () => {
    const [users, setUsers] = useState<any[]>([]);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { result } = await getAllUsers();

                setUsers(result);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            {users?.length > 0 &&
                <div>
                    <TSTable columns={columns} users={users} />
                </div>
            }

            <div className='my-10'>
                <h1 className='text-center font-semibold mb-3 underline'>Travel Book Summary</h1>
                <MonthlyInfoChart />
            </div>
        </div>
    );
};

export default DashboardPage;