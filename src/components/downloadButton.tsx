import {useState} from 'react'




export default function DownloadButton({drawTable}:{ drawTable: (stroked:boolean) => void }) {
    const [isBusy, setIsBusy] = useState(false)

    function getImage(canvas: any){
        setIsBusy(true)

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
        
        //О боже, я опять делаю ненужную анимациюы
        setTimeout(() => {
            setIsBusy(false)
        }, 450)
        }
     
    function saveCanvasAsImageFile(){
        var image = getImage(document.getElementById("canvas"));
        saveImage(image);
    }


    return (
        <button onClick={saveCanvasAsImageFile} aria-busy={isBusy}>Скачать результат</button>
    )
}