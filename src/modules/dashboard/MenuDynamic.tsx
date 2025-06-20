import { DashboardOutlined, UserOutlined, BarChartOutlined } from "@ant-design/icons";
import {Menu} from "antd";
import  { useNavigate, useLocation} from "react-router-dom"; //Mod- extra
import React, { useEffect, useState} from "react";

const Icons = {
    DashboardOutlined,
    UserOutlined,
    BarChartOutlined,
};

function  MenuDynamic() {
    const [menuItems, setMenuItems] = React.useState([]);
    const navigate= useNavigate();
    const location = useLocation(); // Mod- extra

    const fakeMenuData = [
            {
                title: "Dashboard",
                path: "/dashboard",
                icon: "DashboardOutlined",
                roles: ["665a1f2b40fd3a12b3e77611"]
            },
            {
                title: "Usuarios",
                path: "/users",
                icon: "UserOutlined",
                roles: ["665a1f2b40fd3a12b3e77612"]
            },
            {
                title: "Productos",
                path: "/products",
                icon: "BarChartOutlined",
                roles: ["665a1f2b40fd3a12b3e77611", "665a1f2b40fd3a12b3e77612"]
            }
    ];

    useEffect(() => {  //Simulación de llamada a API para obtener los datos del menú
        setTimeout(() => {
            setMenuItems(fakeMenuData); // Variable que contiene los datos del menú
        }, 500);
    });

    const renderMenu= () => { // Función para renderizar el menú dinámico (rutas)
        return menuItems.map((item: any) => {
            const IconComponent = Icons[item.icon as keyof  typeof Icons]; // Convertir string a componente de icono
            return {
                key: item.path,
                icon: IconComponent ? <IconComponent /> : null, // Renderizar el icono si existe
                label: item.title,
                }
            })
        }

    return (
        <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[location.pathname]} // Resaltar la ruta actual
            onClick={({ key }) => navigate(key)} // Navegar a la ruta seleccionada
            items={renderMenu()} // Renderizar los elementos del menú
            style={{ height: '100%', borderRight:0 }} // Estilo del menú
        />
    ); 
    }
export default MenuDynamic;
