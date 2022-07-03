import { useSelector } from 'react-redux';

import classNames from 'classnames/bind';
import styles from './NoResult.module.scss';

const cx = classNames.bind(styles);

function NoResult() {
    const search = useSelector((state) => state.search);
    const { inputSearch } = search;
    return (
        <div className={cx('no-result')}>
            <div className={cx('warning')}>
                <h1>{`Không tìm thấy kết quả nào cho "${inputSearch}"`}</h1>
                <p>Vui lòng đảm bảo viết đúng chính tả, hoặc sử dụng ít từ khoá hơn hay thử các từ khoá khác</p>
            </div>
            <div className={cx('footer')}>
                <div className={cx('line')}></div>
            </div>
        </div>
    );
}

export default NoResult;
