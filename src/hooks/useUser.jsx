import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import axiosConfig from "../util/axiosConfig";
import { ENDPOINTS } from "../util/apiEndpoint";

export const useUser = () => {
    const { user, setUser, clearUser } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;

        if (!user) {
            const fetchUserInfo = async () => {
                try {
                    const response = await axiosConfig.get(ENDPOINTS.GET_USER_INFO);
                    if (isMounted && response.data) {
                        setUser(response.data);
                    }
                } catch (error) {
                    console.error("Error fetching user info:", error);
                    if (isMounted) {
                        clearUser();
                        navigate("/login");
                    }
                }
            };

            fetchUserInfo();
        }

        return () => {
            isMounted = false;
        };
    }, [user, setUser, clearUser, navigate]);
};
