import Slider from "react-slick";
import { Link } from "react-router-dom"
import { cleanUp, getAccounts, getBanks } from "../../features/bank/bankSlice";
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"

export default function Dashboard(){

    const bank = useSelector(state => state.bank)
    const user = useSelector(state => state.customer)
    const dispatch = useDispatch()

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    useEffect(() => {
        dispatch(getAccounts())
        dispatch(getBanks())
        dispatch(cleanUp())
    }, [])

    const myAccounts = bank.accounts.filter(account => account.customer === user.user.id)

    return (
        <>
            <div className="container mx-auto mb-16">
                <h2 className="text-3xl font-bold underline mt-7 mb-5">My Accounts</h2>

                <Slider {...settings}>
                        {
                            myAccounts.length > 0 ?
                            myAccounts.map(account => {
                                return (
                                    <div key={account.id} className="card bg-neutral text-neutral-content">
                                        <div className="card-body items-center text-center">
                                            <img className="w-96 h-40" src={account.bank_number.bank.logo.file} alt="bank logo" />
                                            <h1 className="card-title text-4xl font-bold">{account.bank_number.bank.name} Bank</h1>
                                            <h2 className="text-1xl font-semibold">Card Number {account.bank_number.card}</h2>
                                            <h2>Account Balance: <span className="text-2xl font-extrabold underline">KES {account.balance}</span></h2>
                                            <div className="card-actions justify-end">
                                                <Link to={"/withdraw/" + account.id} className="btn btn-outline bg-red-600 text-white btn-sm">Withdraw</Link>
                                                <Link to={"/topup/" + account.id} className="btn btn-outline bg-green-500 text-white btn-sm">Top Up</Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })

                            :
                            <h1 className="text-3xl font-semibold">Y<span className="lowercase">OUR BANK CARDS WILL APPEAR HERE</span> !</h1>
                        }
                </Slider>

                <div className="mt-7">
                <h2 className="text-3xl font-bold underline mt-8 mb-5">Available Banks</h2>
                    <div className="grid grid-cols-3 gap-8">
                        {
                            bank.banks.map(bnk => {
                                return (
                                    <Link key={bnk.id} to={"/banks/" + bnk.id}>
                                        <div className="w-full max-w-sm border border-gray-200 hover:bg-cyan-800">
                                                <img className="pt-8 px-8 rounded-t-lg h-48 w-full" src={bnk.logo.file} alt="banks" />
                                            <div className="py-3">
                                                <h2 className="text-xl font-semibold tracking-tight text-center">{bnk.name} Bank</h2>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>

            </div>
        </>
    )
}