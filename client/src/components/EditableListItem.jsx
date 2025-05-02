import { useState } from 'react';

import { Pencil, Trash2, Check, X } from 'lucide-react';

import '../styles/common.css';

const EditableListItem = ({ item, onEdit, onDelete, editMode: initialEditMode = false }) => {
    const [editMode, setEditMode] = useState(initialEditMode);
    const [newName, setNewName] = useState(item.name);

    const handleEdit = () => {
        setEditMode(true);
        setNewName(item.name); // Reset to original name when entering edit mode
    };

    const handleDelete = () => {
        onDelete(item);
    };

    const handleConfirm = () => {
        console.log('Confirm clicked!');
        console.log(item);
        console.log(newName);
        onEdit(newName);
        setEditMode(false);
    };

    const handleCancel = () => {
        console.log('Cancel clicked!');
        setEditMode(false);
        setNewName(item.name); // Reset to original name when canceling
    };

    return (
        <li className='list-item'>
            {editMode ? (
                <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
            ) : (
                <span>{item.name}</span> // Display original name when not in edit mode
            )}
            <div className="edit-and-delete-group">
                {editMode ? (
                    <>
                        <Check size={20} className="confirm-icon" onClick={handleConfirm} />
                        <X size={20} className="cancel-icon" onClick={handleCancel} />
                    </>
                ) : (<>
                    <Pencil size={20} className="edit-icon" onClick={handleEdit} />
                    <Trash2 size={20} className="delete-icon" onClick={handleDelete} />
                </>)}
            </div>
        </li>
    );
}

export default EditableListItem;