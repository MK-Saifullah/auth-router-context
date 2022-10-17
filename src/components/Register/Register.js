import React, { useContext, useState} from 'react';
import { Form, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';

const Register = () => {
    const {createUser, SignInWithGoogle} = useContext(AuthContext);
    const [loggedInUser, setLoggedInUser] = useState({})
    // console.log('createUser', createUser);
    const [successCreate, setSuccessCreate] = useState(false);
    const [error, setError] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(name, email, password);
        form.reset();
        setSuccessCreate(false);
        setError('');

        createUser(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log(user)
            setSuccessCreate(true);
        })
        .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
            setError(errorCode, errorMessage);
        })
    }

    const handleGoogleSignIn = () => {
        SignInWithGoogle()
        .then(user => {
            setLoggedInUser(user);
            setSuccessCreate(true);
        })
        .catch(error => console.error(error))
    }
    return (
        <div>
            <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                    <h1 className="text-2xl font-bold"> Please Register here!</h1>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <Form onSubmit={handleRegister} className="card-body">
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name" placeholder="name" className="input input-bordered" required/>
                        </div>
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
                            <Link to="/login" className="label-text-alt link link-hover">Already have an account?</Link>
                        </label>
                        </div>

                        {successCreate === true && <small className='text-success'>You have successfully created an account</small>}
                        <small className='text-error'>{error}</small>
                        <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                        </div>
                    </Form>
        {/* Google Login */}
                {/* {
                    loggedInUser?.email ?
                    <button className="btn btn-success">Google Log Out</button>
                    :
                    <button onClick={handleGoogleSignIn} className="btn btn-outline btn-success">Google Log In</button>

                } */}
                 <button onClick={handleGoogleSignIn} className="btn btn-outline btn-success">Google Log In</button>
                    
                    </div>
                </div>
                </div>
        </div>
        </div>
    );
};

export default Register;