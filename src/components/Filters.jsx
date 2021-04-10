import React from "react";

export default function Filters({filters, selected, handleChangeFilter}) {
    return (
        <ul className="catalog-categories nav justify-content-center">
            {filters
                .map(o => <li key={o.id} className="nav-item">
                    <a className={`nav-link${o.id === selected ? ' active' : ''}`} href='#'
                       onClick={(e) => handleChangeFilter(e, o.id)}>{o.title}</a>
                </li>)}
        </ul>
    );
}
