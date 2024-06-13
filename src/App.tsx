import './App.css'
import TableCanvas from './components/TableCanvas'
import ThemeIcon from './components/ThemeIcon'

function App() {
  
  return (
    <>
      <nav
      // className='grid'

      style={{
        margin: "auto",
        marginBottom: "2em",
        marginTop: "0",
        display: "flex",
        height: "3em"
        // width: '15em'
      }}
      >
        <p>
          <img src="pixel-art-creator/icon.png" alt="" style={{width:"3em", marginRight: "0.3em"}}/>
           Pixel art creator
        </p>
        <ThemeIcon></ThemeIcon>  
      </nav>
      <TableCanvas></TableCanvas>
    </>
  )
}

export default App
