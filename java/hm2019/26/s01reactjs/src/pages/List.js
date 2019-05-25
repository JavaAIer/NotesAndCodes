import React from 'react';
import {connect} from 'dva';

const namespace = "list";

@connect((state) => {
        return {
            dataList: state [namespace].data,
            maxNum: state[namespace].maxNum
        }
    }, (dispatch) => {
        return {
            add: function () {
                dispatch({
                    //通过dispatch调用model中定义的函数，通过type属性，指定函数名，格式：namespace/函数名
                    type: namespace + "/addNewData"
                });
            }
        }
    }
)

class List extends React.Component {
    constructor(props) {
        super(props);


        /*  this.state={
              dataList:[1,2,3]
          }*/
    }

    render() {
        return (
            <div>
                <ul>
                    {
                        /*  this.state.dataList.map(
                              (value, index) => {
                                  return <li key={index}>{value}</li>
                              }
                          )*/
                        this.props.dataList.map((value, index) => {
                            return <li key={index}>{value}</li>
                        })
                    }
                </ul>
                <button onClick={() => {

                    this.props.add();
                    /*  let newArr = [...this.state.dataList, this.state.dataList.length + 1];

                      this.setState(
                          {
                              dataList: newArr
                          }
                      )*/
                }}>加1
                </button>
            </div>

        );
    }
}

export default List;