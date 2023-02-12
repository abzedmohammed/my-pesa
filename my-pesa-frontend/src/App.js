import Nav from "./components/navigation/Nav";
import { alterState } from "./features/customer/customerSlice";
import Head from "./layout/Layout";
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./components/auth/Login";
import Dashboard from "./components/home/Dashboard";
import Register from "./components/auth/Register";

let title = "Home"

function App() {

  const customer = useSelector(state => state.customer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(alterState())
  }, [])

  let authRoutes = (
    <Routes>
      <Route path='*' element={<Navigate to="/login" />}/>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
    </Routes>
  )

  let routes = (
    <Routes>
      <Route path='*' element={<Navigate to="/dashboard" />}/>
      <Route exact path="/dashboard" element={<Dashboard />} />
    </Routes>
  )

  return (
    <>
      <Head title={title} />
      <Nav />

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
