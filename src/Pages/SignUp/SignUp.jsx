import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SignUp = () => {
    const { createUser, googleSignIn, user, logOut, profileUpdate } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [regError, setError] = useState();
    const [show, setShow] = useState(false)
    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        if (password.length < 6) {
            return setError("Password should be at least 6 characters (auth/weak-password).")
        }
        if (!/.*[A-Z].*/.test(password)) {
            return setError('Password must contain a capital letter')
        }
        if (!/^(?![\W_]*$)/.test(password)) {
            return setError('Password must contain a special character')
        }
        createUser(email, password)
            .then(result => {
                console.log(result);
                if (result.user) {
                    if (result.user) {
                        navigate(location?.state ? location.state : '/signin')
                        logOut()
                            .then(() => { })
                        Swal.fire({
                            title: "Congratulations!",
                            text: "Signed Up successfully!",
                            icon: "success"
                        });
                    }
                    profileUpdate(name, photo)
                        .then(() => {
                        })
                        .catch(error => {
                            console.log(error);
                        })
                }
            })
            .catch(error => {
                console.log(error);
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
    document.title = "Sign Up || Abir's Restaurant";
    return (
        <div className="bg-current py-20 flex justify-center ">
            <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 bg-gray-900 text-gray-100">
                <h2 className="mb-3 text-3xl font-semibold text-center">New here? Sign Up with your email</h2>
                <p className="text-sm text-center text-gray-400">Dont have account?
                    <Link to='/signin' className="focus:underline hover:underline">Log in here</Link>
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
                <form onSubmit={handleRegister} className="space-y-8">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label type="text" className="block text-sm">Your Name</label>
                            <input type="text" required name="name" placeholder="Your Name" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100 focus:border-violet-400" />
                        </div>
                        <div className="space-y-2">
                            <label type="email" className="block text-sm">Your Photo</label>
                            <input type="url" name="photo" placeholder="Your Photo URL" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100 focus:border-violet-400" />
                        </div>
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
                            <input type={show ? 'text' : 'password'} name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100 focus:border-violet-400" />
                            {regError && <p className="text-red-600">{regError}</p>

                                }
                        </div>
                    </div>
                    <button className="w-full px-8 py-3 font-semibold rounded-md bg-violet-400 text-gray-900">Sign in</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;