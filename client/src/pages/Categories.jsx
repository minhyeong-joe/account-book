import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';

import { Card, EditableListItem, TransactionTypeBtnGroup } from '../components';

import '../styles/Categories.css';

import { mockCategories } from '../lib/mockTransactions';

const Categories = () => {
    const [transactionType, setTransactionType] = useState('income'); // Default to 'income'
    const [categories, setCategories] = useState([]);

    console.log(categories);
    
    
    useEffect(() => {
        // Fetch categories based on the selected transaction type
        // This is a placeholder for actual API call
        const categories = mockCategories.filter(category => category.type === transactionType);
        setCategories(categories);
    }, [transactionType]);

    const handleAddNew = () => {
        // Determine the next available ID as a string
        const nextId = (Math.max(...mockCategories.map(category => parseInt(category.id, 10)), 0) + 1).toString();

        // Create a new category with default values
        const newCategory = {
            id: nextId,
            name: '', // Empty name for user input
            type: transactionType, // Current transaction type
            isNew: true,
        };

        // Add the new category to the list
        setCategories([...categories, newCategory]);
    }

    const handleEdit = (category, newName) => {
        // Update the category name
        const updatedCategories = categories.map(item => {
            if (item.id === category.id) {
                if (item.isNew) {
                    const { isNew: _, ...rest } = item;
                    item = { ...rest };
                }
                return { ...item, name: newName };
            }
            return item;
        });
        setCategories(updatedCategories);
    }

    const handleDelete = (category) => {
        // Logic to delete a category
        const updatedCategories = categories.filter(item => item.id !== category.id);
        setCategories(updatedCategories);
        console.log('Delete Category clicked!');
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
                        key={category.id}
                        item={category}
                        onEdit={(newName) => handleEdit(category, newName)}
                        onDelete={() => handleDelete(category)}
                        isNew={category.isNew}
                    />
                ))}
            </ul>
        </Card>
    );
}

export default Categories;