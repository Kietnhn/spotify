import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BtnIcon from '../../components/BtnIcon';
import { ClockIcon, MenuBarIcon, PauseIcon, PlayIcon, TymIcon } from '../../components/Icons';
import ListQueue from '../Queue/ListQueue/ListQueue';
import NoAlbum from '../../components/NoAlbum';
import Image from '../../components/Image';
import { changeIndexSong, setCurrentMusic, setCurrentAlbum, setTogglePlay } from '../../features/Music/Music';

import classNames from 'classnames/bind';
import styles from './Playlist.module.scss';

const cx = classNames.bind(styles);

function Album({ album, favorite = false, add = false }) {
    const dispatch = useDispatch();
    const musicFeatures = useSelector((state) => state.music);
    const { currentMusic, togglePlay } = musicFeatures;

    const [firstClickPlay, setFirstClickPlay] = useState(false);
    const [mount, setMount] = useState(false);

    useEffect(() => {
        if (firstClickPlay) {
            dispatch(setCurrentAlbum(album));
            dispatch(setCurrentMusic(album.album[0]));
            dispatch(changeIndexSong(0));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [firstClickPlay]);

    useEffect(() => {
        if (mount) {
            const audio = document.querySelector('#audio');
            audio.play();
            dispatch(setTogglePlay(true));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentMusic]);

    const handleTogglePlayMusic = () => {
        if (!firstClickPlay) {
            setFirstClickPlay(true);
        } else {
            const audio = document.querySelector('#audio');
            if (togglePlay) {
                audio.pause();
            } else {
                audio.play();
            }
        }
        dispatch(setTogglePlay(!togglePlay));
        setMount(true);
    };
    const handleSelectSong = (song) => {
        dispatch(setCurrentMusic(song));
        setMount(true);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('wrap-header')}>
                    <div className={cx('album-img')}>
                        {album?.fallback ? (
                            <div className={cx('fallback')} style={{ backgroundColor: album.fallback }}>
                                <div className={cx('fallback-name')}>
                                    <h2>{album?.name}</h2>
                                </div>
                            </div>
                        ) : (
                            <Image src={album.iamgeMusic} alt={album.name} />
                        )}
                    </div>
                    <div className={cx('info')}>
                        <div className={cx('type')}>Playlist</div>
                        <h1 className={cx('name')}>{album?.name}</h1>
                        <div className={cx('description')}>{album?.description}</div>
                    </div>
                </div>
            </div>
            {album?.album?.length > 0 ? (
                <>
                    <div className={cx('btns')}>
                        <div className={cx('play-btn')}>
                            <BtnIcon
                                icon={<PlayIcon width="24" height="24" />}
                                isTrue={togglePlay}
                                subContent="Phát"
                                content="Tạm dừng"
                                onClick={handleTogglePlayMusic}
                                changeIcon={<PauseIcon width="24" height="24" />}
                                toggle={togglePlay}
                            />
                        </div>
                        {!favorite && (
                            <>
                                <BtnIcon
                                    icon={<TymIcon width="32" height="32" />}
                                    isTrue={true}
                                    content="Lưu vào thư viện"
                                />
                                <BtnIcon icon={<MenuBarIcon width="32" height="32" />} isTrue={true} content="Khác" />
                            </>
                        )}
                    </div>
                    <div className={cx('container', { add })}>
                        <div className={cx('heading')}>
                            <div className={cx('wrap-heading')}>
                                <div className={cx('stt')}>#</div>
                                <div className={cx('heading-name')}>Tiêu đề</div>
                            </div>
                            <div className={cx('album')}>Album</div>
                            <div className={cx('time')}>
                                <BtnIcon icon={<ClockIcon />} />
                            </div>
                        </div>
                        {album?.album.map((song, index) => {
                            return (
                                <ListQueue
                                    key={index}
                                    music={song}
                                    index={index + 1}
                                    onDoubleClick={() => handleSelectSong(song)}
                                />
                            );
                        })}
                    </div>
                </>
            ) : (
                <>{favorite && <NoAlbum />}</>
            )}
            {!add && (
                <div className={cx('footer', { 'add-footer': add })}>
                    <div className={cx('line')}></div>
                </div>
            )}
        </div>
    );
}

export default Album;
