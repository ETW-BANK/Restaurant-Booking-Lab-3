import React, { useEffect, useState } from 'react'
import { Outlet, Navigate, data } from 'react-router-dom'
const ProtectedRoutes = () => {
    const [isLogged, SetIsLogged] = useState(false)
    const [waiting, SetWaiting] = useState(true)

    useEffect(() => {
        fetch("https://localhost:7090/api/Account/xhtlekd", {
            method: "GET",
            credentials: "include"

        }).then(response => response.json()).then(data => {

            SetIsLogged(true)
            SetWaiting(false)
            localStorage.setItem("user", data.user.email)
            console.log(data.user)
        }).catch(err => {
            console.log("Error Protected routes", err)
            SetWaiting(false)
            localStorage.removeItem("user")
        })
    })

    return waiting ?
        <div className='waiting-page'>
            <div>Waiting.......</div>
        </div> :
        isLogged ? <Outlet /> : <Navigate to="/login" />

}

export default ProtectedRoutes;