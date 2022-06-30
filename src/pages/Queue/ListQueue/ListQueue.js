import { useDispatch, useSelector } from 'react-redux';
import { addMusicToPlaylist, setCurrentPlaylist } from '../../../features/Playlist/Playlist';
import Image from '../../../components/Image';
import Actions from '../../../components/Actions';

import classNames from 'classnames/bind';
import styles from './ListQueue.module.scss';

const cx = classNames.bind(styles);

function ListQueue({ music, index, add = false, onDoubleClick }) {
    const dispatch = useDispatch();
    const newPlayList = useSelector((state) => state.playlist);
    const { indexPlaylist, currentPlaylist, playlists } = newPlayList;
    const handleAddMusicToNewPlaylist = (song) => {
        const tempPlaylist = { ...currentPlaylist };
        // console.log('before', tempPlaylist.album);
        tempPlaylist.album = [...currentPlaylist.album, song];
        // console.log('after', tempPlaylist.album);
        const newPlayList = [...playlists];
        newPlayList[indexPlaylist] = tempPlaylist;
        // console.log('new', newPlayList);
        dispatch(setCurrentPlaylist(tempPlaylist));
        dispatch(addMusicToPlaylist(newPlayList));
    };
    return (
        <div className={cx('wrapper')} onDoubleClick={onDoubleClick}>
            <div className={cx('wrap-music')}>
                <div className={cx('row')}>
                    {!add && <span className={cx('stt')}>{index}</span>}
                    <div className={cx('row')}>
                        <Image className={cx('img')} subSrc={music.avatar} src={music.iamgeMusic} alt={music.name} />
                        <div className={cx('info')}>
                            <h3 className={cx('name')}>{music.name}</h3>
                            <p className={cx('author')}>{music.author}</p>
                        </div>
                    </div>
                </div>
                <div className={cx('wrap-album-name')}>
                    <h3 className={cx('album-name')}>{music.name}</h3>
                </div>
                {add ? (
                    <div className={cx('add')}>
                        <button onClick={() => handleAddMusicToNewPlaylist(music)}>Thêm</button>
                    </div>
                ) : (
                    <Actions music={music} />
                )}
            </div>
        </div>
    );
}

export default ListQueue;
