import React from 'react';
import { connect } from 'dva';

import {Table, Divider, Tag, Pagination } from 'antd';

const {Column} = Table;

const namespace = 'userList';

@connect((state)=>{
    return {
        data : state[namespace].list
    }
}, (dispatch) => {
    return {
        initData : () => {
            dispatch({
                type: namespace + "/initData"
            });
        }
    }
})
class UserList extends React.Component {

    componentDidMount(){
        this.props.initData();
    }

    render() {
        return (
            <div>
                <Table dataSource={this.props.data} pagination={{position:"bottom",total:500,pageSize:10, defaultCurrent:3}}>
                    <Column
                        title="姓名"
                        dataIndex="name"
                        key="name"
                    />
                    <Column
                        title="年龄"
                        dataIndex="age"
                        key="age"
                    />
                    <Column
                        title="地址"
                        dataIndex="address"
                        key="address"
                    />
                    <Column
                        title="标签"
                        dataIndex="tags"
                        key="tags"
                        render={tags => (
                            <span>
                                {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
                            </span>
                        )}
                    />
                    <Column
                        title="操作"
                        key="action"
                        render={(text, record) => (
                            <span>
                                <a href="javascript:;">编辑</a>
                                <Divider type="vertical"/>
                                <a href="javascript:;">删除</a>
                            </span>
                        )}
                    />
                </Table>
            </div>
        );
    }

}

export default UserList;