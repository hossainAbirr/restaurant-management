import { useContext } from "react";
import { Link, NavLink, useNavigate, } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { RxAvatar } from 'react-icons/rx';
import Swal from "sweetalert2";
const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    console.log(user);
    const navigate = useNavigate();
    const navLinks = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/foods'>All Food</NavLink></li>
        <li><NavLink to='/blog'>Blog</NavLink></li>
    </>
    const menuNavLinks = <>
        <li><NavLink to='/myfood'>My Food</NavLink></li>
        <li><NavLink to='/addfood'>Add A Food</NavLink></li>
        <li><NavLink to='/myorders'>My Orders</NavLink></li>
    </>

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/signin')
                Swal.fire({
                    title: "Congratulations!",
                    text: "Logged Out successfully!",
                    icon: "success"
                });
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div className="navbar bg-base-100 lg:px-28">
            <div className="navbar-start">

                <div className="flex items-center">
                    <img className="w-24 rounded-xl" src="https://logowik.com/content/uploads/images/restaurant9491.logowik.com.webp" alt="" />
                    <a className="btn btn-ghost normal-case text-xl text-[#c5573e] bg-clip-text bg-gradient-to-r from-[#FF7518] to-[#1E2875] text-transparent">Abir&apos;s Restaurant</a>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <button onClick={handleLogOut} className="hidden lg:btn normal-case lg:text-white lg:bg-orange-600  font-bold hover:bg-clip-text hover:bg-gradient-to-r from-[#FF7518] to-[#1E2875] hover:text-transparent hover:outline mr-3" to='/signin'>Sign Out</button> : <Link className="hidden lg:btn normal-case" to='/signin'>Sign In</Link>
                }

                <div className="dropdown ml-3">
                    <label tabIndex={0} className={`${user?.photoURL ? '' : 'btn hover:btn-warning'}`}>
                        {
                            user ? user?.photoURL ? <div className="relative flex-shrink-0">
                                <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-600 border rounded-full dark:text-gray-100 dark:border-gray-900"></span>
                                <img src={user.photoURL} alt="" className="w-12 h-12 border rounded-full dark:bg-gray-500 dark:border-gray-700" />
                            </div> : <RxAvatar className="text-4xl"></RxAvatar> : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        }
                    </label>
                    <ul tabIndex={0} className=" menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 absolute right-0">
                        <h1 className="font-medium bg-clip-text bg-gradient-to-r from-[#FF7518] to-[#1E2875] text-transparent inline-block text-lg ml-3">{user?.displayName}</h1>
                        <div className="lg:hidden">
                            {navLinks}
                        </div>
                        {menuNavLinks}
                        {
                            user ? <button onClick={handleLogOut} className="lg:hidden btn normal-case text-white bg-[#FF7518]" to='/signin'>Sign Out</button> : <Link className="btn normal-case" to='/signin'>Sign In</Link>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;