import React, { useState } from 'react';
import Input from "./Input";
import EmojiPickerPopup from './EmojiPickerPopup';

const AddIncomeForm = ({ onAddIncome , categories}) => {
    const [income, setIncome] = useState({
        name: "",
        amount: "",
        date: "",
        categoryId: "",
    });
    const categoryOptions = [
        { value: "", label: "Select category" },
        ...categories.map((category) => ({
            value: category.id || category._id || "",
            label: category.name,
        })),
    ];

    const handleChange = (key, value) => {
        setIncome({
            ...income,
            [key]: value,
        })
    }

  return (
    <div>
        <EmojiPickerPopup
            icon = {income.icon}
            onSelect = {(selectedIcon) => handleChange("icon", selectedIcon)}
        />
        <Input
            value={income.name}
            onChange={({target}) => handleChange("name", target.value)}
            label="Income Source"
            placeholder="Example: Salary, Freelancing, etc."
            type="text"
        />
        <Input
            label="Category"
            value={income.categoryId}
            onChange={({target}) => handleChange("categoryId", target.value)}
            isSelect={true}
            options={categoryOptions}
        />
        <Input
            value={income.amount}
            onChange={({target}) => handleChange("amount", target.value)}
            label="Amount"
            placeholder="Enter the amount"
            type="number"
        />
        <Input
            value={income.date}
            onChange={({target}) => handleChange("date", target.value)} 
            label="Date"
            placeholder="Select the date of income"
            type="date"
        />
        <button 
            className="add-btn add-btn-fill mt-4"
            onClick={() => onAddIncome(income)}
        >
            Add Income
        </button>
    </div>
  )
}
export default AddIncomeForm;