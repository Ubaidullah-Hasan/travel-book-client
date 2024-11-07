import React from 'react';
import TSTable from '@/src/components/table/TSTable';
import { getAllUsers } from '@/src/services/userServices';

const columns = [
    { name: "NAME", uid: "name" },
    { name: "ROLE", uid: "role" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
    { name: "ROLE CHANGE", uid: "changerole" },
];

const DashboardPage = async () => {
    const { result: users } = await getAllUsers();

    return (
        <div>
            <TSTable columns={columns} users={users} />
        </div>
    );
};

export default DashboardPage;