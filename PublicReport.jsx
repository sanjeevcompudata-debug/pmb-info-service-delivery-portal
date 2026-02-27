
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function PublicReport() {
  const [form, setForm] = useState({ category: "", description: "", ward: "" });

  const submitReport = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "reports"), {
      ...form,
      status: "Pending",
      createdAt: serverTimestamp()
    });
    alert("Report submitted!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Report Service Delivery Issue</h2>
      <form onSubmit={submitReport}>
        <input placeholder="Ward Number" onChange={e => setForm({...form, ward:e.target.value})} /><br/><br/>
        <select onChange={e => setForm({...form, category:e.target.value})}>
          <option value="">Select Category</option>
          <option>Water</option>
          <option>Electricity</option>
          <option>Roads</option>
          <option>Refuse</option>
          <option>Sewage</option>
        </select><br/><br/>
        <textarea placeholder="Describe issue"
          onChange={e => setForm({...form, description:e.target.value})}
        /><br/><br/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
