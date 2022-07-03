import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeIndexSong, setCurrentAlbum, setCurrentMusic } from '../../features/Music/Music';
import { setCurrentPlaylist, setIndexPlaylist, setAuthor } from '../../features/Playlist/Playlist';
import Image from '../Image';
import { PlayIcon } from '../Icons';
import { setTitle } from '../../features/Title/Title';
import publicPaths from '../../paths';
import songs from '../../components/Music/Music';

import classNames from 'classnames/bind';
import styles from './ItemMusic.module.scss';

const cx = classNames.bind(styles);

function ItemMusic({ item, index, className, fromCllection = false, avatar = false, search = false }) {
    const dispatch = useDispatch();
    const handleSelectAlbum = (item) => {
        if (!fromCllection) {
            if (item.album) {
                // console.log(item);
                dispatch(setCurrentAlbum(item));
                dispatch(changeIndexSong(0));
                dispatch(setCurrentMusic(item.album[0]));
            } else {
                const newAlbum = {
                    name: item.aboutArtist.name,
                    description: item.description,
                    iamgeMusic: item.iamgeMusic,
                    album: [item],
                };
                // console.log(newAlbum);
                dispatch(setCurrentAlbum(newAlbum));
                dispatch(changeIndexSong(0));
                dispatch(setCurrentMusic(item));
            }
            dispatch(setTitle(item.name));
        } else {
            // const handleSelectCurrentPlaylist = (item, index) => {
            dispatch(setCurrentPlaylist(item));
            dispatch(setIndexPlaylist(index));
            // };
        }
    };
    const handleSelectAuthor = (item) => {
        const album = songs.album.filter((song) => song.aboutArtist.name === item.aboutArtist.name);
        const artist = {
            ...item,
            album,
        };
        dispatch(setAuthor(artist));
    };
    return (
        <div className={className}>
            <Link
                to={avatar ? publicPaths.author : fromCllection ? publicPaths.new : publicPaths.playlist}
                className={cx('item')}
                onClick={() => (avatar ? handleSelectAuthor(item) : handleSelectAlbum(item))}
            >
                <div className={cx('image')}>
                    <Image
                        className={cx('', {
                            avatar,
                        })}
                        src={avatar ? item.aboutArtist.avatar : item.iamgeMusic}
                        subSrc={item?.aboutArtist?.avatar}
                        alt={item.name}
                    />
                    <div className={cx('play-wrap')}>
                        <button className={cx('play-btn')}>
                            <span className={cx('play-icon')}>
                                <PlayIcon />
                            </span>
                        </button>
                    </div>
                </div>
                <div className={cx('info')}>
                    <h3 className={cx('name')}>{avatar ? item.aboutArtist.name : item.name}</h3>
                    {search ? (
                        <p className={cx('kind')}>{avatar ? 'Nghệ sĩ' : item.kinds[0]}</p>
                    ) : (
                        <p className={cx('des')}>{item.description}</p>
                    )}
                </div>
            </Link>
        </div>
    );
}

export default ItemMusic;
