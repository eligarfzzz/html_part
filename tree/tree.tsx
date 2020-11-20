type TreeDataList = {
  /**
   * 可空子数据
   */
  child?: Array<TreeDataList>;
  /**
   * 显示名称
   */
  name: string;
  /**
   * 点击事件
   */
  onClick: (name: string) => void;
  /**
   * 初始树张开状态
   */
  isExtend?: boolean;
  /**
   * 点击事件传入的参数，可空，若空，传入显示名称
   */
  clickID?: string;
};
/**
 * 属性
 */
type TreeProps = {
  /**
   * 数据
   */
  data: Array<TreeDataList>;
  /**
   *树张开时显示的内容
   */
  extendedElement?: JSX.Element;
  /**
   * 树关闭时显示的内容
   */
  unextendedElement?: JSX.Element;
};
type TreeState = {};
class TreeCmp extends React.Component<TreeProps, TreeState> {
  constructor(props: TreeProps) {
    super(props);
  }

  isItemExtend(item: TreeDataList) {
    return item.isExtend != null ? item.isExtend : true;
  }
  itemReverse(item: TreeDataList) {
    this.isItemExtend(item) ? (item.isExtend = false) : (item.isExtend = true);
    this.setState({});
  }

  showSpan(isExtended: boolean, prop: TreeProps) {
    return isExtended
      ? prop.extendedElement != null
        ? prop.extendedElement
        : "-"
      : prop.unextendedElement != null
      ? prop.unextendedElement != null
      : "+";
  }

  render() {
    return (
      <div>
        {this.props.data.map((item, key) => (
          <div key={key}>
            <a
              onClick={() => {
                this.itemReverse(item);
              }}
            >
              {this.showSpan(this.isItemExtend(item), this.props)}
            </a>
            <a
              onClick={() => {
                item.onClick(item.clickID ? item.clickID : item.name);
              }}
            >
              {item.name}
            </a>
            <ul
              style={
                this.isItemExtend(item)
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              {item.child?.map((itemchild, key) => (
                <li key={key}>
                  <TreeCmp data={[itemchild]}></TreeCmp>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
}
// // Demo
// // 自行添加css美化
// ReactDOM.render(
//   <TreeCmp
//     data={[
//       {
//         name: "fist",
//         onClick: (name) => {
//           console.log(name);
//         },
//         child: [
//           {
//             name: "f1",
//             onClick: (name) => {
//               console.log(name);
//             },
//           },
//           {
//             name: "f2",
//             onClick: (name) => {
//               console.log(name);
//             },
//           },
//           {
//             name: "f3",
//             onClick: (name) => {
//               console.log(name);
//             },
//           },
//           {
//             name: "f4",
//             onClick: (name) => {
//               console.log(name);
//             },
//             isExtend: false,
//             child: [
//               {
//                 name: "f1",
//                 onClick: (name) => {
//                   console.log(name);
//                 },
//               },
//               {
//                 name: "f2",
//                 onClick: (name) => {
//                   console.log(name);
//                 },
//               },
//               {
//                 name: "f3",
//                 onClick: (name) => {
//                   console.log(name);
//                 },
//               },
//               {
//                 name: "f4",
//                 onClick: (name) => {
//                   console.log(name);
//                 },
//               },
//             ],
//           },
//         ],
//       },
//     ]}
//   ></TreeCmp>,
//   document.getElementById("rea")
// );
