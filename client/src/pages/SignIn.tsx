import axios from "axios";
import { Cross } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    function signup(){
        navigate("/signup");
    }

    const  handleSignin = async () => {
        try{
            console.log("Signin called with:", username, password);
            const res = await axios.post( "http://localhost:3000/api/v1/user/signin",{
                username: username,
                password: password
            })

            console.log("RES"+  res);
            const token = res.data.token;
            console.log("token: "+ token );
            localStorage.setItem("authorization", token);
            console.log(localStorage.getItem("authorization"));
            setTimeout(() => {
                navigate("/dashboard");
            }, 500);
            setError(null);
        }catch(e){
            console.error(e);
            const message = e?.response?.data?.message || "Something went wrong during signin. retry it";
            setError(message);
        }
    }

    return (
        <div className="flex justify-center items-center z-50 p-4">
            <div className="bg-white p-6 rounded-xl w-full max-w-md relative mx-4"> 
                <button className="absolute top-3 right-3 text-2xl text-gray-600 hover:text-black"> <Cross /> </button>
                <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-black mb-1">Welcome Back</h2>
                    <p className="text-black/70 text-sm">Log in to access your Second Brain.</p>
                </div>
                {error && (
                    <span className="text-red-600 text-sm font-medium mb-4 bg-gray-900 rounded p-1">
                        {error}
                    </span>
                )}
                <form action="submit">
                    <div >
                        <label htmlFor="username">Username</label>
                        <input type="text"
                            placeholder="Username" 
                            id="username"
                            onChange={(e) => setUsername(e.target.value)} 
                            className="flex h-9 w-full rounded-md px-3 py-1 shadow-sm md:text-sm bg-gray-50 mt-1 text-black border border-gray-200"
                        />
                    </div>
                    <div >
                        <label htmlFor="password">Password</label>
                        <input type="text" 
                            placeholder="******" 
                            id="password"
                            onChange={(e) => setPassword(e.target.value)} 
                            className="flex h-9 w-full rounded-md px-3 py-1 shadow-sm md:text-sm bg-gray-50 mt-1 text-black border border-gray-200"
                        />
                    </div>
                    <button className="inline-flex items-center justify-center gap-2 rounded-md text-sm shadow h-9 px-4 w-full bg-black text-white hover:bg-gray-900 w-full bg-black text-white hover:bg-gray-900 mt-2 py-3" 
                        onClick={handleSignin}
                        type="button"
                    >
                        Sign In
                    </button>
                </form>
                <div className="mt-6 text-sm text-center text-black/70">
                    New Here?
                    <button className="text-black hover:text-black/80" onClick={signup}>Create an Account</button>
                </div>
            </div>
        </div>
    )
}

export default SignIn;