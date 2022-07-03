import { useSelector } from 'react-redux';

import ShowSearch from './ShowSearch';
import NoResult from '../../../components/NoResult';
import Image from '../../../components/Image';

import classNames from 'classnames/bind';
import styles from './Searching.module.scss';
import ListSearch from './ListSearch';

const cx = classNames.bind(styles);

function Seaching() {
    const search = useSelector((state) => state.search);
    const { songSearch, authorSearch, kindSearch } = search;

    return (
        <div className={cx('wrapper')}>
            {songSearch.length > 0 ? (
                <>
                    <nav className={cx('nav')}></nav>
                    <div className={cx('container')}>
                        <div className={cx('heading')}>
                            <div className={cx('row')}>
                                <div className={cx('col-top')}>
                                    <div className={cx('top')}>
                                        <div className={cx('title')}>
                                            <h2>Kết quả hàng đầu</h2>
                                        </div>
                                        <div className={cx('wrap-top')}>
                                            <div className={cx('top-img')}>
                                                <Image src={songSearch[0]?.iamgeMusic} alt={songSearch[0].name} />
                                            </div>
                                            <div className={cx('top-info')}>
                                                <h2>{songSearch[0].name}</h2>
                                                <p>{songSearch[0].author}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('col-songs')}>
                                    <div className={cx('songs')}>
                                        <div className={cx('title')}>
                                            <h2>Bài hát</h2>
                                        </div>
                                        <ListSearch stopAt={3} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('body')}>
                            <ShowSearch title="Nghệ sĩ" list={authorSearch} avatar={true} />
                            <ShowSearch title="Album" list={songSearch} />
                            <ShowSearch title="Thể loại" list={kindSearch} />
                        </div>
                        <div className={cx('footer')}>
                            <div className={cx('line')}></div>
                        </div>
                    </div>
                </>
            ) : (
                <div>
                    {kindSearch && (
                        <div>
                            <ShowSearch title="Có thể bạn sẽ biết" list={authorSearch} avatar={true} />
                            <ShowSearch title="Liên quan" list={kindSearch} />
                        </div>
                    )}
                    <NoResult />
                </div>
            )}
        </div>
    );
}

export default Seaching;
