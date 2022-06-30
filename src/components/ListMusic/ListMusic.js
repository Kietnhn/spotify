import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeIndexSong, setCurrentAlbum, setCurrentMusic, setAlbumChoosedFadeAll } from '../../features/Music/Music';
import Image from '../Image';
import { PlayIcon } from '../Icons';
import { setTitle } from '../../features/Title/Title';
import classNames from 'classnames/bind';
import styles from './ListMusic.module.scss';

const cx = classNames.bind(styles);

function ListMusic({ listMusic = [], title, subTitle, fadeAll = false }) {
    const dispatch = useDispatch();
    const handleSelectAlbum = (item) => {
        if (item.album) {
            // console.log(item);
            dispatch(setCurrentAlbum(item));
            dispatch(changeIndexSong(0));
            dispatch(setCurrentMusic(item.album[0]));
        } else {
            const newAlbum = {
                name: item.name,
                description: item.description,
                iamgeMusic: item.iamgeMusic,
                album: [item],
            };
            // console.log(newAlbum);
            dispatch(setCurrentAlbum(newAlbum));
            dispatch(changeIndexSong(0));
            dispatch(setCurrentMusic(item));
        }
        dispatch(setTitle(item.name));
    };
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
                        to={`/genra`}
                        onClick={() => handleChooseAlbumFadeAll(listMusic, title, subTitle)}
                    >
                        {title}
                    </Link>
                    {subTitle && <h5 className={cx('subTitle')}>{subTitle}</h5>}
                </div>
                {!fadeAll && listMusic.length > 5 && (
                    <div>
                        <Link
                            to="/genra"
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
                        return (
                            <div key={index} className={cx('col')}>
                                <Link to="/playlist" className={cx('item')} onClick={() => handleSelectAlbum(item)}>
                                    <div className={cx('image')}>
                                        <Image src={item.iamgeMusic} subSrc={item.avatar} alt={item.name} />
                                        <div className={cx('play-wrap')}>
                                            <button className={cx('play-btn')}>
                                                <span className={cx('play-icon')}>
                                                    <PlayIcon />
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className={cx('info')}>
                                        <h3 className={cx('name')}>{item.name}</h3>
                                        <p className={cx('des')}>{item.description}</p>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ListMusic;
