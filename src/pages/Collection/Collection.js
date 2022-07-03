import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { PlayIcon } from '../../components/Icons';
import ItemMusic from '../../components/ItemMusic';
import publicPaths from '../../paths';

import classNames from 'classnames/bind';
import styles from './Collection.module.scss';

const cx = classNames.bind(styles);

function Collection() {
    const favoriteList = useSelector((state) => state.favoriteList);
    const newPlaylist = useSelector((state) => state.playlist);
    const { playlists } = newPlaylist;

    return (
        <div className={cx('wrapper')}>
            <h1>Playlist</h1>
            <div className={cx('container')}>
                <div className={cx('row')}>
                    <div className={cx('favorite')}>
                        <Link className={cx('wrap-favorite')} to={publicPaths.favorite}>
                            <div className={cx('names')}>
                                <div className={cx('wrap-names')}>
                                    {favoriteList.map((item, index) => (
                                        <span key={index} className={cx('favorite-item')}>
                                            <span className={cx('favorite-author')}>{item?.aboutArtist?.name}</span>
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
                    {playlists.map((item, index) => (
                        <ItemMusic
                            index={index}
                            item={{
                                iamgeMusic: item.iamgeMusic || item?.album[0]?.iamgeMusic,
                                name: item.name,
                                description: item.description,
                            }}
                            className={cx('col')}
                            key={index}
                            fromCllection={true}
                        />
                    ))}
                </div>
            </div>
            <div className={cx('footer')}>
                <div className={cx('line')}></div>
            </div>
        </div>
    );
}

export default Collection;
