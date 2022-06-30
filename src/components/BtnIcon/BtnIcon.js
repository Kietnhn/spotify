import Tippy from '@tippyjs/react';

// import { forwardRef } from 'react';
import classNames from 'classnames/bind';
import styles from './BtnIcon.module.scss';

const cx = classNames.bind(styles);

const BtnIcon = (
    { icon, toggle = false, changeIcon, onClick, className, disable, content, subContent, isTrue = true },
    ref,
) => {
    return (
        <Tippy
            interactive
            placement="top"
            delay={[1500, 0]}
            content={content && <span className={cx('popper')}>{isTrue ? content : subContent}</span>}
        >
            <button
                className={cx('wrapper', {
                    [className]: className,
                    disable,
                })}
                ref={ref}
                onClick={onClick}
            >
                {toggle ? changeIcon : icon}
            </button>
        </Tippy>
    );
};

export default BtnIcon;
