import { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
const defaultIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
const selectedIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [30, 48],
  iconAnchor: [15, 48],
});
const MapView = ({ rows, selectedId, onMarkerSelect }) => {
  const center = useMemo(() => {
    if (!rows.length) return [20.5937, 78.9629];
    return [rows[0].latitude, rows[0].longitude];
  }, [rows]);
  return (
    <MapContainer
      center={center}
      zoom={5}
      className="h-full w-full rounded"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {rows.map((row) => (
        <Marker
          key={row.id}
          position={[row.latitude, row.longitude]}
          icon={row.id === selectedId ? selectedIcon : defaultIcon}
          eventHandlers={{
            click: () => onMarkerSelect(row.id),
          }}
        >
          <Popup>
            <div>
              <strong>{row.projectName}</strong>
              <br />
              Status: {row.status}
              <br />
              Updated: {row.lastUpdated}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
export default MapView;
