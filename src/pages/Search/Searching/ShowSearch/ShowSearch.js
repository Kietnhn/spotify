import ItemMusic from '../../../../components/ItemMusic';

import classNames from 'classnames/bind';
import styles from './ShowSearch.module.scss';

const cx = classNames.bind(styles);

function ShowSearch({ title, list = [], avatar = false }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <h1>{title}</h1>
            </div>
            <div className={cx('row')}>
                {list.map((item, index) => {
                    // eslint-disable-next-line array-callback-return
                    if (index > 4) return;
                    return <ItemMusic item={item} search={true} avatar={avatar} className={cx('col')} key={index} />;
                })}
            </div>
        </div>
    );
}

export default ShowSearch;
