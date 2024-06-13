export default function calculateSize() {
    // let size: number = 0

    const windowSize = Math.min(window.innerWidth, window.innerHeight)
    if (windowSize > 1000) { 
        return 40
    } else if( windowSize > 500) {
        return 30
    } else {
        return 20
    }
}