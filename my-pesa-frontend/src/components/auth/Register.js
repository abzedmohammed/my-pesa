import { Link, Navigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useForm } from "react-hook-form";
import { signUp } from "../../features/customer/customerSlice";

export default function Register(){
    const user = useSelector(state => state.customer)
    const dispatch = useDispatch()
    const { register, handleSubmit} = useForm();
    const onSubmit = data => logUserIn(data);

    function logUserIn(data){
        dispatch(signUp(data))
    }

    return (
        <>
            <div className="container border-2 border-grey-100 mx-auto rounded-2xl mt-10 login-container">
                <div className="grid grid-cols-2">
                        <div className="card w-full bg-base-100 shadow-xl image-full">
                            <figure><img src="https://images.unsplash.com/photo-1623743558917-37d9ab9e3b34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80" alt="Shoes" /></figure>
                            <div className="card-body">
                                <div className="mx-auto my-auto">
                                    <h1 className="card-title text-8xl text-white font-extrabold italic"><span className="text-cyan-500">MY</span>-PESA</h1>
                                    <p className="text-lg">Your most efficient and trusted bank management system</p>
                                </div>
                            </div>
                        </div>

                    <div className="flex flex-col justify-center items-center p-6 my-auto">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h2 className="text-3xl font-bold underline mt-3">Sign Up</h2>

                            {
                                user.registerError &&
                                <p className="text-red-500 mt-5">{user.registerError}</p>
                            }

                            <div className="my-5">
                                <input required {...register("username")} type="text" placeholder="username" className="input w-80 border-b-4 border-b-cyan-500 outline-none bg-transparent rounded-none focus:border-cyan-500 focus:ring-transparent" />
                            </div>

                            <div className="my-5">
                                <input {...register("first_name")} type="text" placeholder="First Name" className="input w-80 border-b-4 border-b-cyan-500 outline-none bg-transparent rounded-none focus:border-cyan-500 focus:ring-transparent" />
                            </div>

                            <div className="my-5">
                                <input {...register("last_name")} type="text" placeholder="Last Name" className="input w-80 border-b-4 border-b-cyan-500 outline-none bg-transparent rounded-none focus:border-cyan-500 focus:ring-transparent" />
                            </div>

                            <div className="my-5">
                                <input required {...register("email")} type="email" placeholder="Email" className="input w-80 border-b-4 border-b-cyan-500 outline-none bg-transparent rounded-none focus:border-cyan-500 focus:ring-transparent" />
                            </div>

                            <div className="my-5">
                                <input required {...register("password")} type="password" placeholder="Password" className="input w-80 border-b-4 border-b-cyan-500 outline-none bg-transparent rounded-none focus:border-cyan-500 focus:ring-transparent" />
                            </div>

                            <div className="my-5">
                                <button className="btn bg-cyan-600 w-80"type="submit">Create Account</button>
                            </div>

                            <div className="my-5">
                                <p className="w-80">
                                    Already a member?  
                                    <Link className="border-b-2 border-cyan-300 hover:text-cyan-500" to="/login"> Login to your account.</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}