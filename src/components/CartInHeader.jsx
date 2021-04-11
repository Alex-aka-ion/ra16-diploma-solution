import {useSelector} from "react-redux";
import React from "react";
import {useHistory} from 'react-router-dom';

export default function CartInHeader() {
    const items = useSelector(state => state.cart);
    const history = useHistory();

    const handleClick = () => {
        history.push('/cart.html');
    }

    return (
        <div className="header-controls-pic header-controls-cart" onClick={handleClick}>
            {items.length > 0 &&
            <div className="header-controls-cart-full">{items.reduce((a, o) => a + o.quantity, 0)}</div>}
            <div className="header-controls-cart-menu"></div>
        </div>
    );
}
