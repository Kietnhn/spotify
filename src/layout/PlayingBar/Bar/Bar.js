import React, { useRef } from 'react';
import moment from 'moment';

// eslint-disable-next-line no-unused-vars
import momentDurationFormatSetup from 'moment-duration-format';

import classNames from 'classnames/bind';
import styles from './Bar.module.scss';

const cx = classNames.bind(styles);

export default function Bar(props) {
    const { duration, curTime, onTimeUpdate } = props;
    const bar = useRef();
    const curPercentage = (curTime / duration) * 100;

    function formatDuration(duration) {
        return moment.duration(duration, 'seconds').format('mm:ss', { trim: false });
    }

    function calcClickedTime(e) {
        const clickPositionInPage = e.pageX;
        const barStart = bar.current.getBoundingClientRect().left + window.scrollX;
        const barWidth = bar.current.offsetWidth;
        const clickPositionInBar = clickPositionInPage - barStart;
        const timePerPixel = duration / barWidth;
        return timePerPixel * clickPositionInBar;
    }

    function handleTimeDrag(e) {
        onTimeUpdate(calcClickedTime(e));

        const updateTimeOnMove = (eMove) => {
            onTimeUpdate(calcClickedTime(eMove));
        };

        document.addEventListener('mousemove', updateTimeOnMove);

        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', updateTimeOnMove);
        });
    }

    return (
        <div className={cx('bar')}>
            <span className={cx('bar__time')}>{formatDuration(curTime)}</span>
            <div ref={bar} className={cx('bar__progress')} onMouseDown={(e) => handleTimeDrag(e)}>
                <div
                    className={cx('bar__current__progress')}
                    style={{ right: `calc(100% - ${curPercentage}%)`, left: '0' }}
                ></div>
                <span className={cx('bar__progress__knob')} style={{ left: `${curPercentage - 2}%` }} />
            </div>
            <span className={cx('bar__time')}>{formatDuration(duration)}</span>
        </div>
    );
}
