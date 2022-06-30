import HeadlessTippy from '@tippyjs/react/headless';
import { useState } from 'react';
import Search from '../../components/Search';
import Button from '../../components/Button';
import BtnIcon from '../../components/BtnIcon';
import { CloseMenuIcon, LinkIcon, NextPageIcon, OpenMenuIcon, PrePageIcon } from '../../components/Icons';

import classNames from 'classnames/bind';
import styles from './Topbar.module.scss';

const cx = classNames.bind(styles);

function Topbar() {
    const [showMenu, setShowMenu] = useState(false);

    const handlePrevPage = () => {
        if (window.location.href === 'http://localhost:3006/') {
            return;
        }
        window.history.back();
    };
    const handleNextPage = () => {
        window.history.forward();
    };
    return (
        <header className={cx('wrapper')}>
            <div className={cx('below')}></div>
            <div className={cx('above')}>
                <div className={cx('diraction')}>
                    <BtnIcon onClick={handlePrevPage} icon={<PrePageIcon />} isTrue={true} content="Quay lại"></BtnIcon>
                    <BtnIcon
                        onClick={handleNextPage}
                        icon={<NextPageIcon />}
                        isTrue={true}
                        content="Tiếp theo"
                    ></BtnIcon>
                    {window.location.href === 'http://localhost:3006/search' && (
                        <Search placeholder="Nghệ sĩ, bài hát hoặc podcast" />
                    )}
                </div>
                <div className={cx('actions')}>
                    <div>
                        <button className={cx('update-btn')}>Nâng cấp</button>
                    </div>
                    <button className={cx('user', { showMenu })}>
                        <HeadlessTippy
                            offset={[10, 8]}
                            placement="bottom-end"
                            interactive
                            trigger="click"
                            render={() => {
                                return (
                                    <div className={cx('menu-action')}>
                                        <Button icon={<LinkIcon />}>Tài khoản</Button>
                                        <Button to="/user">Hồ sơ </Button>
                                        <Button to="/premium" icon={<LinkIcon />}>
                                            Nâng cấp lên Premium
                                        </Button>
                                        <Button>Đăng xuất </Button>
                                    </div>
                                );
                            }}
                        >
                            <div className={cx('action')} onClick={() => setShowMenu(!showMenu)}>
                                <img
                                    className={cx('avatar')}
                                    src="https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=191976869819137&height=300&width=300&ext=1658109910&hash=AeSoxRkGZ7-XDS_ICb0"
                                    alt="avatar"
                                />
                                <span>User</span>
                                <span className={cx('show-icon')}>
                                    {showMenu ? <CloseMenuIcon /> : <OpenMenuIcon />}
                                </span>
                            </div>
                        </HeadlessTippy>
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Topbar;
