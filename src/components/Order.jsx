import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {postOrderRequest} from "../actions/actionCreators";
import Spinner from "./Spinner";

export default function Order() {
    const items = useSelector(state => state.cart);
    const {loading, error} = useSelector(state => state.postOrder);
    const dispatch = useDispatch();

    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [agreement, setAgreement] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const body = {
            owner: {
                phone,
                address,
            },
            items: items.map(i => {
                return {id: Number(i.id), price: i.price, count: i.quantity}
            })
        }

        console.log(body);

        dispatch(postOrderRequest(body));
    }

    return (
        <section className="order">
            <h2 className="text-center">Оформить заказ</h2>
            <div className="card" /*style="max-width: 30rem; margin: 0 auto;"*/>
                <form className="card-body" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="phone">Телефон</label>
                        <input className="form-control" id="phone" placeholder="Ваш телефон" value={phone}
                               onChange={e => setPhone(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Адрес доставки</label>
                        <input className="form-control" id="address" placeholder="Адрес доставки" value={address}
                               onChange={e => setAddress(e.target.value)}/>
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="agreement" value="1"
                               checked={agreement} onChange={() => setAgreement(!agreement)}/>
                        <label className="form-check-label" htmlFor="agreement">Согласен с правилами
                            доставки</label>
                    </div>
                    {loading ? <Spinner/> :
                        <button type="submit" className="btn btn-outline-secondary"
                                disabled={!agreement}>Оформить</button>}
                </form>
                {error && <div className="text-center">{error}</div>}
            </div>
        </section>
    );
}
