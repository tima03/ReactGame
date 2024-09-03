import React from "react";

export default class CanvasComponent extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.handleMouseMove = this.handleMouseMove.bind(this);
    }

    componentDidMount() {
        this.props.onMount(this.canvasRef.current); // Передаем canvas в Game после его монтирования
        window.addEventListener("mousemove", this.handleMouseMove);
    }

    componentWillUnmount() {
        window.removeEventListener("mousemove", this.handleMouseMove);
    }

    handleMouseMove(event) {
        const rect = this.canvasRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        this.props.onMouseMove({ x, y });
    }

    render() {
        return (
            <canvas
                ref={this.canvasRef}
                width={this.props.width}
                height={this.props.height}
                style={{ backgroundColor: "white", display: "block" }}
                onClick={this.props.onClick}
            />
        );
    }
}
