import { useDispatch, useSelector } from 'react-redux';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import Menu, { MenuItem } from './Menu';
import Tippy from '@tippyjs/react';
import {
    CollectionActiveIcon,
    CollectionIcon,
    DownloadIcon,
    HeartIcon,
    HomeActiveIcon,
    HomeIcon,
    LogoIcon,
    PlusIcon,
    SearchActiveIcon,
    SearchIcon,
} from '../../components/Icons';
import Delete from '../../components/Model/Delete';
import { setSearch } from '../../features/Search/Search';
import { addNewPlayList, setCurrentPlaylist, setIndexPlaylist, setIsDelete } from '../../features/Playlist/Playlist';
import Titles from '../../titles/Titles';
import { setTitle } from '../../features/Title/Title';
import publicPaths from '../../paths';

import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
const cx = classNames.bind(styles);

function Sidebar() {
    const dispatch = useDispatch();
    const newPlaylist = useSelector((state) => state.playlist);
    const { playlists, isDelete } = newPlaylist;
    const handleAddNewPlaylist = () => {
        const newPlaylist = {
            name: `Danh sách phát của tôi #${playlists.length + 1}`,
            description: 'User',
            iamgeMusic: '',
            album: [],
            isFadeInSearch: true,
        };
        dispatch(addNewPlayList(newPlaylist));
        dispatch(setCurrentPlaylist(newPlaylist));
        dispatch(setIndexPlaylist(playlists.length));
        dispatch(setTitle(Titles.new));
    };

    const handleSelectCurrentPlaylist = (item, index) => {
        dispatch(setCurrentPlaylist(item));
        dispatch(setIndexPlaylist(index));
        dispatch(setTitle(Titles.new));
        dispatch(setSearch(''));
    };
    return (
        <aside className={cx('wrapper')}>
            <div className={cx('content')}>
                <div>
                    <div className={cx('logo')}>
                        <Link
                            to={publicPaths.home}
                            className={cx('logo-link')}
                            onClick={() => dispatch(setTitle(Titles.home))}
                        >
                            <LogoIcon className={cx('icon')} />
                        </Link>
                    </div>
                    <div className={cx('menu')}>
                        <Menu>
                            <MenuItem
                                title="Trang chủ"
                                to={publicPaths.home}
                                icon={<HomeIcon />}
                                activeIcon={<HomeActiveIcon />}
                                onClick={() => dispatch(setTitle(Titles.home))}
                            />
                            <MenuItem
                                title="Tìm kiếm"
                                to={publicPaths.search}
                                icon={<SearchIcon />}
                                activeIcon={<SearchActiveIcon />}
                                onClick={() => dispatch(setTitle(Titles.search))}
                            />
                            <MenuItem
                                title="Thư viện"
                                to={publicPaths.collection}
                                icon={<CollectionIcon />}
                                activeIcon={<CollectionActiveIcon />}
                                onClick={() => dispatch(setTitle(Titles.collection))}
                            />
                        </Menu>
                    </div>
                    <div className={cx('actions')}>
                        <Menu>
                            <MenuItem
                                title="Tạo playlist"
                                to={publicPaths.new}
                                icon={
                                    <div className={cx('plus-icon')}>
                                        <PlusIcon />
                                    </div>
                                }
                                activeIcon={
                                    <span className={cx('plus-icon')}>
                                        <PlusIcon />
                                    </span>
                                }
                                onClick={handleAddNewPlaylist}
                            />
                            <MenuItem
                                title="Bài hát đã thích"
                                to={publicPaths.favorite}
                                icon={
                                    <span className={cx('heart-icon')}>
                                        <HeartIcon />
                                    </span>
                                }
                                activeIcon={
                                    <span className={cx('heart-icon')}>
                                        <HeartIcon />
                                    </span>
                                }
                                onClick={() => dispatch(setTitle(Titles.favorite))}
                            />
                        </Menu>
                    </div>
                    <div className={cx('nofication')}>
                        {playlists.map((item, index) => (
                            <Link to={publicPaths.new} key={index} className={cx('item-nof')}>
                                <Tippy
                                    interactive
                                    delay={[700, 0]}
                                    placement="right"
                                    content={
                                        <span
                                            className={cx('item-popper')}
                                            onClick={() => dispatch(setIsDelete(index))}
                                        >
                                            Xóa
                                        </span>
                                    }
                                >
                                    <p onClick={() => handleSelectCurrentPlaylist(item, index)}>{item.name}</p>
                                </Tippy>
                            </Link>
                        ))}
                    </div>
                </div>

                <Menu>
                    <MenuItem
                        title="Cài đặt Ứng dụng"
                        to={publicPaths.download}
                        icon={<DownloadIcon />}
                        onClick={() => dispatch(setTitle(Titles.download))}
                    />
                </Menu>
                {isDelete && <Delete title={playlists[isDelete].name} index={isDelete} />}
            </div>
        </aside>
    );
}

export default memo(Sidebar);
