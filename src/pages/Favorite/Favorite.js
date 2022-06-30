import { useSelector } from 'react-redux';

import classNames from 'classnames/bind';
import styles from './Tracks.module.scss';
import Album from '../Playlist/Album';
import favoriteImage from '../../assets/img/favorite-album-image.png';
const cx = classNames.bind(styles);

function Favorite() {
    const favoriteList = useSelector((state) => state.favoriteList);
    const newList = {
        name: 'Bài hát đã thích',
        description: '',
        iamgeMusic: favoriteImage,
        album: favoriteList,
    };
    return (
        <div className={cx('Favorite')}>
            <Album album={newList} favorite={true} />
        </div>
    );
}

export default Favorite;
