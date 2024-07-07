import { Routes, Route, Navigate } from "react-router-dom";
import { AppSidebar, Topbar } from "./global";
import { Dashboard } from "@mui/icons-material";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import AppDashboard from "./dashboard";
import { ClientsAll, ClientNew, ClientSingle } from "./clients";
import { CotizacionesAll } from "./cotizaciones";
import { CreateEditFolio } from "./CreateEditFolio";
import { SingleFolio } from "./SingleFolio";
import { CanceladasAll, VentasAll } from "./notasVenta";
import UserProfile from "./userProfile";

const AppBoard = () => {
  return (
    <div className='app'>
      <AppSidebar />
      <main className='content'>
        <Topbar />
        <Routes>
          <Route element={<AuthOutlet fallbackPath='/login' />}>
            <Route path='/' element={<AppDashboard />} />

            {/* Settings Page */}
            {/* <Route path='/' element={<AppDashboard />} /> */}

            {/* Pages */}
            <Route path='/clientes' element={<ClientsAll />} />
            <Route path='/clientes/agregar' element={<ClientNew />} />
            <Route path='/clientes/:id' element={<ClientSingle />} />

            <Route path='/cotizaciones' element={<CotizacionesAll />} />
            <Route
              path='/cotizaciones/nueva'
              element={<CreateEditFolio isSale={false} isEditingSale={false} />}
            />
            <Route
              path='/cotizacion/:id'
              element={<SingleFolio title='Cotizacion' />}
            />
            <Route
              path='/cotizacion/:id/editar'
              element={<CreateEditFolio isSale={false} isEditingSale={false} />}
            />

            <Route path='/notas-venta' element={<VentasAll />} />
            <Route
              path='/notas-venta/:id'
              element={<SingleFolio title='Nota de Venta' />}
            />
            <Route
              path='/notas-venta/:id/editar'
              element={<CreateEditFolio isSale={true} isEditingSale={true} />}
            />
            <Route
              path='/nueva-venta/:id'
              element={<CreateEditFolio isSale={true} />}
            />

            <Route path='/notas-canceladas' element={<CanceladasAll />} />
            <Route
              path='/notas-canceladas/:id'
              element={<SingleFolio title='Nota Cancelada' />}
            />

            <Route path='/profile/:id' element={<UserProfile />} />

            {/* <Route path='/*' element={ <Navigate to='/' replace />} /> */}
          </Route>
        </Routes>
      </main>
    </div>
  );
};

export default AppBoard;
