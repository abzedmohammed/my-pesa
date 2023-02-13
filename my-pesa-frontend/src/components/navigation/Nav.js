import { logout } from "../../features/customer/customerSlice"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"

export default function Nav(){
    const user = useSelector(state => state.customer.user)
    const dispatch = useDispatch()

    // function logUserOut(){
    //     dispatch(() => logout)
    // }

    return (
        <>
            <div className="navbar bg-grey-50">
                <div className="navbar-start">
                    <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact text-black font-extrabold dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><button type="button" onClick={() => dispatch(logout())}>Logout</button></li>
                    </ul>
                    </div>
                </div>
                <div className="navbar-center">
                    <Link to="/dashboard" className="btn font-extrabold btn-ghost normal-case text-2xl">My-PESA</Link>
                </div>
                <div className="navbar-end">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                            <img src="https://res.cloudinary.com/abzedmohammed/image/upload/v1670316789/defaults/default_black_mv0upm.png" alt="avatar" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact text-black font-extrabold dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li>{user.first_name} {user.last_name}</li>
                            <li>{user.email}</li>
                            <li>@{user.username}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}