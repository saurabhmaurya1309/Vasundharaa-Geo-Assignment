export const applySortAndFilter = (
  rows,
  { orderBy, order, filters = {} }
) => {
  if (!rows || !rows.length) return [];
  let result = [...rows];
  Object.entries(filters).forEach(([key, value]) => {
    if (!value) return;
    result = result.filter((row) =>
      String(row[key]).toLowerCase().includes(String(value).toLowerCase())
    );
  });
  result.sort((a, b) => {
    const valueA = a[orderBy];
    const valueB = b[orderBy];
    if (valueA < valueB) return order === "asc" ? -1 : 1;
    if (valueA > valueB) return order === "asc" ? 1 : -1;
    return 0;
  });
  return result;
};
