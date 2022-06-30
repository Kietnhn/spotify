import { useSelector } from 'react-redux';

import { PlayIcon } from '../../components/Icons';

import classNames from 'classnames/bind';
import styles from './Collection.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Collection() {
    const favoriteList = useSelector((state) => state.favoriteList);
    return (
        <div className={cx('wrapper')}>
            <h1>Playlist</h1>
            <div className={cx('container')}>
                <div className={cx('row')}>
                    <div className={cx('favorite')}>
                        <Link className={cx('wrap-favorite')} to="/favorite">
                            <div className={cx('names')}>
                                <div className={cx('wrap-names')}>
                                    {favoriteList.map((item, index) => (
                                        <span key={index} className={cx('favorite-item')}>
                                            <span className={cx('favorite-author')}>{item.author}</span>
                                            <span className={cx('favorite-name')}>{item.name}</span>
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className={cx('title')}>
                                <h2>Bài hát đã thích</h2>
                                <span>{favoriteList.length} bài hát đã thích</span>
                            </div>
                            <div className={cx('play-wrap')}>
                                <button className={cx('play-btn')}>
                                    <span className={cx('play-icon')}>
                                        <PlayIcon />
                                    </span>
                                </button>
                            </div>
                        </Link>
                    </div>
                    <div className={cx('col')}>
                        <div></div>
                    </div>
                    <div className={cx('col')}>
                        <div></div>
                    </div>
                    <div className={cx('col')}>
                        <div></div>
                    </div>
                </div>
            </div>
            <div className={cx('footer')}>
                <div className={cx('line')}></div>
            </div>
        </div>
    );
}

export default Collection;
