import React from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Home from "../modules/admin/Home";
import Inventario from "../modules/admin/Inventary";
import Home1 from "../modules/admin/SolicitudPedido";
import Perfil from "../modules/admin/Perfil";

const AppRouter = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path='/' element={<Home/>}>
                    
                <Route path='home' element={<Home1/>} />
                    <Route path='inventario' element={<Inventario/>} />
                    <Route path='pedidos' element={<>Admin Home</>} />
                    <Route path='clientes' element={<>Products</>} />
                    <Route path='trabajadores' element={<>Products</>}/>
                    <Route path='perfil' element={<Perfil/>}/>
                </Route>
                <Route path='/' element={<>404 Not Found</>} />
            </>
        )
    );
    return <RouterProvider router={router} />;
}

export default AppRouter;
