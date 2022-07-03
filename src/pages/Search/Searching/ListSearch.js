import { useSelector, useDispatch } from 'react-redux';

import Image from '../../../components/Image';
import Actions from '../../../components/Actions';
import { PauseIcon, PlayIcon } from '../../../components/Icons';
import { changeIndexSong, setCurrentAlbum, setCurrentMusic, setTogglePlay } from '../../../features/Music/Music';
import BtnIcon from '../../../components/BtnIcon';
import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Searching.module.scss';

const cx = classNames.bind(styles);

function ListSearch({ stopAt = 3 }) {
    const dispatch = useDispatch();
    const music = useSelector((state) => state.music);
    const [mount, setMount] = useState(false);

    const { currentMusic } = music;

    useEffect(() => {
        const audio = document.querySelector('#audio');
        if (mount) {
            audio.play();
            dispatch(setTogglePlay(true));
        } else {
            audio.pause();
            dispatch(setTogglePlay(false));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentMusic, mount]);

    const search = useSelector((state) => state.search);
    const { songSearch } = search;

    const handleSeleteMusic = (song) => {
        if (!mount) {
            setMount(!mount);
            const newAlbum = {
                name: song.name,
                description: song.description,
                iamgeMusic: song.iamgeMusic,
                album: [song],
            };
            dispatch(setCurrentAlbum(newAlbum));
            dispatch(changeIndexSong(0));
            dispatch(setCurrentMusic(song));
        } else {
            setMount(!mount);
        }
    };

    return (
        <div className={cx('wrap-songs')}>
            {songSearch.map((song, index) => {
                // eslint-disable-next-line array-callback-return
                if (index > stopAt) return;
                return (
                    <div className={cx('song')} key={index} onDoubleClick={() => handleSeleteMusic(song)}>
                        <div className={cx('wrap-song')}>
                            <div className={cx('left')}>
                                <div className={cx('song-img')}>
                                    <Image src={song.iamgeMusic} alt={song.name} />
                                    <div className={cx('play-btn-sm')} onClick={() => handleSeleteMusic(song)}>
                                        <BtnIcon
                                            isTrue={true}
                                            content={`Phát bài hát của ${song.aboutArtist.name}`}
                                            subContent="Tạm dừng"
                                            toggle={mount}
                                            changeIcon={<PauseIcon height="1.4rem" width="1.4rem" />}
                                            icon={<PlayIcon height="1.4rem" width="1.4rem" />}
                                        />
                                    </div>
                                </div>
                                <div className={cx('song-info')}>
                                    <h5 className={cx('', { isplaying: currentMusic === song })}>{song.name}</h5>
                                    <p>{song.aboutArtist.name}</p>
                                </div>
                            </div>
                            <div className={cx('right')}>
                                <Actions music={song} />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ListSearch;
