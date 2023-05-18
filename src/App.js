import React, { useState, useEffect } from "react";
import database from "./firebase";

function Crud() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingItemValue, setEditingItemValue] = useState("");

  useEffect(() => {
    getItems();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    database.ref("items").push({ name: newItem });
    setNewItem("");
  };

  const getItems = () => {
    database.ref("items").on("value", (snapshot) => {
      const itemsData = snapshot.val();
      if (itemsData) {
        const itemsArray = Object.entries(itemsData).map(([id, data]) => ({
          id,
          ...data,
        }));
        setItems(itemsArray);
      } else {
        setItems([]);
      }
    });
  };

  const handleUpdate = (id, name) => {
    database.ref(`items/${id}`).update({ name: name });
    setEditingItemId(null);
    setEditingItemValue("");
  };

  const handleDelete = (id) => {
    database.ref(`items/${id}`).remove();
  };

  const handleEdit = (id, name) => {
    setEditingItemId(id);
    setEditingItemValue(name);
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
    setEditingItemValue("");
  };

  const handleInputChange = (e) => {
    setEditingItemValue(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add a new item"
        />
        <button class = "add" type="submit">Add</button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {editingItemId === item.id ? (
              <>
                <input
                  type="text"
                  value={editingItemValue}
                  onChange={handleInputChange}
                />
                <button onClick={() => handleUpdate(item.id, editingItemValue)}>
                  Save
                </button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                {item.name}
                <button class = "edit" onClick={() => handleEdit(item.id, item.name)}>
                  Edit
                </button>
                <button class = "delete" onClick={() => handleDelete(item.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Crud;
