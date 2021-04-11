import Spinner from "./Spinner";
import useFetch from "../hooks/useFetch";
import Item from "./Item";
import React from "react";

export default function TopSales() {
    const [items, loading, error] = useFetch('top-sales', []);

    if (items && items.length === 0)
        return null;

    return (
        <section className="top-sales">
            <h2 className="text-center">Хиты продаж!</h2>
            {loading ? <Spinner/> : ''}
            {error ? error : ''}
            <div className="row">
                {items.map(o => <Item key={o.id} item={o}/>)}
            </div>
        </section>
    );
}
