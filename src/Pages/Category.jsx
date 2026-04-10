import { use } from "react";
import Dashboard from "../Components/Dashboard";
import { useUser } from "../hooks/useUser";
import { Plus } from "lucide-react";
import CategoryList from "../Components/CategoryList";
import axiosConfig from "../util/axiosConfig";
import { ENDPOINTS } from "../util/apiEndpoint";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "../Components/Modal";
import AddCategoryForm from "../Components/AddCategoryForm"


const Category = () => {
    useUser();

    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
    const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const fetchCategoryDetails = async () => {
        if(loading) return;
        setLoading(true);
        try{
          const response =  await axiosConfig.get(ENDPOINTS.GET_ALL_CATEGORIES);
          if(response.status === 200){
            console.log("Category data:", response.data);
            setCategoryData(response.data);
          }

        } catch(error){
            console.error("Error fetching category data:", error);
            toast.error(error.message);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategoryDetails();
    }, []);

    const handleAddCategory = async (category) => {
        const {name, type, icon} = category;
        if(!name.trim()){
            toast.error("Category Name is required");
            return;
        }
        //check if the category already exists
        const isDuplicate = categoryData.some((category) => {
            return category.name.toLowerCase() === name.trim().toLowerCase();
        })

        if(isDuplicate){
            toast.error("Category Name Already exists");
            return
        }

        try{
        const response = await    axiosConfig.post(ENDPOINTS.ADD_CATEGORY, {name,type, icon});
        if(response.status === 201){
            toast.success("Category added successfully");
            setOpenAddCategoryModal(false);
            fetchCategoryDetails();
        }

        }
        catch(e){
            console.log("Error adding category", error);
            toast.error(error.response?.data?.message || "Failed to Category");
        }
    }

    return (
        <Dashboard activeMenu="Category">
            <div className="my-5 mx-au">
                {/*  Add button to add categories */}

                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-2xl font-semibold">
                        All categories
                    </h2>
                    <button 

                        onClick = {() => setOpenAddCategoryModal(true)}

                        className="add-btn flex items-center gap-1">
                            <Plus size={15} />
                            Add Category
                    </button>
                </div>

                {/* Category list */ }

                <CategoryList categories={categoryData} />

                {/* Adding category modal*/}
                <Modal
                    title="Add Category"
                    isOpen={openAddCategoryModal}
                    onClose={() => setOpenAddCategoryModal(false)}
                >
                    <AddCategoryForm onAddCategory={handleAddCategory}  />
                    {/* Add category form content here */}
                </Modal>

                {/** Updating category modal */}
            </div>
        </Dashboard>
    )
}
export default Category;