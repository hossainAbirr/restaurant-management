import { useContext, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Signin = () => {
    const location = useLocation();
    console.log(location);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const { logIn, googleSignIn } = useContext(AuthContext)
    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        logIn(email, password)
            .then(result => {
                console.log(result);
                if (result.user) {
                    navigate(location?.state ? location.state : '/')
                    Swal.fire({
                        title: "Congratulations!",
                        text: "Logged In successfully!",
                        icon: "success"
                    });
                }
            })
            .catch(error => {
                console.log(error);
                if (error) {
                    Swal.fire(
                        'Oops!!',
                        'Your password or email address is incorrect!',
                        'error'
                    )
                }
            })
    }

    const handleGoogle = () => {
        googleSignIn()
            .then(result => {
                console.log(result);
                if (result.user) {
                    navigate(location?.state ? location.state : '/')
                    Swal.fire({
                        title: "Congratulations!",
                        text: "Logged In successfully!",
                        icon: "success"
                    });
                }
            })
            .catch(error => {
                console.error(error);
            })
    }
    document.title = "Sign In || Abir's Restaurant";
    return (
        <div className="bg-current py-20 flex justify-center ">
            <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 bg-gray-900 text-gray-100">
                <h2 className="mb-3 text-3xl font-semibold text-center">Login to your account</h2>
                <p className="text-sm text-center text-gray-400">Dont have account?
                    <Link to='/signup' className="focus:underline hover:underline">Sign up here</Link>
                </p>
                <div className="my-6 space-y-4">
                    <button onClick={handleGoogle} aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ri focus:ri border-gray-400 focus:ri">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                        </svg>
                        <p>Login with Google</p>
                    </button>

                </div>
                <div className="flex items-center w-full my-4">
                    <hr className="w-full text-gray-400" />
                    <p className="px-3 text-gray-400">OR</p>
                    <hr className="w-full text-gray-400" />
                </div>
                <form onSubmit={handleLogin} className="space-y-8">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label type="email" className="block text-sm">Email address</label>
                            <input type="email" required name="email" placeholder="Your Email" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100 focus:border-violet-400" />
                        </div>
                        <div className="space-y-2 relative">
                            <div className="flex justify-between">
                                <label type="password" className="text-sm">Password</label>
                                <a rel="noopener noreferrer" href="#" className="text-xs hover:underline text-gray-400">Forgot password?</a>
                            </div>
                            <button onClick={() => setShow(!show)} className="absolute right-2 top-7 btn btn-primary btn-xs normal-case">{show ? 'Hidden' : "Show"}</button>
                            <input type={show ? 'text' : 'password'} required name='password' className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100 focus:border-violet-400" />
                        </div>
                    </div>
                    <button className="w-full px-8 py-3 font-semibold rounded-md bg-violet-400 text-gray-900">Sign in</button>
                </form>
            </div>
        </div>
    );
};

export default Signin;