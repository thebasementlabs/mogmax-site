import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Landing from './pages/Landing'
import CreatorTools from './pages/CreatorTools'
import CleanRatingsTemplate from './pages/CleanRatingsTemplate'
import RatingsTemplate from './pages/RatingsTemplate'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/creator" element={<CreatorTools />} />
        <Route path="/creator/clean-ratings-template" element={<CleanRatingsTemplate />} />
        <Route path="/creator/ratings-template" element={<RatingsTemplate />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
