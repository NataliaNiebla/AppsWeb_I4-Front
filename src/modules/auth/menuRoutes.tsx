import OrderTable from "../orders/OrderTable";
import ProductTable from " ../products/ProductTable";
import UserForm from "../user/UserForm";
import type { JSX } from "react";
import Dashboard from "../dashboard/Dashboard";

export interface MenuRoutes {
    path : string;
    element: JSX.Element;
    label: string;
}

const routes: MenuRoutes[] = [
    {
        path: '/dashboard',
        element: <p>Dashboard <p/>,
        label: 'Dashboard'
    },
    {   
        path:'/user',
        element: <UserForm/>,
        label: 'Usuarios'
    },
    {
        path: '/products,
        element: <ProductTable/>,
        label: 'Productos'
    },
    {
        path: '/orders',
        element: <OrderTable/>,
        label: 'Ordenes'
    }
];

export default routes;

