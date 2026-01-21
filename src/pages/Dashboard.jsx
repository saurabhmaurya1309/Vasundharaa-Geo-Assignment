import { useState, useCallback } from "react";
import DataTable from "../components/DataTable/DataTable";
import MapView from "../components/MapView/MapView";
import { useGeoData } from "../hooks/useGeoData";
const PAGE_SIZE = 50;
const Dashboard = () => {
  const [page, setPage] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const { rows, total, loading } = useGeoData(page, PAGE_SIZE);
  const handleRowSelect = useCallback((id) => {
    setSelectedId(id);
  }, []);
  const handleMarkerSelect = useCallback((id) => {
    setSelectedId(id);
  }, []);
  return (
    <div className="p-4 h-screen flex gap-4">
      <div className="w-1/2 bg-white rounded shadow">
        <DataTable
          rows={rows}
          total={total}
          page={page}
          pageSize={PAGE_SIZE}
          loading={loading}
          selectedId={selectedId}
          onRowSelect={handleRowSelect}
          onPageChange={setPage}
        />
      </div>
      <div className="w-1/2 bg-white rounded shadow">
        <MapView
          rows={rows}
          selectedId={selectedId}
          onMarkerSelect={handleMarkerSelect}
        />
      </div>
    </div>
  );
};

export default Dashboard;
