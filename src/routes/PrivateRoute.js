import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/UserContext';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);

    // if(loading) {
    //     return <div>LOADING...</div>
    // }

    if(user && user.uid) {
        return children;
    }
    return (
        <div>
            <Navigate to='/login'></Navigate>
        </div>
    );
};

export default PrivateRoute;