import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {removeFromCart} from "../actions/actionCreators";
import React from "react";
import Order from "./Order";

export default function Cart() {
    const items = useSelector(state => state.cart);
    const dispatch = useDispatch();

    console.log('items in cart', items)
    const itemsSum = items.reduce((a, o) => a + o.price * o.quantity, 0);

    const handleDelete = (id, size) => {
        dispatch(removeFromCart(id, size));
    }

    return (
        <>
            <section className="cart">
                <h2 className="text-center">Корзина</h2>
                {items.length ? <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Название</th>
                        <th scope="col">Размер</th>
                        <th scope="col">Кол-во</th>
                        <th scope="col">Стоимость</th>
                        <th scope="col">Итого</th>
                        <th scope="col">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((o, i) => <tr key={o.id}>
                        <th scope="row">{i + 1}</th>
                        <td><Link to={`/catalog/${o.id}.html`}>{o.title}</Link></td>
                        <td>{o.size}</td>
                        <td>{o.quantity}</td>
                        <td>{o.price} руб.</td>
                        <td>{o.price * o.quantity} руб.</td>
                        <td>
                            <button className="btn btn-outline-danger btn-sm"
                                    onClick={() => handleDelete(o.id, o.size)}>Удалить
                            </button>
                        </td>
                    </tr>)}
                    <tr>
                        <td colSpan="5" className="text-right">Общая стоимость</td>
                        <td>{itemsSum} руб.</td>
                    </tr>
                    </tbody>
                </table> : <div className="text-center">В корзине ничего нет!</div>}
            </section>
            {items.length ? <Order/> : ''}
        </>
    );
}
