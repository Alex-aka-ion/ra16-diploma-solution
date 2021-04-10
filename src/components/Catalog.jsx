import Spinner from "./Spinner";
import Filters from "./Filters";
import useFetch from "../hooks/useFetch";
import Item from "./Item";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeCatalogFilter, changeSearchFilter} from "../actions/actionCreators";

export default function Catalog({showSearch = true}) {
    const {categoryId, search} = useSelector(state => state.catalogFilter);
    const dispatch = useDispatch();

    const [filters] = useFetch('categories', []);

    const showedFilters = [
        {id: 0, title: 'Все'},
        ...filters
    ];

    const [offset, setOffset] = useState(0);

    const [items, loading, error, finish] = useFetch(
        `items?${new URLSearchParams({
            categoryId: categoryId.toString(),
            offset: offset.toString(),
            q: search
        })}`,
        [],
        true,
        offset
    );

    const [localSearch, setLocalSearch] = useState(search);

    const handleChangeFilter = (e, categoryId) => {
        e.preventDefault();
        setOffset(0);
        dispatch(changeCatalogFilter(categoryId));
    }

    const handleSearchSubmit = (e) => {
        console.log('submit', localSearch);
        e.preventDefault();
        dispatch(changeSearchFilter(localSearch));
    }

    return (
        <section className="catalog">
            <h2 className="text-center">Каталог</h2>
            {showSearch && <form onSubmit={handleSearchSubmit} className="catalog-search-form form-inline">
                <input id="catalogSearchField" className="form-control" placeholder="Поиск"
                       onChange={(e) => setLocalSearch(e.target.value)} value={localSearch}/>
            </form>}
            <Filters filters={showedFilters} selected={categoryId} handleChangeFilter={handleChangeFilter}/>
            <div className="row">
                {items.map(o => <Item key={o.id} item={o}/>)}
            </div>
            {loading ?
                <Spinner/> :
                !finish && <div className="text-center">
                    <button className="btn btn-outline-primary" onClick={() => setOffset(offset + 6)}>Загрузить ещё</button>
                </div>}
            {error ? error : ''}

        </section>
    );
}
