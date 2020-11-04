/**
 * 数据类型，至少包含一个id属性
 */
type DataType = { id: string } | any;
/**
 * 组件属性
 */
type CURDTableProp = {
    tableData: {
        /**
        * 表头名，必须在datas中有
        */
        datatitles: string[],
        /**
         * 表数据，包含表头中的名字，没有的不显示
         * 注意，必须至少包含一个id属性
         */
        datas: DataType[],
    }

    /**
     * 增加数据的回调，可以增加多个数据，返回新的所有数据
     */
    onAdd: () => DataType[],
    /**
     * 删除数据的回调，可以删除多个数据，传入需要删除的数据，返回新的所有数据
     */
    onDelete: (deleteData: DataType[]) => DataType[],
    /**
     * 修改数据的回调，传入需要修改的数据，返回新的所有数据
     */
    onModify: (modifyData: DataType[]) => DataType[],
    /**
     * 增加数据的jsx
     */
    addBtnJSX: JSX.Element,
    /**
     * 删除的jsx
     */
    deleteBtnJSX: JSX.Element,
    /**
     * 修改数据的jsx
     */
    modifyBtnJSX: JSX.Element,

}
type checker = {
    id: string,
    checked: boolean
};
type CURDTableStatus = {
    Props: CURDTableProp,
    checks: checker[]
}
class CURDTable extends React.Component<CURDTableProp, CURDTableStatus> {
    // 一个随机字符串
    tableRandomStr: string;
    // 表的随机id
    tableID: string;
    // 每行复选框的随机类名
    tableDataCheckClassName: string;

    constructor(p: CURDTableProp) {
        super(p);
        // 初始化state
        let tableChecks: checker[] = [];
        for (let i in p.tableData.datas) {
            tableChecks.push({
                id: p.tableData.datas[i].id,
                checked: false
            });
        }
        this.state = {
            Props: p,
            checks: tableChecks
        };
        this.tableRandomStr = (Math.floor(Math.random() * (5000 - 100)) + 100).toString();
        this.tableID = "tableselctedall" + this.tableRandomStr;
        this.tableDataCheckClassName = "tableDataCheck" + this.tableRandomStr;
    }
    isInArry(item: string, arry: string[]) {
        arry.forEach(s => {
            if (s == item) {
                return true;
            }
        })
        return false;
    }
    getDatasFromIDS(IDs: string[]) {
        let resData: DataType[] = [];
        IDs.forEach(id => {
            this.state.Props.tableData.datas.forEach(item => {
                if (id == item.id) {
                    resData.push(item);
                }
            })
        })
        return resData;
    }
    getCheckedIDS() {
        let resIDs: string[] = [];

        this.state.checks.forEach(item => {
            if (item.checked) {
                resIDs.push(item.id);
            }
        });
        return resIDs;
    }
    render() {
        return <table>
            {/* 第一行 */}
            <thead>
                <tr>
                    {/* 多选复选框 */}
                    <th>
                        <input
                            // 全选
                            onChange={() => {
                                const ischecked = (document.getElementById(this.tableID) as HTMLInputElement).checked;

                                const cks = document.getElementsByClassName(this.tableDataCheckClassName);
                                for (let i = 0; i < cks.length; i++) {
                                    (cks[i] as HTMLInputElement).checked = ischecked;
                                }
                                this.state.checks.forEach((c) => {
                                    c.checked = ischecked;
                                })

                            }}
                            id={this.tableID}
                            type="checkbox"></input>
                    </th>
                    {

                        // 表头
                        this.state.Props.tableData.datatitles.map((titlename, index) => {
                            return <th key={index}>
                                {titlename}
                            </th>
                        })
                    }
                    {/* 多选操作 */}
                    <th>
                        <span
                            onClick={() => {
                                this.state.Props.tableData.datas = this.props.onAdd();
                                this.setState(this.state);
                            }}>{this.props.addBtnJSX}</span>

                        <span
                            onClick={() => {
                                this.state.Props.tableData.datas = this.props.onDelete(this.getDatasFromIDS(this.getCheckedIDS()));
                                this.setState(this.state);
                            }}>{this.props.deleteBtnJSX}</span>

                        <span
                            onClick={() => {
                                this.state.Props.tableData.datas = this.props.onModify(this.getDatasFromIDS(this.getCheckedIDS()));
                                this.setState(this.state);
                            }}>{this.props.modifyBtnJSX}</span>
                    </th>
                </tr>

            </thead>
            <tbody>

                {/* 数据行 */}
                {

                    this.state.Props.tableData.datas.map((data, index) => {
                        return <tr key={index}>
                            {/* 每行的复选框 */}
                            <td>
                                <input
                                    onChange={() => {
                                        this.state.checks[index].checked = !this.state.checks[index].checked;
                                    }}
                                    className={this.tableDataCheckClassName}
                                    type="checkbox"></input>
                            </td>
                            {
                                // 列，单元格
                                this.state.Props.tableData.datatitles.map((titlenames, cellIndex) => {
                                    return <td key={cellIndex}>{data[titlenames]}</td>
                                })
                            }
                            {/* 每行的曾删改操作 */}
                            <td>
                                <span
                                    onClick={() => {
                                        this.state.Props.tableData.datas = this.props.onAdd()
                                        this.setState(this.state);
                                    }}>{this.props.addBtnJSX}</span>

                                <span
                                    onClick={() => {
                                        this.state.Props.tableData.datas = this.props.onDelete([data])
                                        this.setState(this.state);
                                    }}>{this.props.deleteBtnJSX}</span>

                                <span
                                    onClick={() => {
                                        this.state.Props.tableData.datas = this.props.onModify([data])
                                        this.setState(this.state);
                                    }}>{this.props.modifyBtnJSX}</span>

                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    }

}

// Demo 
// 无CSS，需要样式请自行修改
// ReactDOM.render(
//     <CURDTable
//         tableData={
//             {
//                 datas: [{
//                     name: "n1",
//                     id: "1",
//                     age: 18,
//                     job: "fi"
//                 },
//                 {
//                     name: "n2",
//                     id: "2",
//                     age: 118,
//                     job: "fi"
//                 },
//                 {
//                     name: "n3",
//                     id: "3",
//                     age: 1,
//                     job: "fi"
//                 }],
//                 //需要显示的数据
//                 datatitles: ["name", "age", "job"]
//             }
//         }
//         onAdd={() => {
//             return [{
//                 name: "n1",
//                 id: "1",
//                 age: 18,
//                 job: "fi"
//             }];
//         }}
//         onDelete={(d) => {
//             console.log(d);
//             return [{
//                 name: "n1",
//                 id: "1",
//                 age: 18,
//                 job: "fi"
//             },
//             {
//                 name: "n2",
//                 id: "2",
//                 age: 118,
//                 job: "fi"
//             }];
//         }}
//         onModify={(d) => {
//             console.log(d);
//             return [];
//         }}
//         addBtnJSX={<div>添加</div>}
//         deleteBtnJSX={<div>删除</div>}
//         modifyBtnJSX={<div>修改</div>}
//     ></CURDTable>,
//     document.getElementById('table')
// );