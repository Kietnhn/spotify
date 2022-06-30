import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ title, to, icon, activeIcon, onClick }) {
    return (
        <NavLink to={to} className={(navData) => cx('menu-item', { active: navData.isActive })} onClick={onClick}>
            <span className={cx('icon')}>{icon}</span>
            {activeIcon && <span className={cx('active-icon')}>{activeIcon}</span>}
            <span className={cx('title')}>{title}</span>
        </NavLink>
    );
}

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
};
export default MenuItem;
