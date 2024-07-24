import React, { useState, ChangeEvent, FormEvent } from 'react'
// import { GET_USER, GET_ALL_USERS } from '../graphql/queries'
import axios from 'axios'

interface User {
    username: string
}

const GraphqlPage: React.FC = () => {
    const [keyword, setKeyword] = useState<string>('')
    const [results, setResults] = useState<User[]>([])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value)
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        try {
            const response = await axios.get('/graphql', {
                params: { search: keyword },
            })
            console.log(response)
            // setResults(response.data)
        } catch (error) {
            console.error('There was an error fetching the users!', error)
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
                    placeholder="Enter the word you want to search for..."
                    name="keyword"
                />
                <button type="submit" className="submit-button">
                    Search
                </button>
            </form>

            <div className="results">
                {results && results.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Password</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.username}</td>
                                </tr>
                            ))}
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
