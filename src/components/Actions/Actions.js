import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
// eslint-disable-next-line no-unused-vars
import momentDurationFormatSetup from 'moment-duration-format';

import { addFavoriteList, removeFavoriteList } from '../../features/FavoriteList/favoriteList';
import BtnIcon from '../BtnIcon';
import { MenuBarIcon, TymActiveIcon, TymIcon } from '../Icons';

import classNames from 'classnames/bind';
import styles from './Actions.module.scss';

const cx = classNames.bind(styles);
function Actions({ music }) {
    const favoriteList = useSelector((state) => state.favoriteList);
    const dispatch = useDispatch();
    const [duration, setDuration] = useState('');

    const formatDuration = (duration) => {
        return moment.duration(duration, 'seconds').format('mm:ss', { trim: false });
    };

    const handleFadeInDuration = (e) => {
        setDuration(formatDuration(e.target.duration));
    };
    const handleFavoriteList = () => {
        if (favoriteList.includes(music)) {
            const list = [...favoriteList];
            list.splice(favoriteList.indexOf(music), 1);
            dispatch(removeFavoriteList(list));
        } else {
            const list = [music, ...favoriteList];
            dispatch(addFavoriteList(list));
        }
    };
    return (
        <div className={cx('actions')}>
            <BtnIcon
                className={cx('action', {
                    active2: favoriteList.includes(music),
                })}
                icon={<TymIcon />}
                onClick={handleFavoriteList}
                isTrue={!favoriteList.includes(music)}
                content="Lưu vào thư viện"
                subContent="Xóa khỏi thư viện"
                toggle={favoriteList.includes(music)}
                changeIcon={<TymActiveIcon />}
            />
            <audio src={music.url} onLoadedMetadata={handleFadeInDuration} />
            <div className={cx('time')} id="time">
                {duration}
            </div>
            <BtnIcon className={cx('action')} isTrue={true} content="Khác" icon={<MenuBarIcon />} />
        </div>
    );
}

export default Actions;
