import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BtnIcon from '../../components/BtnIcon';
import { PauseIcon, PlayIcon } from '../../components/Icons';
import { changeIndexSong, setCurrentMusic, setCurrentAlbum, setTogglePlay } from '../../features/Music/Music';

import classNames from 'classnames/bind';
import styles from './ButtonPlay.module.scss';

const cx = classNames.bind(styles);

function ButtonPlay({ album, mount, setMount }) {
    const dispatch = useDispatch();
    const musicFeatures = useSelector((state) => state.music);
    const { currentMusic, togglePlay } = musicFeatures;

    const [firstClickPlay, setFirstClickPlay] = useState(false);

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
    return (
        <div className={cx('play-btn')}>
            <BtnIcon
                icon={<PlayIcon width="24" height="24" />}
                isTrue={togglePlay}
                subContent="Phát"
                content="Dừng"
                onClick={handleTogglePlayMusic}
                changeIcon={<PauseIcon width="24" height="24" />}
                toggle={togglePlay}
            />
        </div>
    );
}

export default ButtonPlay;
