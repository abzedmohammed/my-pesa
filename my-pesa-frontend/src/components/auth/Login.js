import { Link, Navigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useForm } from "react-hook-form";
import { signIn } from "../../features/customer/customerSlice";


export default function Login(){
    const user = useSelector(state => state.customer)
    const dispatch = useDispatch()
    const { register, handleSubmit} = useForm();
    const onSubmit = data => logUserIn(data);

    function logUserIn(data){
        dispatch(signIn(data))
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
                            <h2 className="text-3xl font-bold underline mt-7">Sign In</h2>
                            
                            {
                                user.loginError &&
                                <p className="text-red-500 mt-5">{user.loginError}</p>
                            }

                            <div className="my-8">
                                <input {...register("username")} type="text" placeholder="Enter Username" className="input w-80 border-b-4 border-b-cyan-500 outline-none bg-transparent rounded-none focus:border-cyan-500 focus:ring-transparent" />
                            </div>

                            <div className="my-8">
                                <input {...register("password")} type="password" placeholder="Password" className="input w-80 border-b-4 border-b-cyan-500 outline-none bg-transparent rounded-none focus:border-cyan-500 focus:ring-transparent" />
                            </div>

                            <div className="my-12">
                                <button className="btn bg-cyan-600 w-80" type="submit">Login</button>
                            </div>

                            <div className="my-7">
                                <p className="w-80">
                                    If you don't have an account, you can 
                                    <Link className="border-b-2 border-cyan-300 hover:text-cyan-500" to="/register"> create one here.</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}