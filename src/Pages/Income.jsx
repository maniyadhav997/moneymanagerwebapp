import { useEffect, useState } from "react";
import Dashboard from "../Components/Dashboard";
import { useUser } from "../hooks/useUser";
import { data } from "react-router-dom";
import axiosConfig from "../util/axiosConfig";
import { ENDPOINTS } from "../util/apiEndpoint";
import IncomeList from "../Components/IncomeList";
import { toast } from "react-hot-toast";
import Modal from "../Components/Modal";
import { Plus } from "lucide-react";
import AddIncomeForm from "../Components/AddIncomeForm";

const Income = () => {
    useUser();
    const [incomeData, setIncomeData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null
    });

    //Fetch income details from the API

    const fetchIncomeDetails = async () => {
        if(loading) return ;
        setLoading(true);
        
        try{
            const response = await axiosConfig.get(ENDPOINTS.GET_ALL_INCOMES);

            if(response.status === 200){
                
                setIncomeData(response.data);
            }
        }
        catch(error){
            console.error("Failed to fetch error message", error);
            toast.error(error.response?.data?.message || "Failed to fetch error message");
        }
    }

    //Fetch categories for income

    const fetchIncomeCategories = async () => {
        try{
            const response =  await axiosConfig.get(ENDPOINTS.CATEGORY_BY_TYPE("income"))
            if(response.status ===200){
                console.log('income categories',  response.data);
                setCategories(response.data);
            }
        }catch(error){
            console.error('failed to fetch income categories: ', error);
            toast.error(error.data.message || "failed to fetch income categories:");
        }
    }

    // save the income details to the database
    const handleAddIncome = async (income) => {
        console.log("Adding income: ", income);
        const {name, amount, date,icon, categoryId} = income;

        if(!name.trim() || !amount || !date || !categoryId){
            toast.error("All fields are required");
            return;
        }
       const selectedDate = new Date(date);
       const today = new Date();
       selectedDate.setHours(0, 0, 0, 0);
       today.setHours(0, 0, 0, 0);
       if (selectedDate > today) {
        toast.error("Date cannot be in the future");
        return;
       }

       try {
       const response = await axiosConfig.post(ENDPOINTS.ADD_INCOME, {name, amount, date, icon, categoryId});
        if(response.status === 201){
            toast.success("Income added successfully");
            setOpenAddIncomeModel(false);
            fetchIncomeDetails();
            fetchIncomeCategories();
        }
       }
       catch(error){
            console.error("Failed to add income", error);
            toast.error(error.response?.data?.message || "Failed to add income");
       }

    }


    useEffect(()=> {
        fetchIncomeDetails();
        fetchIncomeCategories();
    }, [])

    return (
         <Dashboard activeMenu="Income">
            <div className="my-5 mx-auto">
                
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        {/** over view for income with line char */}
                        <button className="add-btn" onClick={() => setOpenAddIncomeModel(true)}>
                            <Plus size={15} className="text-lg" /> Add Income
                        </button>
                    </div>
                    <IncomeList 
                        transactions={incomeData}
                        onDelete={(id) => console.log('deleting the id', id)}
                    />
                    {/**Add Income Modal */}
                    <Modal 
                        isOpen={openAddIncomeModel}
                        onClose={() => setOpenAddIncomeModel(false)}
                        title="Add Income"
                    >
                        <AddIncomeForm 
                            categories={categories}
                            onAddIncome={(income) => handleAddIncome(income)}
                        />
                    </Modal>
                </div>

            </div>
        </Dashboard>
    )
}
export default Income;