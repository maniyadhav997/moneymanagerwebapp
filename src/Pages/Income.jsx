import Dashboard from "../Components/Dashboard";
import { useUser } from "../hooks/useUser";

const Income = () => {
    useUser();
    return (
         <Dashboard activeMenu="Income">
            This is Income Page
        </Dashboard>
    )
}
export default Income;