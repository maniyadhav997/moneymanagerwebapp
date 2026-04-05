import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {assets} from "../assets/assets";
import Input from "../Components/Input";
import { Link } from "react-router-dom";
import { validateEmail } from "../util/validation";
import axiosConfig from "../util/axiosConfig";
import { LoaderCircle } from "lucide-react";
import { toast } from "react-toastify";
import { ENDPOINTS } from "../util/apiEndpoint";
import ProfilePhotoSelector from "../Components/ProfilePhotoSelector";
import uploadProfileImage from "../util/uploadProfileImage";

const Signup = () => { 
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const [isLoading, setIsLoading] = useState(false);  

    const [profilePhoto, setProfilePhoto] = useState(null);
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let profileImageUrl = "";
        setIsLoading(true);
        if (!fullname.trim()){
            setError("Full name is required");
            setIsLoading(false);
            return;
        }
        
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
            //upload image if selected
            if (profilePhoto) {
                // Implementation for uploading profile photo

                const imgUrl = await uploadProfileImage(profilePhoto);
                profileImageUrl = imgUrl || ""; // Fallback to empty string if upload fails

            }

            console.log("Making signup request to:", ENDPOINTS.REGISTER);
            console.log("Payload:", { fullname, email, password });

            const response = await axiosConfig.post(ENDPOINTS.REGISTER,   {
                fullname,
                email,
                password,
                profileImageUrl
            });
            
            console.log("Response received:", response);
            console.log("Response status:", response.status);
            console.log("Response data:", response.data);
            
            if (response.status === 201 || response.status === 200) {
                toast.success("Registration successful! Please log in.");
                setIsLoading(false);
                navigate("/login");
            } else {
                console.log("Unexpected status code:", response.status);
                setError(`Registration failed with status ${response.status}`);
            }

        } catch (err) {
            console.error("Signup error:", err);
            console.error("Error response:", err.response);
            console.error("Error message:", err.message);
            
            if (err.response) {
                // Server responded with error status
                if (err.response.status === 400) {
                    setError("Invalid registration data. Please check your input.");
                } else if (err.response.status === 409) {
                    setError("An account with this email already exists.");
                } else {
                    setError(`Registration failed: ${err.response.data?.message || 'Unknown error'}`);
                }
            } else if (err.code === 'ECONNABORTED') {
                setError("Request timed out. Please check your internet connection.");
            } else {
                setError("Network error. Please try again later.");
            }
        } finally {
            setIsLoading(false);
        }
        
    }
    return (
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            {/* Background image */}
            <img className="absolute inset-0 w-full h-full bg-cover bg-center" src={assets.login_bg} alt="Background" />

            <div className="relative z-10 w-full max-w-lg px-6">
                <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                    <h3 className="text-2xl font-semibold text-black text-center mb-2">Create an Account</h3>
        
                    <p className="text-sm text-slate-700 text-center mb-8">Join us and start managing your finances effectively!</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex justify-center mb-6">
                            {/* Placeholder for logo or image */}

                            <ProfilePhotoSelector image={profilePhoto} setImage={setProfilePhoto} />


                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                            <Input 
                                label="Full Name" 
                                value={fullname} 
                                onChange={(e) => setFullname(e.target.value)} 
                                placeholder="Enter your full name" type="text" />
                            <Input 
                                label="Email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder="Enter your email" 
                                type="email" />

                            <div className="col-span-2">
                                <Input 
                                label="Password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="Enter your password" 
                                type="password" />
                            </div>
                            
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button disabled={isLoading} className={`btn-primary w-full py-3 text-lg font-medium flex items-center justify-center gap-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} type="submit">
                            {
                                isLoading ? (
                                    <>
                                    <LoaderCircle className="animate-spin w-5 h-5" />
                                    Sigining Up...
                                    </>
                                ) : ("Sign Up")
                            }
                        </button>
                        <p className="text-sm text-slate-700 text-center mt-4">
                            Already have an account? 
                            <Link to="/login" className="text-blue-500 hover:underline ml-1">Log in</Link>
                        </p>
                    </form>
                </div>

            </div>
        </div>
    )
}
export default Signup;