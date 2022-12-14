import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify'

const AllUsers = () => {

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch(`https://assignment-twelve-server-nine.vercel.app/users`)
            const data = await res.json()
            return data;
        }
    })

    const handleMakeAdmin = id => {
        fetch(`https://assignment-twelve-server-nine.vercel.app/users/admin/${id}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success("made admin successfullly")
                    refetch()
                }
                console.log(data);
            })
    }

    return (
        <div>
            <h2 className="text-3xl">All Users</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, i) => <tr key={user._id}>
                                <th>{i + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user?.role !== 'admin' && <button className='btn btn-xs btn-primary' onClick={() => handleMakeAdmin(user._id)}>Make admin</button>}</td>
                                <td>{user?.role !== 'admin' && <button className='btn btn-xs btn-error'>{user.type}</button>}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;