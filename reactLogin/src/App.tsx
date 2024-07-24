import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import MainPage from './components/MainPage'
import GraphqlPage from './components/GraphqlPage'
import ProtectedRoute from './components/ProtectedRoute'
import UserList from './components/List'

const App: React.FC = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route
                    path="/main"
                    element={<ProtectedRoute element={MainPage} />}
                />
                <Route path="/users" element={<UserList />} />
                <Route
                    path="/graphqlPage"
                    element={<ProtectedRoute element={GraphqlPage} />}
                />
            </Routes>
        </div>
    )
}

export default App
