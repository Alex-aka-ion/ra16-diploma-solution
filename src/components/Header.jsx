import {Link} from "react-router-dom";
import SearchInHeader from "./SearchInHeader";
import MenuInHeader from "./MenuInHeader";
import React from "react";

export default function Header() {
    return (
        <header className="container">
            <div className="row">
                <div className="col">
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                        <Link className="navbar-brand" to="/">
                            <img src="/img/header-logo.png" alt="Bosa Noga"/>
                        </Link>

                        <div className="collapase navbar-collapse" id="navbarMain">
                            <MenuInHeader/>
                            <SearchInHeader/>
                        </div>
                    </nav>

                </div>
            </div>
        </header>

    );
}
