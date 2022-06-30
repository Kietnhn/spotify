import classNames from 'classnames/bind';
import styles from './Image.module.scss';
import defaultIamge from '../../assets/img/default-image.png';
const cx = classNames.bind(styles);

function Image({ src, subSrc, alt, className }) {
    let url = defaultIamge;
    if (src) {
        url = src;
    } else if (subSrc) {
        url = subSrc;
    }
    return <img src={url} alt={alt} className={className} />;
}

export default Image;
