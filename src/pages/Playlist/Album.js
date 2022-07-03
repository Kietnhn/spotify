import { useState } from 'react';
import { useDispatch } from 'react-redux';

import BtnIcon from '../../components/BtnIcon';
import { ClockIcon, MenuBarIcon, TymIcon } from '../../components/Icons';
import ListQueue from '../Queue/ListQueue/ListQueue';
import NoAlbum from '../../components/NoAlbum';
import Image from '../../components/Image';
import { setCurrentMusic } from '../../features/Music/Music';
import ButtonPlay from '../../components/ButtonPlay';

import classNames from 'classnames/bind';
import styles from './Playlist.module.scss';
const cx = classNames.bind(styles);

function Album({ album, favorite = false, add = false }) {
    const dispatch = useDispatch();

    const [mount, setMount] = useState(false);

    const handleSelectSong = (song) => {
        dispatch(setCurrentMusic(song));
        setMount(true);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('wrap-header')}>
                    <div className={cx('album-img')}>
                        {album?.fallback ? (
                            <div className={cx('fallback')} style={{ backgroundColor: album.fallback }}>
                                <div className={cx('fallback-name')}>
                                    <h2>{album?.name}</h2>
                                </div>
                            </div>
                        ) : (
                            <Image src={album.iamgeMusic} alt={album.name} />
                        )}
                    </div>
                    <div className={cx('info')}>
                        <div className={cx('type')}>Playlist</div>
                        <h1 className={cx('name')}>{album?.name}</h1>
                        <div className={cx('description')}>{album?.description}</div>
                    </div>
                </div>
            </div>
            {album?.album?.length > 0 ? (
                <>
                    <div className={cx('btns')}>
                        <ButtonPlay album={album} mount={mount} setMount={setMount} />
                        {!favorite && (
                            <>
                                <BtnIcon
                                    icon={<TymIcon width="32" height="32" />}
                                    isTrue={true}
                                    content="Lưu vào thư viện"
                                />
                                <BtnIcon icon={<MenuBarIcon width="32" height="32" />} isTrue={true} content="Khác" />
                            </>
                        )}
                    </div>
                    <div className={cx('container', { add })}>
                        <div className={cx('heading')}>
                            <div className={cx('wrap-heading')}>
                                <div className={cx('stt')}>#</div>
                                <div className={cx('heading-name')}>Tiêu đề</div>
                            </div>
                            <div className={cx('album')}>Album</div>
                            <div className={cx('time')}>
                                <BtnIcon icon={<ClockIcon />} />
                            </div>
                        </div>
                        {album?.album.map((song, index) => {
                            return (
                                <ListQueue
                                    key={index}
                                    music={song}
                                    index={index + 1}
                                    onDoubleClick={() => handleSelectSong(song)}
                                />
                            );
                        })}
                    </div>
                </>
            ) : (
                <>{favorite && <NoAlbum />}</>
            )}
            {!add && (
                <div className={cx('footer', { 'add-footer': add })}>
                    <div className={cx('line')}></div>
                </div>
            )}
        </div>
    );
}

export default Album;
