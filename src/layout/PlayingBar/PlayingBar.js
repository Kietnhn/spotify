import { useState, useEffect, useRef, memo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { changeIndexSong, setCurrentMusic, setIsQueue, setTogglePlay } from '../../features/Music/Music';
import { addFavoriteList, removeFavoriteList } from '../../features/FavoriteList/favoriteList';
import Bar from './Bar';
import useAudioPlayer from './Bar/useAudioPlayer';

import BtnIcon from '../../components/BtnIcon';
import Image from '../../components/Image';
import {
    ChangePcIcon,
    TymIcon,
    NextIcon,
    PauseIcon,
    PlayIcon,
    PlaylistIcon,
    PrevIcon,
    RamdomIcon,
    ReplayIcon,
    ScaleUpIcon,
    VolumnIcon,
    SoundOffIcon,
    TymActiveIcon,
    VolumnNormalIcon,
    VolumnSmallIcon,
} from '../../components/Icons';
import publicPaths from '../../paths';

import classNames from 'classnames/bind';
import styles from './PlayingBar.module.scss';

const cx = classNames.bind(styles);

function PlayingBar() {
    const musicFeatures = useSelector((state) => state.music);
    const favoriteList = useSelector((state) => state.favoriteList);
    const { indexSong, currentAlbum, currentMusic, toggleQueue, togglePlay } = musicFeatures;

    const dispatch = useDispatch();

    const { curTime, duration, setClickedTime } = useAudioPlayer();

    const [isEnded, setisEnded] = useState(false);
    const [isRamdom, setIsRamdom] = useState(false);
    const [isReplay, setIsReplay] = useState(false);
    const [volume, setVolume] = useState(100);

    const audioRef = useRef();

    useEffect(() => {
        audioRef.current.volume = volume / 100;
    }, [volume]);

    useEffect(() => {
        if (currentMusic && isEnded) {
            audioRef.current.play();
            dispatch(setTogglePlay(true));
            setisEnded(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentMusic, isEnded]);

    const handleTogglePlayMusic = () => {
        if (togglePlay) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        dispatch(setTogglePlay(!togglePlay));
    };
    const handleEndedSong = () => {
        if (isReplay) {
            dispatch(setCurrentMusic(currentAlbum.album[indexSong]));
            setisEnded(true);
        } else {
            handleNextSong();
        }
    };
    const handleRamdomSong = () => {
        const randomNumber = Math.floor(Math.random() * currentAlbum.album.length);
        dispatch(changeIndexSong(randomNumber));
        dispatch(setCurrentMusic(currentAlbum.album[randomNumber]));
    };

    const handleNextSong = () => {
        if (isRamdom) {
            handleRamdomSong();
        } else if (indexSong <= currentAlbum.album.length - 1) {
            dispatch(changeIndexSong(indexSong + 1));
            dispatch(setCurrentMusic(currentAlbum.album[indexSong + 1]));
        }
        setisEnded(true);
    };
    const hanldePrevSong = () => {
        if (isRamdom) {
            handleRamdomSong();
        } else if (indexSong >= 0) {
            dispatch(changeIndexSong(indexSong - 1));
            dispatch(setCurrentMusic(currentAlbum.album[indexSong - 1]));
        }
        setisEnded(true);
    };

    const handleChangeVolume = (e) => {
        setVolume(e.target.value);
    };
    const handleToggleMute = () => {
        if (volume !== 0) {
            setVolume(0);
        } else {
            setVolume(100);
        }
    };
    const handleFavoriteList = () => {
        if (favoriteList.includes(currentMusic)) {
            const list = [...favoriteList];
            list.splice(favoriteList.indexOf(currentMusic), 1);
            dispatch(removeFavoriteList(list));
        } else {
            const list = [currentMusic, ...favoriteList];
            dispatch(addFavoriteList(list));
        }
    };
    const handleIconVolume = () => {
        let icon = <VolumnIcon />;
        const value = volume / 100;
        if (value <= 0.7 && value >= 0.4) {
            return <VolumnNormalIcon />;
        } else if (value < 0.4 && value !== 0) {
            return <VolumnSmallIcon />;
        } else if (value === 0) {
            return <SoundOffIcon />;
        }
        return icon;
    };
    return (
        <footer className={cx('footer')}>
            <div className={cx('wrapper')}>
                <div className={cx('playlist')}>
                    <Image
                        className={cx('music-img')}
                        subSrc={currentMusic.aboutArtist.avatar}
                        src={currentMusic.iamgeMusic}
                        alt={currentMusic.name}
                    />
                    <div className={cx('music-info')}>
                        <div className={cx('translate-font')}>
                            <Link className={cx('name')} to={publicPaths.playlist}>
                                {currentMusic.name}
                            </Link>
                        </div>
                        <Link className={cx('author')} to={publicPaths.author}>
                            {currentMusic.aboutArtist.name}
                        </Link>
                    </div>
                    <div className={cx('music-feather')}>
                        <BtnIcon
                            className={cx('', {
                                active2: favoriteList.includes(currentMusic),
                            })}
                            icon={<TymIcon />}
                            onClick={handleFavoriteList}
                            isTrue={!favoriteList.includes(currentMusic)}
                            content="L??u v??o th?? vi???n"
                            subContent="X??a kh???i th?? vi???n"
                            toggle={favoriteList.includes(currentMusic)}
                            changeIcon={<TymActiveIcon />}
                        />
                        <BtnIcon icon={<ScaleUpIcon />} />
                    </div>
                </div>
                <div className={cx('controls')}>
                    <div className={cx('btns')}>
                        <BtnIcon
                            isTrue={!isRamdom}
                            content="B???t tr???n b??i"
                            subContent="T???t tr???n b??i"
                            className={cx('ramdom-btn', {
                                active: isRamdom,
                            })}
                            icon={<RamdomIcon />}
                            onClick={() => setIsRamdom(!isRamdom)}
                        ></BtnIcon>

                        <BtnIcon
                            isTrue={true}
                            content="Tr?????c"
                            disable={indexSong < 0}
                            className={cx('prev-btn')}
                            icon={<PrevIcon />}
                            onClick={hanldePrevSong}
                        ></BtnIcon>

                        <BtnIcon
                            isTrue={togglePlay}
                            subContent="Ph??t"
                            content="T???m d???ng"
                            onClick={handleTogglePlayMusic}
                            className={cx('toggle-play-btn')}
                            icon={<PlayIcon />}
                            changeIcon={<PauseIcon />}
                            toggle={togglePlay}
                        ></BtnIcon>

                        <BtnIcon
                            isTrue={true}
                            content="Ti???p"
                            disable={indexSong > currentAlbum.album.length - 1}
                            className={cx('next-btn')}
                            icon={<NextIcon />}
                            onClick={handleNextSong}
                        ></BtnIcon>

                        <BtnIcon
                            isTrue={!isReplay}
                            content="B???t L???p l???i"
                            subContent="T???t L???p l???i"
                            className={cx('replay-btn', {
                                active: isReplay,
                            })}
                            icon={<ReplayIcon />}
                            onClick={() => setIsReplay(!isReplay)}
                        ></BtnIcon>
                    </div>
                    <div className="timeline">
                        <audio src={currentMusic.url} ref={audioRef} id="audio" onEnded={handleEndedSong} />
                        <Bar curTime={curTime} duration={duration} onTimeUpdate={(time) => setClickedTime(time)} />
                    </div>
                </div>
                <div className={cx('actions')}>
                    <Link to={toggleQueue ? publicPaths.home : publicPaths.queue}>
                        <BtnIcon
                            onClick={() => dispatch(setIsQueue(!toggleQueue))}
                            className={cx('', {
                                active: window.location.href.includes(publicPaths.queue),
                            })}
                            icon={<PlaylistIcon />}
                        />
                    </Link>
                    <BtnIcon icon={<ChangePcIcon />} />
                    <div className={cx('volumn')}>
                        <BtnIcon
                            isTrue={volume / 100 !== 0}
                            content="T???t ti???ng"
                            subContent={'H???y t???t ti???ng'}
                            icon={handleIconVolume()}
                            onClick={handleToggleMute}
                        />
                        <div className={cx('volume-slider')}>
                            <input type="range" value={volume} onChange={handleChangeVolume} />
                            <div style={{ right: `calc(100% - ${volume}%)` }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default memo(PlayingBar);
