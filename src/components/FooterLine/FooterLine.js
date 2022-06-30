import classNames from 'classnames/bind';
import styles from './FooterLine.module.scss';

const cx = classNames.bind(styles);

function FooterLine() {
    return (
        <div className={cx('footer')}>
            <div className={cx('line')}></div>
        </div>
    );
}

export default FooterLine;
