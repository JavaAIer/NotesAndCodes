export default {
    namespace: 'list',
    state: {
        data: [1, 2, 3],
        maxNum: 3
    },
    reducers: {
        addNewData(state) {
            //state是更新前的对象     
            let maxNum = state.maxNum + 1;
            let list = [...state.data, maxNum];
            return {
                // 返回更新后的state对象                 
                data: list,
                maxNum: maxNum
            }
        }
    }
}