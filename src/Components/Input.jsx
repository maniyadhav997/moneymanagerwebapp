import { EyeOff } from "lucide-react";
import { Eye } from "lucide-react";
import { useState } from "react";

const Input = ({ label, value, onChange, placeholder, type, isSelect, options }) => {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (  
        <div className="mb-4">
            <label htmlFor={label} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div className="relative">  
                {isSelect ? (
                    <select
                        className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading focus: outline-none focus:border-blue-500"
                        value={value}
                        onChange={(e) => onChange(e)}
                    >
                        {options.map((option) => (
                           <option key={option.value} value={option.value}>
                            {option.label}
                           </option> 
                        ))}     
                    </select>
                ) : 
            <input
                type={type == "password" ? (showPassword ? "text" : "password") : type}
                id={label}
                value={value}
                onChange={(e) => onChange(e)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={placeholder}
            />
}
            {type === "password" && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" onClick={togglePasswordVisibility}>
                    {showPassword ? (
                        <Eye 
                            size={20}
                            color="#4B5563"
                            className="text-primary"
                            onClick={togglePasswordVisibility}

                        />
                    ) : (
                        <EyeOff
                            size={20}
                            color="#4B5563"
                            className="text-primary"
                            onClick={togglePasswordVisibility}
                        />

                    )}
                </span>
            )}
        
        </div>
        </div>

        
    )
}

export default Input;


    