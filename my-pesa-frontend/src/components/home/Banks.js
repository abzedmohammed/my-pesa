import { Link, Navigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useForm } from "react-hook-form";
import { useEffect } from "react"
import { createAccount, createCard, getSingleBank } from "../../features/bank/bankSlice";

export default function Banks(){
    const bank = useSelector(state => state.bank.singleBank)
    const success = useSelector(state => state.bank.success)
    const user = useSelector(state => state.customer.user)
    const dispatch = useDispatch()
    const { handleSubmit} = useForm();
    const onSubmit = () => customerNewAccount();
    const { id } = useParams();

    async function customerNewAccount(){
        const res = await dispatch(createCard({
            bank_id: bank.id
        }))

        console.log("response", res);

        let accountObj = {
            customer: user.id,
            bank_number_id: res.payload.id
        }
        
        dispatch(createAccount(accountObj))
        alert("Created Account Successfully!")
    }

    useEffect(() => {
        dispatch(getSingleBank(id))
    }, [id]) 

    if (success) {
        return <Navigate to="/dashboard" />
    }
    

    return (
        <>
            <div className="container mx-auto">
                {
                    bank.logo ? 
                    <div className="mt-20">
                    <div className="card bg-neutral text-neutral-content w-full">
                        <div className="card-body items-center text-center">
                            <img className="w-96 h-40" src={bank.logo.file ? bank.logo.file : "https://i.pinimg.com/originals/bd/44/89/bd448993ba3e187ae1e93869753223a9.png"} alt="bank logo" />
                            <h1 className="card-title text-4xl font-bold">{bank.name} Bank</h1>
                            <div className="card-actions justify-end">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <button type="submit" className="btn btn-outline bg-cyan-600 text-white btn-sm mt-3">Request an account</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <h2>Loading...</h2>
                }
            </div>
        </>
    )
}