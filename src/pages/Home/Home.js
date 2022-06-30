import ListMusic from '../../components/ListMusic';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import songs, { data } from '../../components/Music/Music';

// console.log('data ', data);

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <ListMusic listMusic={songs.album} title="Tâm trạng" />
            <ListMusic
                listMusic={songs.album}
                title="Hoài niệm"
                subTitle="Những danh sách phát toàn các bản nhạc yêu thích, nghe mãi không chán."
            />

            <ListMusic listMusic={data.songs} title={data.title} subTitle={data.subTitle} />

            <ListMusic listMusic={songs.album} title="Tâm trạng" />
            <ListMusic listMusic={songs.album} title="Tâm trạng" />
        </div>
    );
}

export default Home;
