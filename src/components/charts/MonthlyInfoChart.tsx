import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
    { name: 'January', users: 4000, posts: 2400, payments: 2400 },
    { name: 'February', users: 3000, posts: 1398, payments: 2210 },
    { name: 'March', users: 2000, posts: 9800, payments: 2290 },
];

const MonthlyInfoChart = () => {
    return (
        <LineChart data={data} height={300} width={600}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line dataKey="users" stroke="#8884d8" type="monotone" />
            <Line dataKey="posts" stroke="#82ca9d" type="monotone" />
            <Line dataKey="payments" stroke="#ffc658" type="monotone" />
        </LineChart>
    );
};

export default MonthlyInfoChart;