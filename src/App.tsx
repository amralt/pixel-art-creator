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
        // width: '15em'
      }}
      >
        <p>Pixel art creator</p>
        <ThemeIcon></ThemeIcon>  
      </nav>
      <TableCanvas></TableCanvas>
    </>
  )
}

export default App
