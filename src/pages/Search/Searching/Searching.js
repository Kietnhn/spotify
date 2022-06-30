import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
// eslint-disable-next-line no-unused-vars
import momentDurationFormatSetup from 'moment-duration-format';
import { addFavoriteList, removeFavoriteList } from '../../../features/FavoriteList/favoriteList';

import ShowSearch from './ShowSearch';

import Image from '../../../components/Image';
import BtnIcon from '../../../components/BtnIcon';
import { MenuBarIcon, TymActiveIcon, TymIcon } from '../../../components/Icons';

import classNames from 'classnames/bind';
import styles from './Searching.module.scss';

const cx = classNames.bind(styles);

function Seaching() {
    const dispatch = useDispatch();
    const search = useSelector((state) => state.search);
    const favoriteList = useSelector((state) => state.favoriteList);
    const { songSearch, inputSearch, authorSearch, kindSearch } = search;
    const [duration, setDuration] = useState('');
    const formatDuration = (duration) => {
        return moment.duration(duration, 'seconds').format('mm:ss', { trim: false });
    };

    const handleFadeInDuration = (e) => {
        setDuration(formatDuration(e.target.duration));
    };
    const handleFavoriteList = (song) => {
        if (favoriteList.includes(song)) {
            const list = [...favoriteList];
            list.splice(favoriteList.indexOf(song), 1);
            dispatch(removeFavoriteList(list));
        } else {
            const list = [song, ...favoriteList];
            dispatch(addFavoriteList(list));
        }
    };
    return (
        <div className={cx('wrapper')}>
            {songSearch.length > 0 ? (
                <>
                    <nav className={cx('nav')}></nav>
                    <div className={cx('container')}>
                        <div className={cx('heading')}>
                            <div className={cx('row')}>
                                <div className={cx('col-top')}>
                                    <div className={cx('top')}>
                                        <div className={cx('title')}>
                                            <h2>Kết quả hàng đầu</h2>
                                        </div>
                                        <div className={cx('wrap-top')}>
                                            <div className={cx('top-img')}>
                                                <Image src={songSearch[0]?.iamgeMusic} alt={songSearch[0].name} />
                                            </div>
                                            <div className={cx('top-info')}>
                                                <h2>{songSearch[0].name}</h2>
                                                <p>{songSearch[0].author}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('col-songs')}>
                                    <div className={cx('songs')}>
                                        <div className={cx('title')}>
                                            <h2>Bài hát</h2>
                                        </div>
                                        <div className={cx('wrap-songs')}>
                                            {songSearch.map((song, index) => {
                                                // eslint-disable-next-line array-callback-return
                                                if (index > 3) return;
                                                return (
                                                    <div className={cx('song')} key={index}>
                                                        <div className={cx('wrap-song')}>
                                                            <div className={cx('left')}>
                                                                <div className={cx('song-img')}>
                                                                    <Image src={song.iamgeMusic} alt={song.name} />
                                                                </div>
                                                                <div className={cx('song-info')}>
                                                                    <h5>{song.name}</h5>
                                                                    <p>{song.author}</p>
                                                                </div>
                                                            </div>
                                                            <div className={cx('right')}>
                                                                <div className={cx('actions')}>
                                                                    <BtnIcon
                                                                        className={cx('action', {
                                                                            active2: favoriteList.includes(song),
                                                                        })}
                                                                        icon={<TymIcon />}
                                                                        onClick={() => handleFavoriteList(song)}
                                                                        isTrue={!favoriteList.includes(song)}
                                                                        content="Lưu vào thư viện"
                                                                        subContent="Xóa khỏi thư viện"
                                                                        toggle={favoriteList.includes(song)}
                                                                        changeIcon={<TymActiveIcon />}
                                                                    />
                                                                    <audio
                                                                        src={song.url}
                                                                        onLoadedMetadata={handleFadeInDuration}
                                                                    />
                                                                    <div className={cx('time')} id="time">
                                                                        {duration}
                                                                    </div>
                                                                    <BtnIcon
                                                                        className={cx('action')}
                                                                        isTrue={true}
                                                                        content="Khác"
                                                                        icon={<MenuBarIcon />}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('body')}>
                            <ShowSearch title="Nghệ sĩ" list={authorSearch} avatar={true} />
                            <ShowSearch title="Album" list={songSearch} />
                            <ShowSearch title="Thể loại" list={kindSearch} />
                        </div>
                        <div className={cx('footer')}>
                            <div className={cx('line')}></div>
                        </div>
                    </div>
                </>
            ) : (
                <div>
                    {kindSearch && (
                        <div>
                            <ShowSearch title="Liên quan" list={kindSearch} />
                        </div>
                    )}
                    <div className={cx('no-result')}>
                        <div className={cx('warning')}>
                            <h1>{`Không tìm thấy kết quả nào cho "${inputSearch}"`}</h1>
                            <p>
                                Vui lòng đảm bảo viết đúng chính tả, hoặc sử dụng ít từ khoá hơn hay thử các từ khoá
                                khác
                            </p>
                        </div>
                        <div className={cx('footer')}>
                            <div className={cx('line')}></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Seaching;
