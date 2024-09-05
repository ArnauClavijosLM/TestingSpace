import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_USER, GET_ALL_USERS } from '../graphql/queries'

interface User {
    username: string
}

const GraphqlPage: React.FC = () => {
    const { loading, error, data } = useQuery(GET_ALL_USERS)

    const { data: userData, loading: loadingUserData } = useQuery(GET_USER, {
        variables: { _id: '668be74b6a7e3476b8ea70ae' },
    })

    return (
        <div>
            <div>
                <p>Username: {!loadingUserData && userData.getUser.username}</p>
            </div>

            <div className="results">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error fetching users: {error.message}</p>
                ) : data ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.getAllUsers.map(
                                (user: User, index: number) => (
                                    <tr key={index}>
                                        <td>{user.username}</td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                ) : (
                    <p>No results found.</p>
                )}
            </div>
        </div>
    )
}

export default GraphqlPage
