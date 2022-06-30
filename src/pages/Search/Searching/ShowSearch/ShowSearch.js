import classNames from 'classnames/bind';
import Image from '../../../../components/Image';
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
                    return (
                        <div className={cx('col')} key={index}>
                            <div className={cx('item')}>
                                <div className={cx('img')}>
                                    <Image
                                        src={avatar ? item.avatar : item.iamgeMusic}
                                        alt={item.author}
                                        className={cx('', {
                                            avatar,
                                        })}
                                    />
                                </div>
                                <div className={cx('info')}>
                                    <h2>{avatar ? item.author : item.name}</h2>
                                    <p>{avatar ? title : item.kinds[0]}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ShowSearch;
