type OnMiniCallBack = () => void;
type OnMaxUnmaxCallBack = () => void;
type OnCloseCallBack = () => void;
type OnMenuBtnClickCallBack = () => void;
class MenuItem {
    public IsSpliter: boolean = false;
    public ItemName: string = '';
    public shotCut: string = '';
    public OnBtnClick: OnMenuBtnClickCallBack = () => { };
}
class Menus {
    public MenuTitle: string = '';
    public MenuItems: Array<MenuItem> = [];
}
class MenuList extends React.Component {
    props: any;
    constructor(props: any) {
        super(props);
        this.props = props;
    }
    render() {
        return <div className="menu_button h_gy">
            {this.props.MenuTitle}
            <ul className="menu_list">{
                this.props.MenuItems.map((item: MenuItem, index: number) => item.IsSpliter ?
                    <div key={index} className="split"></div> :
                    <li key={index}>
                        <a onClick={item.OnBtnClick}>{item.ItemName}<span className="right_item_text">{item.shotCut}</span></a>
                    </li>
                )
            }
            </ul>
        </div>
    }
}
class TitleBar extends React.Component {
    props;
    constructor(props:
        {
            Menu: Array<Menus>, WindowTitle: string, IconUrl: string,
            onMini: OnMiniCallBack,
            onMaxUnmax: OnMaxUnmaxCallBack,
            onClose: OnCloseCallBack,
            MiniBtnClassNames: string,
            MaxUnmaxBtnClassNames: string,
            CloseBtnClassNames: string,
        }) {
        super(props);
        this.props = props;
    }
    render() {
        return <div>
            <div className="window_title_bar">
                {/* <!-- 左上角logo区域 --> */}
                <div className="logo_icon content_center">
                    <img className="logo_icon_img" src={this.props.IconUrl} alt="" />
                </div>
                {/* <!-- 菜单区域 --> */}
                <div className="menu_bar">{
                    this.props.Menu.map((menu, index) => <MenuList key={index} MenuTitle={menu.MenuTitle} MenuItems={menu.MenuItems} ></MenuList>)
                }

                </div>
                {/* <!-- 标题文字区域 --> */}
                <div className="title_text content_center drag_area">{this.props.WindowTitle}</div>
                {/* <!-- 窗口按钮区域 --> */}
                <div className="window_buttons">
                    <a onClick={() => {
                        this.props.onMini()
                    }} className={"win_btn h_gy content_center " + this.props.MiniBtnClassNames}>
                    </a>
                    <a onClick={() => {
                        this.props.onMaxUnmax()
                    }} className={"win_btn h_gy content_center " + this.props.MaxUnmaxBtnClassNames}>
                    </a>
                    <a onClick={() => {
                        this.props.onClose()
                    }} className={"win_btn h_gy content_center " + this.props.CloseBtnClassNames}>
                    </a>
                </div>
            </div>
        </div >;
    }
}
// 需要React fontawesome支持
// Demo :
// ReactDOM.render(
//     <TitleBar Menu={[{
//         MenuTitle: "文件",

//         MenuItems: [{
//             ItemName: '打开',
//             shotCut: 'Ctrl + O',
//             OnBtnClick: () => { console.log('click') }
//         },
//         {
//             ItemName: '退出',
//             shotCut: 'Ctrl + E',
//             OnBtnClick: () => { console.log('click') }
//         }
//         ]
//     },
//     {
//         MenuTitle: "编辑",

//         MenuItems: [{
//             ItemName: '设置',
//             shotCut: '',
//             OnBtnClick: () => { console.log('click') }
//         },
//         {
//             ItemName: '查找',
//             shotCut: 'Ctrl + F',
//             OnBtnClick: () => { console.log('click') }
//         },
//         {
//             IsSpliter: true,
//         },
//         {
//             ItemName: '撤销',
//             shotCut: 'Ctrl + E',
//             OnBtnClick: () => { console.log('click') }
//         },
//         {
//             ItemName: '黏贴',
//             shotCut: 'Ctrl + E',
//             OnBtnClick: () => { console.log('click') }
//         }
//         ]
//     },
//     ]}
//         WindowTitle="zzz"
//         IconUrl=""
//         onMini={() => { console.log('mini') }}
//         onMaxUnmax={() => { console.log('max') }}
//         onClose={() => { console.log('close') }}
//         MiniBtnClassNames="fa fa-minus"
//         MaxUnmaxBtnClassNames="fa fa-window-maximize"
//         CloseBtnClassNames="fa fa-times"
//     ></TitleBar>,
//     document.getElementById('example')
// );
