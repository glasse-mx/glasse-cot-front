import { Box, Button, Modal, Stack, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { tokens } from '../../theme'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "1000px",
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
};

export const ClientSearchModalChild = ({ open, setOpen, clients, order, setOrder, setClientInfo, close}) => {

    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const handleAddClient = (data) => {
        setOrder({
            ...order,
            id_cliente: data.id
        })
        setClientInfo(data)
        setOpen
        close
    }

    const columns = [
    {
      field: 'first_name',
      headerName: 'Nombres',
      flex: 1
    },
    {
      field: 'last_name',
      headerName: 'Apellidos',
      flex: 1
    },
    {
      field: 'email',
      headerName: 'Correo',
      flex: 1
    },
    {
      field: 'phone',
      headerName: 'Teléfono',
      flex: 1
    },
    {
      field: 'address_state',
      headerName: 'Estado',
      flex: 1
    },
    {
      field: 'address_zip',
      headerName: 'CP',
      flex: .25
    },
    {
      field: 'id',
      headerName: '',
      flex: 1,
      renderCell: (params) => (
        <Button
            variant="contained"
            color="info"
            onClick={() => handleAddClient(params.row)}
        >
            <PersonAddAlt1Icon />
            Seleccionar
        </Button>
      )
    }
    ]

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
            sx={{
                "& .css-qvtrhg-MuiDataGrid-virtualScroller" : {
                    minHeight: "150px !important",
                    width: "100% !important"
                }
            }}
        >
            <Box sx={{ 
                ...style ,
                "& .MuiDataGrid-root": {
                border: "none",
                },
                "& .MuiDataGrid-cell": {
                borderBottom: "none",
                },
                "& .name-column--cell": {
                color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
                },
                "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
                }
                }}
            >
                <DataGrid
                    rows={clients}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    components={{
                        NoRowsOverlay: () => (
                        <Stack height="100%" alignItems="center" justifyContent="center">
                            No se encontraron clientes con ese criterio de búsqueda
                        </Stack>
                        )
                    }}
                    // checkboxSelection
                />
            </Box>
        </Modal>
    )
}
