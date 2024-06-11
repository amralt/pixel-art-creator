
interface ColorPickerProps {
    onClick: () => void; // Assuming onClick is a function that takes no arguments and returns nothing
}

export default function ColorPicker({onClick} : ColorPickerProps) {

    function activatePicker() {
        onClick()
    }

    return (
        <button onClick={activatePicker}>
            <img src="src\assets\colorpicker.png" alt="пипетка" width={"30px"}/>
        </button>
    )
}