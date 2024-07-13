import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, hasPermission, redirectPath = "/error", ...rest }) => {
    return hasPermission ? <Element {...rest} /> : <Navigate to={redirectPath} />;
};

export default ProtectedRoute;
