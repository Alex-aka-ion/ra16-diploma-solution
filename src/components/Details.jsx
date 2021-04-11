import React, {useState} from "react";
import {useParams} from 'react-router-dom';
import useFetch from "../hooks/useFetch";
import Spinner from "./Spinner";
import {addToCart} from "../actions/actionCreators";
import {useDispatch} from "react-redux";
import {useHistory} from 'react-router-dom';

export default function Details() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const [quantity, setQuantity] = useState(1);
    const [selected, setSelected] = useState(null);

    const handleDecrease = () => {
        if (quantity > 1)
            setQuantity(quantity - 1);
    }

    const handleIncrease = () => {
        if (quantity < 10)
            setQuantity(quantity + 1);
    }

    const handleSelected = (size) => {
        setSelected(size);
    }

    const handleAddToCart = (id, size, price, quantity, title) => {
        dispatch(addToCart(id, size, price, quantity, title));
        history.push('/cart.html');
    }

    const [item, loading, error] = useFetch(`items/${id}`, null);

    if (loading)
        return <section className="catalog-item"><Spinner/></section>;

    if (error)
        return <section className="catalog-item">
            <div className="text-center">{error}</div>
        </section>;

    if (!item)
        return null;

    const {title, price, images = [], sizes = [], sku = '', manufacturer = '', color = '', material = '', reason = '', season = ''} = item;

    return (
        <section className="catalog-item">
            <h2 className="text-center">{title}</h2>
            <div className="row">
                <div className="col-5">
                    <img src={images[0]}
                         className="img-fluid" alt={title}/>
                </div>
                <div className="col-7">
                    <table className="table table-bordered">
                        <tbody>
                        <tr>
                            <td>Артикул</td>
                            <td>{sku}</td>
                        </tr>
                        <tr>
                            <td>Производитель</td>
                            <td>{manufacturer}</td>
                        </tr>
                        <tr>
                            <td>Цвет</td>
                            <td>{color}</td>
                        </tr>
                        <tr>
                            <td>Материалы</td>
                            <td>{material}</td>
                        </tr>
                        <tr>
                            <td>Сезон</td>
                            <td>{season}</td>
                        </tr>
                        <tr>
                            <td>Повод</td>
                            <td>{reason}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="text-center">
                        <p>Размеры в наличии: {sizes
                            .filter(o => o.avalible)
                            .map(o => <span key={o.size}
                                            className={`catalog-item-size${o.size === selected ? ' selected' : ''}`}
                                            onClick={() => handleSelected(o.size)}>{o.size}</span>)}</p>
                        {sizes && sizes.length > 0 && <p>Количество: <span className="btn-group btn-group-sm pl-2">
                                        <button className="btn btn-secondary" onClick={handleDecrease}>-</button>
                                        <span className="btn btn-outline-primary">{quantity}</span>
                                        <button className="btn btn-secondary" onClick={handleIncrease}>+</button>
                                    </span></p>}
                        <p>Цена: {price} руб.</p>
                    </div>
                    {sizes.length > 0 &&
                    <button className="btn btn-danger btn-block btn-lg" disabled={!selected}
                            onClick={() => handleAddToCart(id, selected, price, quantity, title)}>В корзину</button>
                    }
                </div>
            </div>
        </section>
    )

}
