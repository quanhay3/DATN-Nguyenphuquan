import { RouterProvider } from 'react-router-dom'
import './App.css'
import privateRouter from './routers'

function App() {
  return (
    <>
      <RouterProvider router={privateRouter} />
    </>
  )
}

export default App
