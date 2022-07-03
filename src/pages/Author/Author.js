import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import BtnIcon from '../../components/BtnIcon';
import { CheckIcon } from '../../components/Icons';
import ButtonPlay from '../../components/ButtonPlay';
import { setCurrentMusic } from '../../features/Music/Music';
import FooterLine from '../../components/FooterLine';
import ListMusic from '../../components/ListMusic';
import ListQueue from '../Queue/ListQueue/ListQueue';
import songs from '../../components/Music/Music';
import Image from '../../components/Image';

import classNames from 'classnames/bind';
import styles from './Author.module.scss';
const cx = classNames.bind(styles);

function Author() {
    const dispatch = useDispatch();

    const [showAll, setShowAll] = useState(false);
    const [mount, setMount] = useState(false);

    const playlist = useSelector((state) => state.playlist);
    const { author } = playlist;
    // console.log('author', author);
    const listJoined = () => {
        const filter = songs.album.filter((song) => song.AllAuthor.includes(author.aboutArtist.name));
        return filter;
    };

    const listFollwed = () => {
        const filter = listJoined();
        const othernames = filter.map((item) => {
            return item.AllAuthor.filter((name) => name !== author.aboutArtist.name);
        });
        const names = new Set([...othernames].flat(1));
        const nameArray = Array.from(names);
        const listMusicOfOtherAuthor = [];
        for (let i = 0; i < nameArray.length; i++) {
            const otherAuthorLists = songs.album.find((song) => song.aboutArtist.name.includes(nameArray[i]));
            if (otherAuthorLists) {
                listMusicOfOtherAuthor.push(otherAuthorLists);
            }
        }
        return listMusicOfOtherAuthor;
    };

    const handleSelectSong = (song) => {
        dispatch(setCurrentMusic(song));
        setMount(true);
    };
    const handleToggleShowAll = () => {
        setShowAll(!showAll);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('heading')}>
                <div className={cx('wrap-heading')}>
                    <div className={cx('content-heading')}>
                        {author?.aboutArtist?.verification && (
                            <div className={cx('check')}>
                                <BtnIcon icon={<CheckIcon />} className={cx('check-icon')} />
                                <span>Nghệ sĩ được xác minh</span>
                            </div>
                        )}
                        <h1 className={cx('author')}>{author.aboutArtist.name}</h1>
                        <p className={cx('page')}>{author.aboutArtist.page}</p>
                    </div>
                </div>
            </div>
            <div className={cx('container')}>
                <div className={cx('btns')}>
                    <ButtonPlay album={author} mount={mount} setMount={setMount} />
                </div>
                <div className={cx('popular')}>
                    <h1 className={cx('title')}>Phổ biến</h1>
                    {author?.album.map((song, index) => {
                        if (!showAll) {
                            if (index > 4)
                                // eslint-disable-next-line array-callback-return
                                return;
                        }
                        return (
                            <ListQueue music={song} index={index + 1} onDoubleClick={handleSelectSong} key={index} />
                        );
                    })}
                    {author?.album.length > 5 && (
                        <div className={cx('show-all-btn')}>
                            <button onClick={handleToggleShowAll}>Xem thêm</button>
                        </div>
                    )}
                </div>
                <ListMusic listMusic={author.album} title="Danh sách Đĩa nhạc" />
                <ListMusic listMusic={listJoined()} title={`Sự xuất hiện của ${author.aboutArtist.name}`} />
                <ListMusic listMusic={listFollwed()} title={`Fan cũng thích`} avatar={true} />
                <div className={cx('introduce')}>
                    <h1 className={cx('title')}>Giới thiệu</h1>
                    <div className={cx('wrap-introduce')}>
                        <div className={cx('image')}>
                            {author.aboutArtist?.imageIntroduce ? (
                                <div
                                    className={cx('image-introduce')}
                                    style={{
                                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%), url(${author.aboutArtist.imageIntroduce})`,
                                    }}
                                ></div>
                            ) : (
                                <div className={cx('no-image-introduce')}>
                                    <div className={cx('image-no-introduce')}>
                                        <Image src={author.aboutArtist.avatar} alt={author.aboutArtist.name} />
                                    </div>
                                </div>
                            )}
                            {author.aboutArtist?.introduce && (
                                <div className={cx('info-introduce')}>
                                    <p> {author.aboutArtist.introduce} </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <FooterLine />
        </div>
    );
}

export default Author;
