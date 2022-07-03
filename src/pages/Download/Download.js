import Image from '../../components/Image';
import downloadImage from '../../assets/img/download-image.png';
import classNames from 'classnames/bind';
import styles from './Download.module.scss';
const cx = classNames.bind(styles);
function Download() {
    return (
        <div className={cx('wrapper')}>
            <Image src={downloadImage} alt="download" className={cx('image')} />
            <h1 className={cx('title')}>
                Nghe nhạc bạn thích không gián đoạn. Tải xuống ứng dụng Spotify dành cho máy tính.
            </h1>
            <button className={cx('btn')}>
                <a href="https://www.spotify.com/download" target="_blank" rel="noopener noreferrer">
                    Tải ứng dụng miễn phí của chúng tôi
                </a>
            </button>
        </div>
    );
}

export default Download;
