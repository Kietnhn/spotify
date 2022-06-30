import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearch, setSongSearch, setAuthorSearch, setKindSearch } from '../../features/Search/Search';
import BtnIcon from '../BtnIcon';
import { ClearInputIcon, SearchIcon } from '../Icons';
import songs from '../Music/Music';
import toLowerCaseNonAccentVietnamese from './SearchEngine';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search({ newPlaylist, placeholder }) {
    const dispatch = useDispatch();
    const search = useSelector((state) => state.search);
    const { inputSearch } = search;

    const inputRef = useRef();
    // useEffect(() => {
    //     console.log('kindSearch', kindSearch);
    // }, [kindSearch]);
    useEffect(() => {
        const newInputValue = toLowerCaseNonAccentVietnamese(inputSearch);

        const songFilter = songs.album.filter((song) => {
            return toLowerCaseNonAccentVietnamese(song.name).includes(newInputValue);
        });
        const authorFilter = songs.album.filter((song) => {
            return toLowerCaseNonAccentVietnamese(song.author).includes(newInputValue);
        });
        const kindList = [];
        // eslint-disable-next-line no-unused-vars
        const kindFilter = songs.album.forEach((song) => {
            // eslint-disable-next-line no-unused-vars
            const result = song.kinds.filter(
                (kind) => toLowerCaseNonAccentVietnamese(kind).includes(newInputValue) && kindList.push(song),
            );
            // console.log('result', result);
            // return
        });
        // console.log('result2', kindList);
        const newKindList = new Set(kindList);
        // console.log('result3', kindList);
        dispatch(setSongSearch(songFilter.sort()));
        dispatch(setAuthorSearch(authorFilter.sort()));
        dispatch(setKindSearch(Array.from(newKindList).sort()));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputSearch]);

    const handleSeach = (e) => {
        const inputValue = e.target.value;
        if (!inputValue.startsWith(' ')) {
            dispatch(setSearch(inputValue));
        }
    };

    const handleClearInputSearch = () => {
        dispatch(setSearch(''));
        inputRef.current.focus();
    };
    return (
        <div className={cx('search', { newPlaylist })}>
            <input ref={inputRef} placeholder={placeholder} value={inputSearch} onChange={handleSeach} />
            <div className={cx('search-btn')}>
                <BtnIcon className={cx('search-icon')} icon={<SearchIcon />} />
            </div>
            {inputSearch.length > 0 && (
                <div className={cx('clear-btn')} onClick={handleClearInputSearch}>
                    <BtnIcon className={cx('clear-icon')} icon={<ClearInputIcon />} />
                </div>
            )}
        </div>
    );
}

export default Search;
