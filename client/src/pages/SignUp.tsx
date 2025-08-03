import axios from "axios";
import { Cross } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string |null > (null);

    const navigate = useNavigate();
    function signin(){
        navigate('/signin');
    }

    const handleSignUp = async() => {
        try{
            console.log("Signup called with:", username, password);
            const res = await axios.post( "http://localhost:3000/api/v1/user/signup", {
                username: username,
                password: password
            })
            console.log(res);
            setError(null);
            signin();
        }catch(e){
            console.error(e);
            const message = e?.response?.data?.message || "Something went wrong during signup.";
            setError(message);
        }
    }

    return (
        <div className="bg-black/50 flex justify-center items-center z-50 p-4">
            <div className="bg-hwite p-6 rounded-xl w-full max-w-md relative mx-4">
                <button className="absolute top-3 right-3 text-2xl text-gray-600 hover:text-black"> <Cross /> </button>
                <div className="mb-6"> 
                    <h2 className="text-2xl md:text-3xl font-bold text-black mb-1"> Join Second Brain</h2>
                    <p className="text-black/70 text-sm">Save tweets, organize links, and declutter your mind.</p>
                </div>

                {error && (
                    <span className="text-red-600 text-sm font-medium mb-4 bg-gray-900 rounded p-1">
                        {error}
                    </span>
                )}

                <form action="submit" className="space-y-4">
                    <div>
                        <label htmlFor="username">UserName</label>
                        <input 
                            type="text" 
                            placeholder="Username" 
                            id="username" 
                            onChange={(e) => setUsername(e.target.value)}
                            className="flex h-9 w-full rounded-md px-3 py-1 shadow-sm md:text-sm bg-gray-50 mt-1 text-black border border-gray-200" 
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            placeholder="*******" 
                            id="password" 
                            onChange={(e) => setPassword(e.target.value)}
                            className="flex h-9 w-full rounded-md px-3 py-1 shadow-sm md:text-sm bg-gray-50 mt-1 text-black border border-gray-200" 
                        />
                        <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
                    </div>
                    <button onClick={handleSignUp} className="inline-flex items-center justify-center gap-2 rounded-md text-sm shadow h-9 px-4 w-full bg-black text-white hover:bg-gray-900 mt-2 py-3" type="button"> Create Account</button>
                </form>
                <div className="mt-6 text-sm text-center text-black/70">
                    Already have an account?
                    <button className="text-black underline hover:text-black/8" onClick={signin}>Sign In</button>
                </div>
            </div>
        </div>
    )
}

export default SignUp;