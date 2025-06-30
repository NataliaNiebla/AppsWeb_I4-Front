import {Layout} from 'antd';
import { Header, Content, Footer } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import React from 'react';
import { Outlet } from 'react-router-dom';
import MenuComponents from '../MenuComponent';


function Dashboard() {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width= {220}>
                <MenuComponents/>
            </Sider>

            <Layout>
                <Header style={{ padding: 0 }} />
                <Content style={{ margin : '24px 16px 0', padding: 24, background: '#fff' }}>
                    <Outlet/>
                </Content>
                <Footer/>
            </Layout>
        </Layout>
    );
}

export default Dashboard;