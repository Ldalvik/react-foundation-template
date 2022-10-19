import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './components/App'
import reportWebVitals from './tests/reportWebVitals'

//React toasts library 
import 'react-toastify/dist/ReactToastify.css'
//Foundation CSS
import 'foundation-sites/dist/css/foundation.min.css'

//Foundation SCSS
import './assets/app.scss'

//Your own SCSS
import './assets/index.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
