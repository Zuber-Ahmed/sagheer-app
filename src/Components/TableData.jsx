import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export default function TableData({ data }) {
  const columns = [
    { field: "documentHandleId", headerName: "ID", flex: 1,maxWidth: 100, },
    { field: "documentName", headerName: "Title", flex: 1, },
    { field: "Description", headerName: "Price",flex: 1,minWidth: 100, },
    {
      field: "DateOnDocument",
      headerName: "Discount Percentage",
      flex: 1,
      maxWidth: 200,
    },
    {
      field: "InsuredName",
      headerName: "Description",
      sortable: false,
      flex: 1
    },
  ];

  return (
    <DataGrid
      getRowId={(row) => row.documentHandleId}
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
