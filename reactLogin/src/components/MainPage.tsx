import React, { useState, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

interface User {
    username: string
    password: string
}

const MainPage: React.FC = () => {
    const [keyword, setKeyword] = useState<string>('')
    const [results, setResults] = useState<User[]>([])
    const navigate = useNavigate()

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value)
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        try {
            const response = await axios.get('/users', {
                params: { search: keyword },
            })
            setResults(response.data)
        } catch (error) {
            console.error('There was an error fetching the users!', error)
        }
    }

    const handleSnakesButtonClick = async (event: FormEvent) => {
        event.preventDefault()
        try {
            const response = await axios.get('/snakes')
            setResults(response.data)
        } catch (error) {
            console.error('There was an error fetching the snakes data!', error)
        }
    }

    const handleGraphqlButtonClick = async (event: FormEvent) => {
        event.preventDefault()
        try {
            navigate('/graphqlPage')
        } catch (error) {
            console.error(
                'There was an error fetching the graphql route!',
                error
            )
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
                <button
                    type="button"
                    onClick={handleSnakesButtonClick}
                    className="submit-button"
                >
                    Snakes
                </button>

                <button
                    type="button"
                    onClick={handleGraphqlButtonClick}
                    className="submit-button"
                >
                    Graphql
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
                                    <td>{user.password}</td>
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

export default MainPage
