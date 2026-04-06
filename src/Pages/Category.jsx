import { use } from "react";
import Dashboard from "../Components/Dashboard";
import { useUser } from "../hooks/useUser";

const Category = () => {
    useUser();
    return (
        <Dashboard activeMenu="Category">
            This is Category Page
        </Dashboard>
    )
}
export default Category;