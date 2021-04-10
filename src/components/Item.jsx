import {Link} from "react-router-dom";
import React from "react";

export default function Item(props) {
    const {id, title, price, images} = props.item;

    return (
        <div className="col-4">
            <div className="card catalog-item-card">
                <img src={images[0]}
                     className="card-img-top img-fluid" alt={title}/>
                <div className="card-body">
                    <p className="card-text">{title}</p>
                    <p className="card-text">{price} руб.</p>
                    <Link to={`/catalog/${id}.html`} className="btn btn-outline-primary">Заказать</Link>
                </div>
            </div>
        </div>
    );
}
