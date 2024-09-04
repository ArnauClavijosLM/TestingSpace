import React, { useState, ChangeEvent } from 'react'
import { useQuery } from '@apollo/client'
import { GET_USER, GET_ALL_USERS } from '../graphql/queries'

interface User {
    username: string
}

const GraphqlPage: React.FC = () => {
    const [keyword, setKeyword] = useState<string>('')

    console.log('mec')

    const { loading, error, data } = useQuery(GET_ALL_USERS)

    console.log(loading, error, data)

    const { data: userData, refetch } = useQuery(GET_USER, {
        variables: { id: '668be74b6a7e3476b8ea70ae' },
        skip: true,
    })

    console.log(userData)

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value)
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        if (keyword) {
            refetch({ id: keyword })
        }
    }

    return (
        <div>
            <form className="search-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={handleInputChange}
                    value={keyword}
                    className="form-field"
                    placeholder="Enter the user ID to search for..."
                    name="keyword"
                />
                <button type="submit" className="submit-button">
                    Search
                </button>
            </form>

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
                ) : userData ? (
                    <div>
                        <p>Username: {userData.getUser.username}</p>
                    </div>
                ) : (
                    <p>No results found.</p>
                )}
            </div>
        </div>
    )
}

export default GraphqlPage
