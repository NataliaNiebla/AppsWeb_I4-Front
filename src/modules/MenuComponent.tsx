import Icon, { DashboardOutlined, UserOutlined, BarChartOutlined, PieChartOutlined, TeamOutlined, FileTextOutlined, ShoppingCartOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Icons = {
    PieChartOutlined,
    TeamOutlined,
    FileTextOutlined,
    ShoppingCartOutlined,
    AppstoreOutlined,
};

interface MenuItem {
    _id: string;
    title: string;
    path: string;
    icon: keyof typeof Icons;
    roles: { type: string }[];
}

function MenuComponents(){
    const [menuItems, setMenuItems] = useState<any[]>([]);
    const navigate = useNavigate();
    const location = useLocation();
    const {user, token} = useAuth();

    const getMenusByRoleUrl = import.meta.env.VITE_MENU_ROL;

    useEffect(() => {
        const fetchMenus = async () => {
    if (!user?.roles || user.roles.length === 0) return;

      const roles = user.roles.map(role => role.type); // ["admin", "editor"]

        try {
            const response = await fetch(`${getMenusByRoleUrl}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ roles })
            });
                        console.log(response)


            if (!response.ok) {
            console.error("Error al obtener menús:", await response.text());
            return;
            }

            const menuList: MenuItem[] = await response.json();
            console.log(menuList)
            setMenuItems(menuList);
        } catch (error) {
            console.error("Error al obtener menús por roles:", error);
        }
    };

        fetchMenus();
    }, [user,token]);

    const renderMenu = () => {
        return menuItems.map(item => {
        const IconComponent = Icons[item.icon];
        return {
            key: item.path,
            icon: IconComponent ? <IconComponent /> : null,
            label: item.title,
        };
        });
    };

    return (
        <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={({ key }) => navigate(key)}
        items={renderMenu()}
        style={{ height: '100%', borderRight: 0 }}
        />
    );
};

export default MenuComponents;