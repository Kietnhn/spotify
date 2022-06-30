import { useSelector } from 'react-redux';

import classNames from 'classnames/bind';
import styles from './Playlist.module.scss';
import Album from './Album';

const cx = classNames.bind(styles);

function Playlist() {
    const musicFeatures = useSelector((state) => state.music);
    const { currentAlbum } = musicFeatures;
    return (
        <div className={cx('playlist')}>
            <Album album={currentAlbum} />
        </div>
    );
}

export default Playlist;
