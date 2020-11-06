// 需要传入的属性
type Tab_t = {
    // 内容的jsx/tsx
    TabItemView: JSX.Element,
    // tab名字，是唯一的
    TabItemName: string,
    // tab按钮的jsx/tsx，可空，如果空，自动显示tab名字
    TabItemNameView?: JSX.Element,
    // tab内容外框的class
    TabItemViewClassNames: string,
    // tab按钮的class
    TabItemNameClassNames: string
}
type TabCompProps = {
    // 定义tab数组
    Tabs: Array<Tab_t>
    // 初始能看见的tab名字
    InitVisibleTabName: string,
    TabBarSelectedClassNames: string,
    TabBarUnslectedClassNames: string
}

// 组件
class TabComp extends React.Component<TabCompProps, { TabStyles: any, Tabs: Array<Tab_t>, SelectedTabName: string }> {
    // props: TabCompProps;
    TabStyles: any = {};
    constructor(prop: TabCompProps) {
        super(prop);
        // this.props = prop;

        this.state = {
            TabStyles: this.setTabVisible(this.props.InitVisibleTabName),
            Tabs: prop.Tabs,
            SelectedTabName: prop.InitVisibleTabName
        };
    }

    // 通过TabName指定目前可见的tab
    setTabVisible(visibleName: string) {
        for (let i in this.props.Tabs) {

            this.TabStyles[this.props.Tabs[i].TabItemName] = { display: "none" };
        }
        this.TabStyles[visibleName] = { display: "inline-block" };
        return this.TabStyles;
    }
    render() {
        return <div>
            {/* tabBar */}
            <ul className="tab_btn_list" >
                {/* tab切换按钮 */}
                {
                    this.state.Tabs.map((item, index) => {
                        return <li key={index} className="tab_btn_item horz_item">
                            <span
                                // 样式
                                className={
                                    item.TabItemNameClassNames + " " +
                                    (
                                        this.state.SelectedTabName == item.TabItemName ?
                                            this.props.TabBarSelectedClassNames :
                                            this.props.TabBarUnslectedClassNames
                                    )}
                                // 点击事件
                                onClick={() => {
                                    this.setState({
                                        TabStyles: this.setTabVisible(item.TabItemName),
                                        SelectedTabName: item.TabItemName
                                    });
                                }}>
                                {item.TabItemNameView ? item.TabItemNameView : item.TabItemName}
                            </span>
                        </li>
                    })
                }
            </ul>
            < ul className="tab_view_list" >
                {/* tab内容 */}
                {
                    this.state.Tabs.map((item, index) => {
                        return <li key={index}
                            // 样式
                            className="tab_view_item horz_item"
                            // 控制是否可见
                            style={this.state.TabStyles[item.TabItemName]} >
                            <div className={"tab_view_item " + item.TabItemViewClassNames} >
                                {/* 内容 */}
                                {item.TabItemView}
                            </div>
                        </li>;
                    })
                }
            </ul>
        </div>;
    }
}

// // import ReactDOM from 'react-dom';
// // 需要React 
// // Demo
// ReactDOM.render(
//     <TabComp Tabs={
//         [
//             {
//                 TabItemView: <div style={
//                     {
//                         background: "#0f0",
//                         height: "200px",
//                         width: "200px"
//                     }
//                 }></div>,
//                 TabItemNameView: <u>zzz</u>,
//                 TabItemName: "tab1",
//                 TabItemViewClassNames: "",
//                 TabItemNameClassNames: "tab_btn_m"
//             },
//             {
//                 TabItemView: <div style={
//                     {
//                         background: "#00f",
//                         height: "200px",
//                         width: "200px"
//                     }
//                 }></div>,
//                 TabItemName: "tab2",
//                 TabItemViewClassNames: "",
//                 TabItemNameClassNames: "tab_btn_m"
//             },
//             {
//                 TabItemView: <div style={
//                     {
//                         background: "#ff0",
//                         height: "200px",
//                         width: "200px"
//                     }
//                 }></div>,
//                 TabItemName: "tab13",
//                 TabItemViewClassNames: "",
//                 TabItemNameClassNames: "tab_btn tab_btn_m"
//             }
//         ]
//     } InitVisibleTabName={"tab1"} TabBarSelectedClassNames={"tab_btn_selected"} TabBarUnslectedClassNames={"tab_btn_unselected"} ></TabComp>,
//     document.getElementById('tab_comp')
// );