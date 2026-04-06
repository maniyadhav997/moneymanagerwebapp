import Dashboard from "../Components/Dashboard";
import { useUser } from "../hooks/useUser";
const Expense = () => {
    useUser();
    return (
         <Dashboard activeMenu="Expense">
            This is Expense Page
        </Dashboard>
    )
}
export default Expense;