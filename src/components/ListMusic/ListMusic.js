import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAlbumChoosedFadeAll } from '../../features/Music/Music';
import { setTitle } from '../../features/Title/Title';
import publicPaths from '../../paths';

import classNames from 'classnames/bind';
import styles from './ListMusic.module.scss';
import ItemMusic from '../ItemMusic';

const cx = classNames.bind(styles);

function ListMusic({ listMusic = [], title, subTitle, fadeAll = false, avatar = false }) {
    const dispatch = useDispatch();

    const handleChooseAlbumFadeAll = (listMusic, title, subTitle) => {
        dispatch(
            setAlbumChoosedFadeAll({
                listMusic,
                title,
                subTitle,
            }),
        );
        dispatch(setTitle(title));
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('wrap-title')}>
                    <Link
                        className={cx('title')}
                        to={publicPaths.genra}
                        onClick={() => handleChooseAlbumFadeAll(listMusic, title, subTitle)}
                    >
                        {title}
                    </Link>
                    {subTitle && <h5 className={cx('subTitle')}>{subTitle}</h5>}
                </div>
                {!fadeAll && listMusic.length > 5 && (
                    <div>
                        <Link
                            to={publicPaths.genra}
                            className={cx('show-all-btn')}
                            onClick={() => handleChooseAlbumFadeAll(listMusic, title, subTitle)}
                        >
                            Xem tất cả
                        </Link>
                    </div>
                )}
            </div>
            <div className={cx('grid')}>
                <div className={cx('row')}>
                    {listMusic.map((item, index) => {
                        if (!fadeAll) {
                            if (index > 4) {
                                // eslint-disable-next-line array-callback-return
                                return;
                            }
                        }
                        return <ItemMusic key={index} item={item} className={cx('col')} avatar={avatar} />;
                    })}
                </div>
            </div>
        </div>
    );
}

export default ListMusic;
