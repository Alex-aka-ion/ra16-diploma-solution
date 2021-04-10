import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeSearchFilter} from "../actions/actionCreators";
import {useHistory} from 'react-router-dom';
import CartInHeader from "./CartInHeader";

export default function SearchInHeader() {
    const {search} = useSelector(state => state.catalogFilter);
    const dispatch = useDispatch();
    const history = useHistory();

    const [localSearch, setLocalSearch] = useState(search);
    const [expanded, setExpanded] = useState(false);

    const handleChange = (e) => {
        setLocalSearch(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (localSearch !== '') {
            dispatch(changeSearchFilter(localSearch));
            setExpanded(false);
            history.push('/catalog.html');
        } else {
            setExpanded(false);
        }
    }

    const handleClick = (e) => {
        if (history.location.pathname === '/catalog.html') {
            document.getElementById('catalogSearchField').focus();
        } else {
            if (!expanded) {
                setExpanded(true)
            } else {
                handleSubmit(e);
            }
        }
    }

    return (
        <div>
            <div className="header-controls-pics">
                <div data-id="search-expander"
                     className="header-controls-pic header-controls-search"
                     onClick={handleClick}
                ></div>
                <CartInHeader/>
            </div>
            <form onSubmit={handleSubmit} data-id="search-form"
                  className={`header-controls-search-form form-inline ${!expanded ? 'invisible' : ''}`}>
                <input className="form-control" placeholder="Поиск" onChange={handleChange} value={localSearch}/>
            </form>
        </div>
    );
}
