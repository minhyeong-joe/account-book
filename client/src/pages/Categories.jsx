import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';

import { Card, EditableListItem, TransactionTypeBtnGroup } from '../components';

import '../styles/Categories.css';

import { getCategories, createCategory, updateCategory, deleteCategory } from '../apis/category';

const Categories = () => {
    const [transactionType, setTransactionType] = useState('income'); // Default to 'income'
    const [allCategories, setAllCategories] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await getCategories();
            setAllCategories(categories);
        }
        fetchCategories();
    }, []);

    useEffect(() => {
        // Filter categories based on the selected transaction type
        const filteredCategories = allCategories.filter(category => category.type === transactionType);
        setCategories(filteredCategories);
    }, [transactionType, allCategories]);

    const handleAddNew = () => {
        // Create a new category with default values
        const newCategory = {
            _id: `temp-${Date.now()}`, // Temporary ID for new category
            name: '', // Empty name for user input
            type: transactionType, // Current transaction type
            isNew: true,
        };

        // Add the new category to the list
        setAllCategories([...allCategories, newCategory]);
    }

    const handleEdit = async (category, newName, isNew=false) => {
        
        let newOrUpdatedCategory = null;
        try {
            if (isNew) {
                newOrUpdatedCategory = await createCategory({ name: newName, type: transactionType });
            } else {
                newOrUpdatedCategory = await updateCategory(category._id, { name: newName });
            }
            const allCategoriesCopy = [...allCategories].filter(item => item._id !== category._id);
            setAllCategories([...allCategoriesCopy, newOrUpdatedCategory]);
        } catch (error) {
            console.error(error);
            // remove the new category if creation fails
            const allCategoriesCopy = [...allCategories].filter(item => item._id !== category._id);
            setAllCategories(allCategoriesCopy);
        }
    }

    const handleDelete = async (category) => {
        // Logic to delete a category
        try {
            await deleteCategory(category._id);
            const updatedCategories = allCategories.filter(item => item._id !== category._id);
            setAllCategories(updatedCategories);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Card className="categories-card">
            <TransactionTypeBtnGroup
                type={transactionType}
                setType={setTransactionType}
            />
            <div className='card-header'>
                <span className='add-category-btn' onClick={handleAddNew}>
                    <Plus size={20} className='add-category-icon' />
                    <span className='add-category-text'>Add New</span>
                </span>
            </div>
            <ul>
                {categories.map(category => (
                    <EditableListItem
                        key={category._id}
                        item={category}
                        onEdit={(newName) => handleEdit(category, newName, category.isNew)}
                        onDelete={() => handleDelete(category)}
                        isNew={category.isNew}
                    />
                ))}
            </ul>
        </Card>
    );
}

export default Categories;