import { useState } from "react"
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar"
import { Avatar, Box, IconButton, Typography, useTheme } from '@mui/material'
import { deepPurple } from '@mui/material/colors';
import { Link } from "react-router-dom"
import { tokens } from '../../theme'
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PostAddIcon from '@mui/icons-material/PostAdd';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import ReceiptIcon from '@mui/icons-material/Receipt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';


const Item = ({title, to, icon, selected, setSelected}) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode)

  return (
    <MenuItem
      active={ selected === title }
      style={{
        color: '#F5F4F4'
      }}
      onClick={() => setSelected(title)}
      icon={icon}
      component={
        <Link to={to} />
      }
    >
      <Typography>{title}</Typography>
      
    </MenuItem>
  )
}

export const AppSidebar = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [ isCollapsed, setIsCollapsed ] = useState(false)
  const [ selected, setSelected ] = useState("Inicio")

  const auth = useAuthUser()

  return (
    <Box
      sx={{
        "& .ps-sidebar-root" : {
          minHeight: "100vh !important",
        },
        "& .ps-sidebar-container": {
          background: `#2E2E30 !important`,
          minHeight: "100vh !important",
        },
        "& .pro-icon-wrapper" : {
          backgroundColor: "transparent !important"
        },
        "& .ps-menu-button" : {
          padding: "5px 35px 5px 20px !important"
        },
        "& .ps-menu-button:hover": {
          color: "#868dfb !important",
          backgroundColor: "transparent !important"
        },
        "& .ps-active": {
          color: "#6870fa !important"
        }
      }}
    >
      <Sidebar collapsed={isCollapsed}>
        <Menu>
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: '#767577 !important',
            }}
          >
          {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                {/* <Typography variant="h3" color={colors.grey[100]}>
                  TATA
                </Typography> */}
                <img  
                  src={`../../assets/app-logo.png`} alt="" 
                  width="100px"
                />

                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* USER */}
          { !isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                {/* <img 
                  src={`../../assets/user.jpeg`}
                  alt="Profile-User" 
                  width="100px"
                  height="100px"
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    objectFit: "cover"
                  }}
                /> */}
                <Avatar 
                  alt="Profile-User"
                  sx={{
                    bgcolor: deepPurple[500],
                    width: "100px",
                    height: "100px",
                    fontSize: "40px",
                    cursor: "pointer",
                  }}
                >
                  {auth.name.split(" ").map((n)=>n[0]).join("")}
                </Avatar>
              </Box>

              <Box textAlign="center">
                <Typography variant="h4" color='#f5f5f5' fontWeight="bold" mt="10px" >{auth.name}</Typography>
                <Typography variant="h6" color={colors.greenAccent[500]}>{auth.user_type.type}</Typography>
              </Box>
            </Box>
          )}

          {/* Menu Items */}
          <Box
            padding={ isCollapsed ? undefined : "10%" }
          >
            <Item 
              title="Inicio"
              to="/"
              icon={<DashboardIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color='#767577'
              sx={{
                m: "15px 0 5px 20px"
              }}
            >
              Clientes
            </Typography>

            <Item 
              title="Ver Todos"
              to="/clientes"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item 
              title="Agregar"
              to="/clientes/agregar"
              icon={<PersonAddAltIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{
                m: "15px 0 5px 20px"
              }}
            >
              Cotizaciones
            </Typography>

            <Item 
              title="Ver Todas"
              to="/cotizaciones"
              icon={<BackupTableIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item 
              title="Crear"
              to="/cotizaciones/nueva"
              icon={<PostAddIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{
                m: "15px 0 5px 20px"
              }}
            >
              Notas
            </Typography>

            <Item 
              title="Notas de Venta"
              to="/notas-venta"
              icon={<ReceiptIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item 
              title="Canceladas"
              to="/notas-canceladas"
              icon={<DeleteForeverIcon />}
              selected={selected}
              setSelected={setSelected}
            />

          </Box>
        </Menu>
      </Sidebar>

      

    </Box>
  )
}
