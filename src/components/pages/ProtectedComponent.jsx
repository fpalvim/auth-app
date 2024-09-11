import { Navigate, useNavigate } from "react-router-dom";

function ProtectedComponent() {

    const navigate = useNavigate()

    const logout = () => {
        sessionStorage.removeItem("access_token")
        navigate("/")
        alert("You have logged out and will be redirected!")
    }
      

    return ( 
        <>
            <h1>This is a protected component, you may be logged in to access it.</h1>
            <button onClick={logout}>Click to logout</button>
        </>
     );
}

export default ProtectedComponent;