import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPlaylist, toggleFadeInSearch } from '../../features/Playlist/Playlist';
import ListQueue from '../Queue/ListQueue/ListQueue';
import Album from '../Playlist/Album';
import Search from '../../components/Search';
import BtnIcon from '../../components/BtnIcon';
import { ClearInputIcon } from '../../components/Icons';

import classNames from 'classnames/bind';
import styles from './NewPlayList.module.scss';

const cx = classNames.bind(styles);

function NewPlayList() {
    const dispatch = useDispatch();
    const search = useSelector((state) => state.search);
    const { songSearch, inputSearch } = search;

    const newPlayList = useSelector((state) => state.playlist);
    const { currentPlaylist, playlists, indexPlaylist } = newPlayList;
    console.log('playlists', playlists);
    console.log('indexPlaylist', indexPlaylist);

    const handleToggleFadeInSearch = () => {
        const tempPlaylist = { ...currentPlaylist };
        tempPlaylist.isFadeInSearch = !tempPlaylist.isFadeInSearch;
        const newPlayList = [...playlists];
        newPlayList[indexPlaylist] = tempPlaylist;
        dispatch(setCurrentPlaylist(tempPlaylist));
        dispatch(toggleFadeInSearch(newPlayList));
    };
    return (
        <div className={cx('wrapper')}>
            <Album album={currentPlaylist} add={!currentPlaylist.isFadeInSearch} />
            {currentPlaylist.isFadeInSearch ? (
                <div className={cx('search')}>
                    <div className={cx('wrap-search')}>
                        <div className={cx('left')}>
                            <h1>Hãy cùng tìm nội dung cho danh sách phát của bạn</h1>
                            <Search newPlaylist={true} placeholder="Tìm bài hát và tập podcast" />
                        </div>
                        <div className={cx('right')}>
                            <BtnIcon icon={<ClearInputIcon />} onClick={handleToggleFadeInSearch} />
                        </div>
                    </div>
                    <div className={cx('wrap-list')}>
                        {songSearch.length > 0 &&
                            inputSearch !== '' &&
                            songSearch.map((song, index) => (
                                <ListQueue key={index} music={song} index={index + 1} add={true} />
                            ))}
                    </div>
                </div>
            ) : (
                <div className={cx('wrap-search', { 'fade-in': true })}>
                    <button onClick={handleToggleFadeInSearch}>Tìm thêm</button>
                </div>
            )}
        </div>
    );
}

export default NewPlayList;
