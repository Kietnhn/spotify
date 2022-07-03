import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { setSearch } from '../features/Search/Search';
import { useDispatch, useSelector } from 'react-redux';

export default function ScrollToTop() {
    const dispatch = useDispatch();
    const search = useSelector((state) => state.search);
    const { inputSearch } = search;
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
        if (inputSearch) {
            dispatch(setSearch(''));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    return null;
}
