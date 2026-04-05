
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {assets} from "../assets/assets";
import Input from "../Components/Input";
import { Link } from "react-router-dom";
import { ENDPOINTS } from "../util/apiEndpoint";
import AppContext from "../context/AppContext";
import {AppContextProvider} from "../context/AppContext";
import { validateEmail } from "../util/validation";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";
import axiosConfig from "../util/axiosConfig";
import { useContext } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const {setUser} = useContext(AppContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if(!validateEmail (email)){
                    setError("Please enter a valid email address");
                    setIsLoading(false);
                    return;
        }
        if(!password.trim()){
                    setError("Password is required");
                    setIsLoading(false);
                    return;
        }
        setError(null);
        try{
            const response = await axiosConfig.post(ENDPOINTS.LOGIN, {
                email,
                password
            });
            const { token , user} = response.data;
            if(token){
                localStorage.setItem("token", token);
                setUser(user);
                navigate("/dashboard");
            }

        } catch (err) {
            setError("An error occurred while logging in");
            setError(err.response?.data?.message || "An error occurred while logging in");
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            {/* Background image */}
            <img className="absolute inset-0 w-full h-full bg-cover bg-center" src={assets.login_bg} alt="Background" />

            <div className="relative z-10 w-full max-w-lg px-6">
                <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                    <h3 className="text-2xl font-semibold text-black text-center mb-2">Welcome Back!</h3>
        
                    <p className="text-sm text-slate-700 text-center mb-8">Please Enter your details to Log in</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        
                            
                            <Input 
                                label="Email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder="Enter your email" 
                                type="email" />

                                <Input 
                                label="Password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="Enter your password" 
                                type="password" />
                            
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button disabled={isLoading} className={`btn-primary w-full py-3 text-lg font-medium text-lg font-medium flex items-center justify-center gap-2 %{isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} type="submit">
                            {
                                isLoading ? (
                                    <>
                                        <Loader className="animate-spin w-5 h-5" />
                                        Logging in...
                                    </>
                                ) : (
                                    "Log In"
                                )
                            }
                        </button>
                        <p className="text-sm text-slate-700 text-center mt-4">
                            Don't have an account?
                            <Link to="/signup" className="text-blue-500 hover:underline ml-1">Sign up</Link>
                        </p>
                    </form>
                </div>

            </div>
        </div>
    )
}
export default Login