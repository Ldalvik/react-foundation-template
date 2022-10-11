import { BrowserRouter, Routes, Route } from "react-router-dom";
import UnknownPage from "./UnknownPage";
import HomePage from './HomePage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="*" element={<UnknownPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App