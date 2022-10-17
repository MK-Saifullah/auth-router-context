import React, { useContext, useState } from 'react';
import { Form, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';

const Login = () => {
    const {signInUser, SignInWithGoogle} = useContext(AuthContext);
    console.log('object', signInUser);

    const [loggedInUser, SetLoggedInUser] = useState({})
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        form.reset();
        setError('');
        setSuccess(false);

        signInUser(email, password)
        .then(result => {
            const user = result.user;
            console.log(user);
            SetLoggedInUser(user);
            setSuccess(true)
            navigate('/orders')
        })
        .catch(error => {
            const errorMessage = error.message;
            console.log(errorMessage);
            setError(errorMessage)
        })
    }

    const handleGoogleSignIn = () => {
        SignInWithGoogle()
        .then(result => {
            const user = result.user;
            // console.log(user)
            SetLoggedInUser(user)
            setSuccess(true);
            navigate('/orders')
        })
    }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                    <h1 className="text-2xl font-bold"> Please Login now!</h1>
                    </div>

                    {loggedInUser && <p> {loggedInUser.email}</p>}

                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <Form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="email" className="input input-bordered" required/>
                        </div>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" name="password" placeholder="password" className="input input-bordered" required/>
                        <label className="label">
                            <Link to="/register" className="label-text-alt link link-hover">Forgot password?</Link>
                        </label>
                        </div>

                        <p className='text-error'>{error}</p>
                        {success === true && <small className='text-success'>You are successfully logged in</small>}

                        <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                        </div>
                    </Form>
{/* Google Login */}
                {
                    loggedInUser?.email ?
                    <button className="btn btn-outline btn-success">Google Log Out</button>
                    :
                    <button onClick={handleGoogleSignIn} className="btn btn-outline btn-success">Google Log In</button>
                }
                    
                    </div>
                </div>
                </div>
        </div>
    );
};

export default Login;