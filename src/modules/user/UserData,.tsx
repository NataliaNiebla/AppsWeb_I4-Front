import {Input, Table } from 'antd';
import { useState,  } from 'react';

const rawData = {
    


export default function UserData() {
    const {search, setSearch} = useState('');
    const data = rawData.filter((u) => {
        u.name.toLowerCase().includes(search.toLowerCase())
    };

    const columns = [
        {
            title:'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
    ];

    return (
        <div className="p-4">
            <Input.Search
                className='mb-4 w-60'
                placeholder="Buscar por nombre"
                onChange={(e) => setSearch(e.target.value)}
            />
            <Table
                dataSource={data}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 2 }}
                />
        </div>
    );