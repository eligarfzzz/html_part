type LoadSwitchRef = {
    /**
     * 组件实例指针，用于设置是否增在加载中
     * instPtr.isLoading = true //设为加载中
     * instPtr.isLoading = false //设为加载完毕
     */
    instPtr?: Loadingswitch,
    /**
     * domRef.current 获取组件dom引用
     */
    domRef?: React.RefObject<HTMLDivElement>
}
type LoadingProp = {
    /**
     * 加载中时显示的jsx
     */
    loading: JSX.Element,
    /**
     * 加载完后显示的jsx
     */
    loaded: JSX.Element,
    /**
     * 组件的实例引用，可用于设置加载状态
     */
    refPtr: LoadSwitchRef,
    /**
     * 初始加载状态
     */
    initIsloading: boolean
}
type LoadingState = {
    isLoading: boolean,
}
class Loadingswitch extends React.Component<LoadingProp, LoadingState> {
    constructor(p: LoadingProp) {
        super(p);
        this.props.refPtr.domRef = React.createRef();
        this.props.refPtr.instPtr = this;

        this.state = { isLoading: this.props.initIsloading }
    }

    public set isLoading(v: boolean) {
        this.setState({ isLoading: v });
    }

    public get isLoading(): boolean {
        return this.state.isLoading;
    }

    private getHideStyle(isHide: boolean): React.CSSProperties {
        return isHide ?
            {
                display: "none"
            } : {
                display: "inline-block"
            };
    }

    render() {
        return <div ref={this.props.refPtr.domRef}>
            <div style={
                this.getHideStyle(this.isLoading)
            }> {this.props.loaded}</div>

            <div style={
                this.getHideStyle(!this.isLoading)
            }>{this.props.loading}</div>
        </div>
    }
}

// Demo:
// let refPtr: LoadSwitchRef = {
// };
// ReactDOM.render(
//     <Loadingswitch initIsloading={true} loading={<p>加载中</p>} loaded={<p>加载完成</p>} refPtr={refPtr}></Loadingswitch>,
//     document.getElementById('loading')
// )
// //模拟加载完成
// setTimeout(() => {
//     if (refPtr.instPtr != null) {
//         refPtr.instPtr.isLoading = false;
//     }
// }, 2000);