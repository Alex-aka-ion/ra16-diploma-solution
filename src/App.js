import './App.css';
import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from "./components/Header";
import Banner from "./components/Banner";
import TopSales from "./components/TopSales";
import Catalog from "./components/Catalog";
import About from "./components/About";
import Contacts from "./components/Contacts";
import Missed404 from "./components/Missed404";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import Details from "./components/Details";

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <main className="container">
                <div className="row">
                    <div className="col">
                        <Banner/>
                        <Switch>
                            <Route path="/" exact>
                                <TopSales/>
                                <Catalog showSearch={false}/>
                            </Route>
                            <Route path='/catalog.html'>
                                <Catalog showSearch={true}/>
                            </Route>
                            <Route path='/catalog/:id(\d+).html'>
                                <Details/>
                            </Route>
                            <Route path='/cart.html'>
                                <Cart/>
                            </Route>
                            <Route path='/about.html'>
                                <About/>
                            </Route>
                            <Route path='/contacts.html'>
                                <Contacts/>
                            </Route>
                            <Route path='*'>
                                <Missed404/>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </main>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
