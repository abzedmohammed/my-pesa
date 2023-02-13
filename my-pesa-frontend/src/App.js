import Nav from "./components/navigation/Nav";
import { alterState, persistUser } from "./features/customer/customerSlice";
import Head from "./layout/Layout";
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./components/auth/Login";
import Dashboard from "./components/home/Dashboard";
import Register from "./components/auth/Register";
import Banks from "./components/home/Banks";
import Withdraw from "./components/transactions/Withdraw";
import TopUp from "./components/transactions/TopUp";

let title = "Home"

function App() {

  const customer = useSelector(state => state.customer)
  const dispatch = useDispatch()

  useEffect(() => {
    const user_id = sessionStorage.getItem('user_id')
    dispatch(alterState())
    dispatch(persistUser(user_id))
  }, [])

  let authRoutes = (
    <div className="mt-20">
    <Routes>
      <Route path='*' element={<Navigate to="/login" />}/>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
    </Routes>
    </div>
  )

  let routes = (
    <>
      <Nav />
      <Routes>
        <Route path='*' element={<Navigate to="/dashboard" />}/>
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/banks/:id" element={<Banks />} />
        <Route exact path="/withdraw/:id" element={<Withdraw />} />
        <Route exact path="/topup/:id" element={<TopUp />} />
      </Routes>
    </>
    
  )

  return (
    <>
      <Head title={title} />

      {
        customer.stateLoading &&
          <h1>Loading...</h1>
      }

      {
        !customer.stateLoading && customer.isLoggedIn  ?
        routes
        :
        authRoutes
      }

    </>
  );
}

export default App;
