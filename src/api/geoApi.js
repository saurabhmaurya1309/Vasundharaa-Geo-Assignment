import geoData from "../data/geoData.json";
export const fetchGeoData = ({ page, limit }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = page * limit;
      const end = start + limit;
      resolve({
        data: geoData.slice(start, end),
        total: geoData.length,
      });
    }, 300);
  });
};
