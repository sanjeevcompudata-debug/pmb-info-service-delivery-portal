
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function Dashboard() {
  const [reports, setReports] = useState([]);
  const [wardFilter, setWardFilter] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "reports"), (snapshot) => {
      setReports(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const filteredReports = wardFilter
    ? reports.filter(r => r.ward === wardFilter)
    : reports;

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>

      <input
        placeholder="Filter by Ward"
        value={wardFilter}
        onChange={e => setWardFilter(e.target.value)}
      /><br/><br/>

      <h3>Total Reports: {filteredReports.length}</h3>

      <MapContainer center={[-29.6, 30.38]} zoom={12} style={{ height: "400px" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredReports.map((report, index) => (
          <Marker key={index} position={[-29.6 + index*0.01, 30.38 + index*0.01]}>
            <Popup>
              {report.category}<br/>{report.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
