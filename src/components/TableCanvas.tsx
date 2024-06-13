import { useRef, useState } from "react"
import { HexColorPicker } from "react-colorful";
import ColorPicker from "./ColorPicker";
import calculateSize from "../scripts/calculateSize";
import DownloadButton from "./downloadButton";


const tableSize: number = 16 // количество ячеек в ширину
let rectWidth: number = calculateSize() // размер ячейки
let rectHeight: number = rectWidth

class Square {
    x: number;
    y: number;
    color: string;
    isSelected: boolean;
    
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.color = "#c74e4e"
        this.isSelected = false
    }
    
}

function createSquares(): Square[] {
    const elements: Square[] = []
    

    for (let y = 0; y < tableSize; y++) {
        for (let x = 0; x < tableSize; x++) {
            elements.push(new Square(x* rectWidth, y* rectHeight));
        }
    }
    
    return elements
}

export default function TableCanvas() {
    const elements = useRef(createSquares())
    const [rectSize, serRectSize] = useState(rectWidth)
    const isPicker = useRef(false)
    const [color, setColor] = useState("#aabbcc");

    function createCanvas() {
        rectWidth = calculateSize()
        rectHeight = rectWidth
        serRectSize(rectWidth)

        elements.current = createSquares()

        const canvas = document.querySelector("canvas")
        const $ = canvas!.getContext("2d");
        if ($ == null) {
            return
        }

        // TODO: вычислять ширину и высоту в зависимости от экрана
        $.clearRect(0, 0, canvas!.width, canvas!.height);

        elements.current.map((element: Square) => {
            $.beginPath();
            $.rect(element.x, element.y, rectWidth, rectHeight);
            $.fillStyle = element.color;
            $.lineWidth = 1;
            $.strokeStyle = "rgba(0,0,0,.4)"; // borderColor
            $.fill();
            $.stroke();
        })
    }

    function select(e: any) {
        const canvas = document.querySelector("canvas")

        // canvas!.addEventListener('mousemove', () =>{console.log("ddd") handleMouseMove})

        let clickX = e.pageX - canvas!.offsetLeft,
            clickY = e.pageY - canvas!.offsetTop;
        
        console.log(clickX, clickY)
        elements.current.map((element) => {
            if (
                clickX > element.x &&
                clickX < element.x + rectWidth &&
                clickY > element.y &&
                clickY < element.y + rectHeight
            ) {
                if (isPicker.current == true) {
                    setColor(element.color)
                    isPicker.current = false
                    canvas!.style.cursor = "crosshair"
                    return
                }

                const backColor = element.color
                if (element.isSelected == false) {
                    element.isSelected = true;
                    element.color = color;
                } else {
                    element.isSelected = false;
                    element.color = backColor;
                }
            }
        })
        drawTable();
    }

// TODO: сделать покраску сразу нескольких блоков при зажатии
    // function handleMouseMove(event: any) {
    //     console.log('move')
    // }

    // function removeMouseMoveListner(event: any) {
    //     const canvas = document.querySelector("canvas")
    //     canvas!.removeEventListener('mousemove', handleMouseMove)
    // }

    function drawTable(stroked: boolean = true) {
        const canvas = document.querySelector("canvas")
        const $ = canvas!.getContext("2d");
        if ($ == null) {
            return
        }

        $.clearRect(0, 0, tableSize * rectWidth, tableSize * rectHeight);

        elements.current.map((element: Square) => {
            $.beginPath();
            $.rect(element.x, element.y, rectWidth, rectHeight);
            $.fillStyle = element.color;
            $.lineWidth = 1;
            $.strokeStyle = "rgba(0,0,0,.4)"; // borderColor
            $.fill();
            if (stroked == true) {
                $.stroke();
            }
        })
    }

    function activatePicker() {
        isPicker.current = true
        const canvas = document.querySelector("canvas")
        canvas!.style.cursor = `url("../assets/colorpicker.png"), auto`
    }

    

    return (
        <div 
        className="table" 
        style={{
            display: "flex",
            placeItems: "center",
            flexDirection: "column",
        }}
        >
            <div 
            style={{
                display: "flex",
                justifyContent: "space-around",
                placeItems: "center",
            }}
            >
                <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    margin: "3%"
                }}
                className="container"
                >
                    <button 
                    onClick={createCanvas}
                    >
                        Создать новый канвас
                    </button>
                    <DownloadButton drawTable={drawTable}/>
                    <ColorPicker onClick={activatePicker}></ColorPicker>
                </div>

                <HexColorPicker color={color} onChange={setColor} />
            </div>

            <canvas 
            // onMouseUp={removeMouseMoveListner}
            width={tableSize * rectSize} 
            height={tableSize * rectSize}
            id="canvas"
            onClick={select}
            style={{
                borderRadius: "0.5em",
                cursor: "crosshair",
                }}
            >
            </canvas>

        </div>
    )
}