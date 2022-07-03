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

function Search({ newPlaylist, placeholder, fromPlaylist = false }) {
    const dispatch = useDispatch();
    const search = useSelector((state) => state.search);
    const { inputSearch } = search;

    const inputRef = useRef();

    //songFIlter
    useEffect(() => {
        const newInputValue = toLowerCaseNonAccentVietnamese(inputSearch);
        if (newInputValue) {
            const songFilter = songs.album.filter((song) => {
                return toLowerCaseNonAccentVietnamese(song.name).includes(newInputValue);
            });
            dispatch(setSongSearch(songFilter.sort()));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputSearch]);
    //authorfilter
    useEffect(() => {
        const newInputValue = toLowerCaseNonAccentVietnamese(inputSearch);
        if (newInputValue) {
            const authorFilter = songs.album.filter((song) => {
                return toLowerCaseNonAccentVietnamese(song.aboutArtist.name).includes(newInputValue);
            });

            const newAuthors = authorFilter.map((author) => author.aboutArtist.name);
            const setNewAuthors = new Set(newAuthors);
            const authorsArray = Array.from(setNewAuthors);
            const newAuthorFilter = [];
            for (let i = 0; i < authorsArray.length; i++) {
                const otherAuthorLists = songs.album.find((song) => song.aboutArtist.name.includes(authorsArray[i]));
                if (otherAuthorLists) {
                    newAuthorFilter.push(otherAuthorLists);
                }
            }
            dispatch(setAuthorSearch(newAuthorFilter.sort()));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputSearch]);
    //kindFilter
    useEffect(() => {
        const newInputValue = toLowerCaseNonAccentVietnamese(inputSearch);
        if (newInputValue) {
            const kindList = [];
            songs.album.forEach((song) => {
                // eslint-disable-next-line no-unused-vars
                const result = song.kinds.filter(
                    (kind) => toLowerCaseNonAccentVietnamese(kind).includes(newInputValue) && kindList.push(song),
                );
            });
            const newKindList = new Set(kindList);
            dispatch(setKindSearch(Array.from(newKindList).sort()));
        }
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
                    <BtnIcon
                        className={cx('clear-icon', {
                            fromPlaylist,
                        })}
                        icon={<ClearInputIcon />}
                    />
                </div>
            )}
        </div>
    );
}

export default Search;
