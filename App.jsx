
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicReport from "./pages/PublicReport";
import Dashboard from "./admin/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicReport />} />
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
