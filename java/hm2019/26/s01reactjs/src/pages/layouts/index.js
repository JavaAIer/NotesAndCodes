import React from 'react';

import {Layout} from 'antd';
const { Header, Footer, Sider, Content } = Layout;

class BasicLayout extends  React.Component{
    render() {
        return (
                <Layout>
                    <Sider>Sider</Sider>
                    <Layout>
                        <Header>Header</Header>
                        <Content>
                            {
                                this.props.children
                            }

                        </Content>
                        <Footer>Footer</Footer>
                    </Layout>
                </Layout>

        );
    }
}

export  default  BasicLayout;