import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TestComponent from "./components/TestComponent/TestComponent";
import Header from './components/Header';
import Home from './components/Home';
import Meals from './components/Meals';
import MealDetails from "./components/MealDetails";
import AddMeal from './components/AddMeal';
import Footer from './components/Footer';

function App() {
  return (

    <Router>
      <Header />
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/meals">
        <Meals />
      </Route>
      <Route path='/meals/:id'>
        <MealDetails />
      </Route>
      <Route exact path="/addMeal">
        <AddMeal />
      </Route>
      <Route exact path="/test-component">
        <TestComponent></TestComponent>
      </Route>
      <Footer />
    </Router>
  );
}

export default App;
