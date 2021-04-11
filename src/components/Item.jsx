import {Link} from "react-router-dom";
import React, {useState} from "react";

export default function Item(props) {
    const {id, title, price, images} = props.item;

    const [imgLink, setImgLink] = useState(images[0]);
    const [errored, setErrored] = useState(false);

    const handleError = (e) => {
        if (!errored) {
            setImgLink('/img/no-image.png');
            setErrored(true);
        }
    }

    return (
        <div className="col-4">
            <div className="card catalog-item-card">
                <img src={imgLink} onError={handleError}
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
