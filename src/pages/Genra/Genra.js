import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import FooterLine from '../../components/FooterLine';
import ListMusic from '../../components/ListMusic';
import styles from './Genra.module.scss';

const cx = classNames.bind(styles);

function Genra() {
    const music = useSelector((state) => state.music);
    const { albumChoosedFadeAll } = music;
    console.log(albumChoosedFadeAll);
    return (
        <div className={cx('wrapper')}>
            <ListMusic
                listMusic={albumChoosedFadeAll.listMusic}
                title={albumChoosedFadeAll.title}
                subTitle={albumChoosedFadeAll.subTitle}
                fadeAll={true}
            />
            <FooterLine />
        </div>
    );
}

export default Genra;
