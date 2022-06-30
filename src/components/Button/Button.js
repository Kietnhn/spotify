import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    href,
    to,
    children,
    onClick,
    small = false,
    large = false,
    text = false,
    icon = false,
    primary = false,
    rounded = false,
    outline = false,
    disable = false,
    center = false,
    className,
    ...passProps
}) {
    let Comp = 'button';

    const props = {
        onClick,
        ...passProps,
    };

    if (disable) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        primary,
        outline,
        small,
        large,
        text,
        disable,
        rounded,
        center,
        [className]: className,
    });

    return (
        <Comp className={classes} {...props}>
            <span className={cx('wrap')}>
                <span className={cx('title')}>{children}</span>
                {icon && <span className={cx('icon')}>{icon}</span>}
            </span>
        </Comp>
    );
}
Button.prototype = {
    children: PropTypes.node.isRequired,
    href: PropTypes.string,
    to: PropTypes.string,
    onClick: PropTypes.func,
    small: PropTypes.bool,
    large: PropTypes.bool,
    text: PropTypes.bool,
    icon: PropTypes.node,
    primary: PropTypes.bool,
    rounded: PropTypes.bool,
    outline: PropTypes.bool,
    disable: PropTypes.bool,
    center: PropTypes.string,
    className: PropTypes.string,
};
export default Button;
