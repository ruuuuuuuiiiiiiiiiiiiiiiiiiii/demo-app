import './App.css'
import GenreComponent from './components/Genre/GenreComponent'
import MovieComponent from './components/Movie/MovieComponent'
import CustomerComponent from './components/Customer/CustomerComponent'
import RentalComponent from './components/Rental/RentalComponent'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListGenreComponent from './components/Genre/ListGenreComponent'
import ListMovieComponent from './components/Movie/ListMovieComponent'
import ListCustomerComponent from './components/Customer/ListCustomerComponent'
import ListRentalComponent from './components/Rental/ListRentalComponent'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import DashboardComponent from './components/DashboardComponent'

function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
          <Routes>
            <Route 
              path='/' 
              element = { <DashboardComponent /> } 
            />
            <Route 
              path='/dashboard' 
              element = 
                { 
                  <DashboardComponent />
                } 
            />
            {/* Genre */}
            <Route 
              path='/genres' 
              element = 
                { 
                  <ListGenreComponent />
                } 
            />
            <Route 
              path='/add-genre' 
              element = 
                { 
                  <GenreComponent />
                } 
            />
            <Route 
              path='/edit-genre/:id' 
              element = 
                { 
                  <GenreComponent />
                } 
            />
            {/* Movie */}
            <Route 
              path='/movies' 
              element = 
                { 
                  <ListMovieComponent />
                } 
            />
            <Route 
              path='/add-movie' 
              element = 
                { 
                  <MovieComponent />
                } 
            />
            <Route 
              path='/edit-movie/:id' 
              element = 
                { 
                  <MovieComponent />
                } 
            />
            {/* Customer */}
            <Route 
              path='/customers' 
              element = 
                { 
                  <ListCustomerComponent />
                } 
            />
            <Route 
              path='/add-customer' 
              element = 
                { 
                  <CustomerComponent />
                } 
            />
            <Route 
              path='/edit-customer/:id' 
              element = 
                { 
                  <CustomerComponent />
                } 
            />
            {/* Rental */}
            <Route 
              path='/rentals' 
              element = 
                { 
                  <ListRentalComponent />
                } 
            />
            <Route 
              path='/add-rental' 
              element = 
                { 
                  <RentalComponent />
                } 
            />
            <Route 
              path='/edit-rental/:id' 
              element = 
                { 
                  <RentalComponent />
                } 
            />
          </Routes>
        {/* <FooterComponent /> */}
      </BrowserRouter>
    </>
  )
}

export default App
