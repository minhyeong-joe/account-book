import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';

import { Card, EditableListItem, TransactionTypeBtnGroup } from '../components';

import '../styles/Categories.css';

import { getCategories, createCategory, updateCategory, deleteCategory } from '../apis/category';
import { useFlash } from '../contexts/FlashContext';

const Categories = () => {
    const [transactionType, setTransactionType] = useState('income'); // Default to 'income'
    const [allCategories, setAllCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const { showFlash } = useFlash();

    
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

    const handleConfirm = async (category, newName, isNew=false) => {
        try {
            if (isNew) {
                const newCategory = await createCategory({ name: newName, type: category.type });
                // remove temporary category from all categories
                const updatedCategories = allCategories.filter(item => item._id !== category._id);
                setAllCategories([...updatedCategories, newCategory]);
            } else {
                const updatedCategory = await updateCategory(category._id, { name: newName });
                const updatedCategories = allCategories.map(item => {
                    if (item._id === category._id) {
                        return updatedCategory;
                    }
                    return item;
                });
                setAllCategories(updatedCategories);
            }
        } catch (error) {
            showFlash(error.message || 'Failed to save category', 'error');
            // remove temporary category if it was a new one
            if (isNew) {
                const updatedCategories = allCategories.filter(item => item._id !== category._id);
                setAllCategories(updatedCategories);
            }
        }
    }

    const handleDelete = async (category) => {
        // Logic to delete a category
        try {
            await deleteCategory(category._id);
            const updatedCategories = allCategories.filter(item => item._id !== category._id);
            setAllCategories(updatedCategories);
        } catch (error) {
            showFlash(error.message || 'Failed to delete category', 'error');
        }
    }

    const handleCancel = (category) => {
        const updatedCategories = allCategories.filter(item => item._id !== category._id);
        setAllCategories(updatedCategories);
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
                        onConfirm={(newName) => handleConfirm(category, newName, category.isNew)}
                        onDelete={() => handleDelete(category)}
                        onCancel={() => handleCancel(category)}
                        isNew={category.isNew}
                    />
                ))}
            </ul>
        </Card>
    );
}

export default Categories;