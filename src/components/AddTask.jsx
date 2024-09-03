import axios from "axios";
import { useState } from "react";

export const AddTask = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!text.trim()) {
      return setError("pleace fill the field");
    }
    setError("");
    axios
      .post("http://localhost:3004/tasks", { text, status: "unstarted" })
      .then((response) => {
        onAdd(response.data);        
        setText("");
      });
  };
  return (
    <div>
      <p>AddTask</p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="enter your task"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button>Add</button>
        
      </form>
    </div>
  );
};
