import React from 'react';
import { ThemeSwitch } from '@/src/components/ui/theme-switch';

const Admin = () => {
    return (
        <div className='bg-default-400 min-h-screen'>
            <ThemeSwitch />
            Admin dashboard
        </div>
    );
};

export default Admin;