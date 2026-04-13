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
    const categoryOptions = categories.map((category) => ({
        value: category.id,
        label: category.name,
    }));

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
        
    </div>
  )
}
export default AddIncomeForm;