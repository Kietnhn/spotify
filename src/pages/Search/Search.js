import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import songs from '../../components/Music/Music';
import { setCurrentAlbum } from '../../features/Music/Music';
import Seaching from './Searching';
import publicPaths from '../../paths';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    const search = useSelector((state) => state.search);
    const { inputSearch } = search;

    const dispatch = useDispatch();
    // eslint-disable-next-line no-unused-vars
    const [listKinds, setListKinds] = useState(() => {
        const kinds = songs.album.map((song) => song.kinds);
        const listKind = [];
        kinds.forEach((kind) => {
            kind.forEach((item) => listKind.push(item));
        });
        const results = new Set(listKind);
        return results;
    });

    const backgroundColors = [
        '#27856a',
        '#1e3264',
        '#8d67ab',
        '#e8115b',
        '#148a08',
        '#a56752',
        '#509bf5',
        '#e61e32',
        '#ba5d07',
        '#9cf0e1',
    ];

    const handleSeletedKind = (item, random) => {
        const album = songs.album.filter((song) => {
            const result = song.kinds.includes(item);
            return result;
        });
        const current = {
            name: item,
            description: `Album ${item} tuyển chọn`,
            iamgeMusic: '',
            fallback: backgroundColors[random],
            album: album,
        };
        console.log('album ', current);
        dispatch(setCurrentAlbum(current));
    };
    return (
        <div className={cx('wrapper')}>
            {!inputSearch.length > 0 ? (
                <div className={cx('container')}>
                    <h1>Duyệt trên tất cả</h1>
                    <div className={cx('grid')}>
                        <div className={cx('row')}>
                            {listKinds &&
                                Array.from(listKinds).map((item, index) => {
                                    const random = Math.floor(Math.random() * backgroundColors.length);
                                    return (
                                        <div className={cx('col')} key={index}>
                                            <Link
                                                to={publicPaths.playlist}
                                                onClick={() => handleSeletedKind(item, random)}
                                                className={cx('item')}
                                                style={{ backgroundColor: `${backgroundColors[random]}` }}
                                            >
                                                <div className={cx('name')}>
                                                    <h2>{item}</h2>
                                                </div>
                                                {/* <div className={cx('img')}>
                                            <span>Album {item}</span>
                                        </div> */}
                                            </Link>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            ) : (
                <Seaching />
            )}
        </div>
    );
}

export default Search;
