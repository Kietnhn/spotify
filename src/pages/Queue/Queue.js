import { useDispatch, useSelector } from 'react-redux';

import { setCurrentMusic, setCurrentAlbum, setTogglePlay } from '../../features/Music/Music';
import FooterLine from '../../components/FooterLine';

import ListQueue from './ListQueue/ListQueue';

import classNames from 'classnames/bind';
import styles from './Queue.module.scss';

const cx = classNames.bind(styles);

function Queue() {
    const dispatch = useDispatch();
    const musicFeatures = useSelector((state) => state.music);
    const { currentAlbum, currentMusic } = musicFeatures;

    // useEffect(() => {
    //     console.log('currentAlbum', currentAlbum);
    // }, [currentAlbum]);
    // console.log('currentAlbum ', currentAlbum);
    // console.log('currentMusic ', currentMusic);
    // console.log('indexSong ', indexSong);
    const handlePlayCurrentMusic = () => {
        const audio = document.querySelector('#audio');
        audio.play();
        dispatch(setTogglePlay(true));
    };
    const handleSelectSong = (song, index) => {
        // const newListMusic = currentAlbum.album.filter((item) => item !== song);
        // newListMusic.unshift(song);
        const newListMusic = currentAlbum.album.filter((item, i) => i >= index);
        // console.log('new ', newListMusic);
        const newAlbum = {
            ...currentAlbum,
            album: newListMusic,
        };
        dispatch(setCurrentAlbum(newAlbum));
        dispatch(setCurrentMusic(song));
    };
    return (
        <div className={cx('queue')}>
            <div className={cx('wrapper')}>
                <h1>Danh sách chờ</h1>
                <h2>Đang phát</h2>
                <div className={cx('current-music')}>
                    <ListQueue music={currentMusic} index={1} onDoubleClick={handlePlayCurrentMusic} />
                </div>
                {currentAlbum.album.length > 0 && <h2 className={cx('wrap-from')}>Phát tiếp từ </h2>}
                <div className={cx('container')}>
                    {currentAlbum.album.map((song, index) => {
                        // eslint-disable-next-line array-callback-return
                        if (song.id === currentMusic.id) return;
                        return (
                            <ListQueue
                                key={index}
                                music={song}
                                index={index + 1}
                                onDoubleClick={() => handleSelectSong(song, index)}
                            />
                        );
                    })}
                </div>
                <FooterLine />
            </div>
        </div>
    );
}

export default Queue;
