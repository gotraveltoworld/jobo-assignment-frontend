import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import PatientsList from './components/PatientsList'
import AlertDialogSlide from './components/AlertDialogSlide'

const App = () => {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" exact element={<PatientsList />} />
      </Routes>
      <AlertDialogSlide />
    </Router>
  )
}

export default App
