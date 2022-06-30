import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FavoriteIcon } from '../Icons';
import styles from './NoAlbum.module.scss';

const cx = classNames.bind(styles);

function NoAlbum() {
    return (
        <div className={cx('no-album')}>
            <div className={cx('no-album-icon')}>
                <FavoriteIcon />
            </div>
            <h1 className={cx('no-album-title')}>Bài hát bạn yêu thích sẽ xuất hiện ở đây</h1>
            <p className={cx('no-album-des')}>Lưu bài hát bằng cách nhấn vào biểu tượng trái tim.</p>
            <Link to="/search" className={cx('no-album-btn')}>
                Tìm bài hát
            </Link>
        </div>
    );
}

export default NoAlbum;
