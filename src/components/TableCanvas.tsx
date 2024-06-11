import { useRef, useState } from "react"
import { HexColorPicker } from "react-colorful";
import ColorPicker from "./ColorPicker";
import colorPickerCursor from '../assets/colorpicker.png';


const tableSize: number = 16
const rectWidth: number = 30
const rectHeight: number = 30

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
    const isPicker = useRef(false)
    const [color, setColor] = useState("#aabbcc");

    function createCanvas() {
        elements.current = createSquares()

        const canvas = document.querySelector("canvas")
        const $ = canvas!.getContext("2d");
        if ($ == null) {
            return
        }

        // TODO: вычислять ширину и высоту в зависимости от экрана
        $.clearRect(0, 0, tableSize * rectWidth, tableSize * rectHeight);

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

    function drawTable(stroked: boolean = true) {
        const canvas = document.querySelector("canvas")
        const $ = canvas!.getContext("2d");
        if ($ == null) {
            return
        }

        // TODO: вычислять ширину и высоту в зависимости от экрана
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
        // const colorPickerCursor = 'src/assets/colorpicker.png'
        canvas!.style.cursor = `url(${colorPickerCursor}), auto`
    }

    function getImage(canvas: any){
        drawTable(false)
        var imageData = canvas.toDataURL();
        var image = new Image();
        image.src = imageData;
        return image;
    }
     
    function saveImage(image: any) {
        var link = document.createElement("a");
     
        link.setAttribute("href", image.src);
        link.setAttribute("download", "canvasImage");
        link.click();
    }
     
    function saveCanvasAsImageFile(){
        var image = getImage(document.getElementById("canvas"));
        saveImage(image);
    }


    return (
        <div 
        className="table" 
        style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
        }}
        >
            <div style={{display: "flex", margin: "3%"}}>
                <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    margin: "3%"
                }}
                >
                    <button onClick={createCanvas}>Создать новый канвас</button>
                    <button onClick={saveCanvasAsImageFile}>Скачать результат</button>
                    <ColorPicker onClick={activatePicker}></ColorPicker>
                </div>

                <HexColorPicker color={color} onChange={setColor} />
            </div>

            <canvas 
            width={tableSize * rectWidth} 
            height={tableSize * rectHeight}
            id="canvas"
            onClick={select}
            style={{
                borderRadius: "3%",
                cursor: "crosshair",
                }}
            >
            </canvas>

        </div>
    )
}