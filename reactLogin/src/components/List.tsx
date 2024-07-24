import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_USERS } from '../graphql/queries'

interface User {
    id: string
    name: string
}

const UserList: React.FC = () => {
    const { loading, error, data } = useQuery<{ getAllUsers: User[] }>(
        GET_ALL_USERS
    )

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :+</p>

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {data?.getAllUsers.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default UserList
