import { useDispatch } from 'react-redux';
import { setIsDelete, deletePlaylist } from '../../../features/Playlist/Playlist';
import { Link } from 'react-router-dom';
import publicPaths from '../../../paths';

import classNames from 'classnames/bind';
import styles from './Delete.module.scss';

const cx = classNames.bind(styles);

function Delete({ title, index }) {
    const dispatch = useDispatch();
    const handleDeletePlaylist = (index) => {
        dispatch(deletePlaylist(index));
        dispatch(setIsDelete(undefined));
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <h2>{`Xóa ${title}?`}</h2>
                <div className={cx('btns')}>
                    <button className={cx('btn')} onClick={() => dispatch(setIsDelete(undefined))}>
                        Hủy
                    </button>
                    <Link
                        className={cx('btn', { 'delete-btn': true })}
                        to={publicPaths.collection}
                        onClick={() => handleDeletePlaylist(index)}
                    >
                        Xóa
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Delete;
