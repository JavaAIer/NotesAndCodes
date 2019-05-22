import React from 'react';
import {connect} from 'dva';

const namespace = "list";

@connect((state) => {
    return {
        dataList: state [namespace].data,
        maxNum: state[namespace].maxNum
    }
})
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

                    let newArr = [...this.state.dataList, this.state.dataList.length + 1];

                    this.setState(
                        {
                            dataList: newArr
                        }
                    )
                }}>加1
                </button>
            </div>

        );
    }
}

export default List;