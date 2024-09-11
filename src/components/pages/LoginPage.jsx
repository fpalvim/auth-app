import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"

function LoginPage() {

    const [user, setUser] = useState()
    const [password, setPassword] = useState()
    const [signupUser, setSignupUser] = useState()
    const [signupPassword, setSignupPassword] = useState()
    const navigate = useNavigate()

    const signup = () => {

        const data = {
            user: signupUser,
            password: signupPassword
        }

        fetch('https://nfz1b0p6-8787.euw.devtunnels.ms/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log("server answer:", data);
        })
        .catch((error) => {
            console.error("Error during signup", error);
        })
    }

    const login = () => {
        
        const data = {
            user: user,
            password: password
        }

        fetch('https://nfz1b0p6-8787.euw.devtunnels.ms/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log("server answer:", data);
            sessionStorage.setItem('access_token', data.access_token)
            navigate("/protected")
        })
        .catch((error) => {
            console.error("Error during login", error);
        })
    }

    return ( 
        <div>
            <h1>Sign Up</h1>
            <form id="signup-form">
                <label htmlFor="user-input">User:</label>
                <input type="text" value={signupUser} onChange={(e)=>setSignupUser(e.target.value)} name="user" id="user-input" />
                <label htmlFor="password-input">Password:</label>
                <input type="password" name="password" value={signupPassword} onChange={(e)=>setSignupPassword(e.target.value)} id="password-input"/>
                <button type="button" onClick={signup}>Create account</button>
            </form>

            <hr />
            <h1>Login</h1>
            <form action="login-form">
                <label htmlFor="user-login">User:</label>
                <input type="text" name="user" value={user} onChange={(e)=>setUser(e.target.value)} id="user-login"/>
                <label htmlFor="password-login">Password:</label>
                <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} id="password-login" />
                <button type="button" onClick={login}>Login</button>
            </form>
        </div>
     );
}

export default LoginPage;