import React, { useState } from "react";
import moment from "moment"; 

function Logo() {
  return (
    <h1
      style={{
        textAlign: "center",
        color: "#2c3e50",
        fontSize: "2.5rem",
        fontFamily: "'Poppins', sans-serif",
        letterSpacing: "2px",
        marginBottom: "30px",
      }}
    >
      My Travel List
    </h1>
  );
}

function Form({ handleAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description.trim()) {
      alert("Please enter a valid description.");
      return;
    }
    if (quantity <= 0) {
      alert("Please enter a positive quantity.");
      return;
    }

    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
      color: "#ffffff", // Default color for item
    };

    handleAddItem(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        marginBottom: "20px",
        width: "90%",
        maxWidth: "600px",
      }}
    >
      <h3
        style={{
          marginBottom: "15px",
          color: "#34495e",
          fontSize: "1.5rem",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        What do you need to pack?
      </h3>
      <div
        style={{
          display: "flex",
          gap: "15px",
          width: "100%",
        }}
      >
        <input
          type="number"
          name="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          style={{
            flex: "0.2",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            fontSize: "1rem",
          }}
          min="1"
        />
        <input
          type="text"
          name="description"
          placeholder="Enter item..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            flex: "1",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            fontSize: "1rem",
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#16a085",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#13876d")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#16a085")}
        >
          Add
        </button>
      </div>
    </form>
  );
}

function Item({ item, handleDelete, handleTogglePacked, handleChangeColor, isRecentlyAdded }) {
  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        borderBottom: "1px solid #eee",
        fontSize: "1rem",
        backgroundColor: isRecentlyAdded ? "#f0f9ff" : item.color,
        color: item.packed ? "#7f8c8d" : "#2c3e50",
        textDecoration: item.packed ? "line-through" : "none",
        transition: "background-color 0.3s ease",
      }}
    >
      <div>
        {item.description} (x{item.quantity})
        <br />
        <small style={{ color: "#7f8c8d" }}>{moment(item.id).format("MMM Do, h:mm a")}</small>
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="color"
          value={item.color}
          onChange={(e) => handleChangeColor(item.id, e.target.value)}
          style={{
            width: "30px",
            height: "30px",
            border: "none",
            cursor: "pointer",
          }}
        />
        <button
          onClick={() => handleTogglePacked(item.id)}
          style={{
            backgroundColor: item.packed ? "#f39c12" : "#27ae60",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "5px 10px",
            cursor: "pointer",
            fontSize: "0.9rem",
            transition: "background-color 0.3s ease",
          }}
        >
          {item.packed ? "Unpack" : "Packed"}
        </button>
        <button
          onClick={() => handleDelete(item.id)}
          style={{
            backgroundColor: "#e74c3c",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "5px 10px",
            cursor: "pointer",
            fontSize: "0.9rem",
            transition: "background-color 0.3s ease",
          }}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

function PackingList({ items, handleDelete, handleTogglePacked, handleChangeColor }) {
  const mostRecentlyAddedId = items.length > 0 ? Math.max(...items.map((item) => item.id)) : null;

  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        width: "90%",
        maxWidth: "600px",
        marginBottom: "20px",
      }}
    >
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            handleDelete={handleDelete}
            handleTogglePacked={handleTogglePacked}
            handleChangeColor={handleChangeColor}
            isRecentlyAdded={item.id === mostRecentlyAddedId}
          />
        ))}
      </ul>
    </div>
  );
}

function Stats({ items }) {
  const totalItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const packedPercentage = totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0;

  return (
    <footer
      style={{
        textAlign: "center",
        color: "#34495e",
        fontSize: "1.2rem",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <em>
        You have {totalItems} items in the list. You already packed {packedItems} ({packedPercentage}%).
      </em>
      <div
        style={{
          backgroundColor: "#eee",
          borderRadius: "10px",
          overflow: "hidden",
          width: "90%",
          maxWidth: "600px",
          height: "20px",
          margin: "15px auto",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${packedPercentage}%`,
            backgroundColor: "#27ae60",
            transition: "width 0.3s ease",
          }}
        ></div>
      </div>
    </footer>
  );
}

function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    const updatedItems = [item, ...items];
    setItems(updatedItems);
  }

  function handleDelete(itemId) {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
  }

  function handleTogglePacked(itemId) {
    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, packed: !item.packed } : item
    );
    setItems(updatedItems);
  }

  function handleChangeColor(itemId, color) {
    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, color } : item
    );
    setItems(updatedItems);
  }

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <Logo />
      <Form handleAddItem={handleAddItem} />
      <PackingList
        items={items}
        handleDelete={handleDelete}
        handleTogglePacked={handleTogglePacked}
        handleChangeColor={handleChangeColor}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
