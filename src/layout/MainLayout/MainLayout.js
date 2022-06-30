import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss';

import PropTypes from 'prop-types';
import { memo } from 'react';
import Sidebar from '../Sidebar';
import Topbar from '../Topbar';
import PlayingBar from '../PlayingBar';

const cx = classNames.bind(styles);

function MainLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Sidebar />
            <div className={cx('main')}>
                <div className={cx('view')}>
                    <Topbar />
                    <div className={cx('content')}>
                        <div className={cx('wrap-content')}>{children}</div>
                    </div>
                </div>
            </div>
            <PlayingBar />
        </div>
    );
}

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default memo(MainLayout);
