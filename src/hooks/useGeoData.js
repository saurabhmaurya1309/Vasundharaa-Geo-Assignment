import { useEffect, useState } from "react";
import { fetchGeoData } from "../api/geoApi";
export const useGeoData = (page, limit) => {
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchGeoData({ page, limit })
      .then((response) => {
        if (!isMounted) return;
        setRows(response.data);
        setTotal(response.total);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [page, limit]);
  return { rows, total, loading };
};
