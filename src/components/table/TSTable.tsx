/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client"
import { Chip, Select, SelectItem, Switch, Tooltip, User } from '@nextui-org/react';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import React, { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { TUser } from '@/src/types';
import { USER_ROLE, USER_STATUS } from '@/src/constant';
import { useDeleteUser, useEditUserRole } from '@/src/hooks/user.hook';

const active = USER_STATUS.ACTIVE;
const blocked = USER_STATUS.BLOCKED;

const statusColorMap: any = {
    [active]: "success",
    [blocked]: "danger",
};

type TProps = {
    columns: any[],
    users: TUser[],
}

export const roleOptions = [
    { key: "admin", label: USER_ROLE.ADMIN },
    { key: "user", label: USER_ROLE.USER },
];

const TSTable = ({ columns, users }: TProps) => {

    const { mutate: deleteUser } = useDeleteUser();
    const { mutate: editUser } = useEditUserRole();

    const handleDelete = (id: string) => {
        deleteUser(id);
    }

    const handleUpdateRole = (id: string) => {
        const payload = {
            userId: id,
            role: USER_ROLE.ADMIN,
        }
        editUser(payload);
    }

    const renderCell = React.useCallback((user: any, columnKey: any) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{ radius: "sm", src: user?.profilePhoto, }}
                        description={user?.email}
                        name={cellValue}
                    >
                        {user?.email}
                    </User>
                );
            case "role":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                        <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
                    </div>
                );
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex justify-center items-center gap-2">
                        <Tooltip onClick={() => handleDelete(user?._id)} color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => handleDelete(user?._id)}>
                                <MdOutlineDeleteOutline />
                            </span>
                        </Tooltip>
                    </div>
                );
            case "changerole":
                return (
                    <div className="relative flex justify-center items-center gap-2">
                        <div className='flex gap-1 items-center'>
                            <span className={`border ${user?.role === USER_ROLE.USER ? "border-green-400 bg-green-100" : "border-default-300 bg-default-200"}  font-bold text-sm w-6 h-6 flex justify-center items-center p-1 bg-default-200 rounded-full`} >U</span>
                            <Switch onClick={() => handleUpdateRole(user?._id)} className='ms-2' isDisabled={user?.role === USER_ROLE.ADMIN || user?.status === USER_STATUS.BLOCKED} defaultSelected={user?.role === USER_ROLE.ADMIN} color="success" />
                            <span className={`border ${user?.role === USER_ROLE.ADMIN ? "border-green-400 bg-green-100" : "border-default-300 bg-default-200"}  font-bold text-sm w-6 h-6 flex justify-center items-center p-1 bg-default-200 rounded-full`} >A</span>
                        </div>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <div>
            <div>
                <Table aria-label="Example table with custom cells">
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={users}>
                        {(item) => (
                            <TableRow key={item?._id}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );

};

export default TSTable;