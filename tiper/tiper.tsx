type TipProps = {
    /**
     * tip内容
     */
    tipContent: JSX.Element
}
type TipState = {
    /**
     * 是否需要显示
     */
    isInTiperSection: boolean,
    /**
     * 位置x
     */
    x: number,
    /**
     * 位置y
     */
    y: number
}
class TiperSection extends React.Component<TipProps, TipState>{
    constructor(props: TipProps) {
        super(props);
        this.state = {
            isInTiperSection: false,
            x: 0,
            y: 0
        };
    }
    moveTips(x: number, y: number) {
        this.setState({
            isInTiperSection: true,
            x: x,
            y: y
        })
    }
    stopTips() {
        this.setState({
            isInTiperSection: true,
        })
    }
    hideTips() {
        this.setState({
            isInTiperSection: false,
            x: 0,
            y: 0
        })
    }
    render() {
        return <span
            style={{
                position: "relative",
                display: "inline-block"
            }} >
            <span
                style={{
                    display: "inline-block"
                }}
                onMouseEnter={(e) => {
                    this.moveTips(e.clientX, e.clientY);
                }}
                onMouseMove={(e) => {
                    this.moveTips(e.clientX, e.clientY);
                }}
                onMouseLeave={(e) => {
                    this.hideTips();
                }}>{
                    this.props.children
                }</span>

            {
                <div
                    style={
                        this.state.isInTiperSection ? {
                            display: "inline-block",
                            position: "absolute",
                            left: this.state.x,
                            top: this.state.y
                        } : {
                                display: "none",
                                position: "absolute",
                                left: this.state.x,
                                top: this.state.y
                            }
                    }
                    onMouseMove={(e) => {
                        this.stopTips();
                        e.stopPropagation();
                    }}
                    onMouseEnter={(e) => {
                        this.moveTips(e.clientX, e.clientY);
                    }}
                    onMouseLeave={(e) => {
                        this.hideTips();
                    }}

                >
                    {
                        this.props.tipContent
                    }
                </div>
            }
        </span>;
    }
}

// ReactDOM.render(<TiperSection tipContent={
//     // tip内容
//     <div style={{ background: "#0f0", height: "100px", width: "100px" }}></div>
// } >
//     {/* 内容 */}
//     <div style={{ display: "inline-block", background: "#f00", height: "100px", width: "100px" }}></div>
// </TiperSection>,
//     document.getElementById('tiper')
// );