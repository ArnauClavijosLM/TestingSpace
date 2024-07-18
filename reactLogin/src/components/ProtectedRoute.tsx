import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../services/authorizationService'

interface ProtectedRouteProps {
    element: React.ComponentType
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    element: Component,
}) => {
    const { isAuthorized, isLoading } = useAuth()

    if (isLoading) return <p>loading</p>

    return isAuthorized ? <Component /> : <Navigate to="/login"></Navigate>
}

export default ProtectedRoute
