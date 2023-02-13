import { Link, Navigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react"
import { getSingleAccount, updateSingleAccount } from "../../features/bank/bankSlice";


export default function TopUp(){
    const account = useSelector(state => state.bank.singleAccount)
    const [value, setvalue] = useState(0)
    const [err, seterr] = useState('')
    const success = useSelector(state => state.bank.success)
    const user = useSelector(state => state.customer.user)
    const dispatch = useDispatch()
    const { handleSubmit} = useForm();
    const onSubmit = () => updateAccount();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getSingleAccount(id))
        if (value <= 0) {
            seterr("Enter Amount to continue...")
        }
        else{
            seterr("")
        }
    }, [id, value]) 


    function updateAccount(){
        let current = account.balance
        let newValue = Number(current) + Number(value);
        let data ={
            id: account.id,
            balance: newValue
        }
        dispatch(updateSingleAccount(data))
        alert("Topup Success!")
    }

    if (success) {
        return <Navigate to="/dashboard" />
    }
    
    return (
        <>
            <div className="container mx-auto mt-20">
                {
                    Object.keys(account).length ?
                    <div className="card lg:card-side bg-neutral text-neutral-content shadow-xl">
                    <figure className="p-6"><img className="w-96 h-60" src={account.bank_number.bank.logo.file} alt="bank logo"/></figure>
                    <div className="card-body">
                        <h2 className="card-title">Card Number: {account.bank_number.card}</h2>
                        <h2 className="card-title">Bank: {account.bank_number.bank.name} Bank</h2>
                        <h2 className="card-title">Balance: KES {account.balance}</h2>
                        <p>Choose amount you wish to topup</p>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input min="1" onChange={(e) => setvalue(e.target.value)} value={value} className="input w-80 border-b-4 border-b-cyan-500 outline-none bg-transparent rounded-none focus:border-cyan-500 focus:ring-transparent" type="number" placeholder="Enter Amount" />
                            <div className="my-4">
                            {
                                err ?
                                <p className="text-md text-white w-fit p-2 border-2 border-cyan-600">{err}</p>
                                :
                                <button type="submit" className="btn btn-outline bg-cyan-600 text-white btn-sm mt-3">Submit</button>
                            }
                            </div>
                        </form>
                    </div>
                </div>
                : 
                <h2>Loading...</h2>
                }
            </div>
        </>
    )
}