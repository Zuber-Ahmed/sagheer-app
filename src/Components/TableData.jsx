import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export default function TableData({ data }) {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "price", headerName: "Price" },
    {
      field: "discountPercentage",
      headerName: "Discount Percentage",
    },
    {
      field: "description",
      headerName: "Description",
      sortable: false,
      width: 300,
    },
  ];

  return (
    <DataGrid
      disableColumnFilter
      disableColumnSelector
      disableDensitySelector
      debounceMs={200}
      rows={Array.isArray(data) ? data : []}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10, 15, 20]}
      slots={{ toolbar: GridToolbar }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
        },
      }}
    />
  );
}
