import Dashboard from "../Components/Dashboard";
import { useUser } from "../hooks/useUser";
const Filter = () => {
    useUser();
    return (
         <Dashboard activeMenu="Filters">
            This is Filter Page
        </Dashboard>
    )
}
export default Filter;