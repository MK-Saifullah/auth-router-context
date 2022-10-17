import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';

const Header = () => {
    const {user, logOut} = useContext(AuthContext);
    console.log('context API',user)

    const handleSignOut = () => {
        logOut()
        .then(() => {
            console.log('Successfully logged out')
        })
        .catch(error => console.error(error))
    }
    return (
       <div>
            <div className="navbar bg-primary text-primary-content">
                 <Link className="btn btn-ghost normal-case text-xl" to='/'>Authentication</Link>
                 <Link className="btn btn-ghost normal-case text-l" to='/'>Home</Link>
                 <Link className="btn btn-ghost normal-case text-l" to='/orders'>Orders</Link>
                 <Link className="btn btn-ghost normal-case text-l" to='/login'>Login</Link>
                 <Link className="btn btn-ghost normal-case text-l" to='/register'>Register</Link>
                {user?.email && <small> Welcome, you are logged in:  {user.email}</small>}
                {
                    user?.email ? 
                    <button onClick={handleSignOut} className="btn btn-sm">Log out</button>
                    :
                    <Link to='/login'><button className="btn btn-sm">Log in</button></Link>
                }
            </div>
       </div>
    );
};

export default Header;