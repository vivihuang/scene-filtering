import React from "react";
import Hls from "hls.js";

const VIDEO_INFO = {
    "poster": "https://bitdash-a.akamaihd.net/content/sintel/poster.png",
    "src": "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
}

const VIDEO_AMOUNT = 4;

export default class Left extends React.Component {
    videoRefs = new Array(VIDEO_AMOUNT).fill("").map(() => React.createRef());
    hlsArr = new Array(VIDEO_AMOUNT);

    componentDidMount() {
        this.videoRefs.forEach((item, index) => {
            const hls = new Hls();
            this.hlsArr[index] = hls;
            hls.loadSource(VIDEO_INFO.src);
            hls.attachMedia(item.current);
        })

    }

    componentDidUpdate(prevProps) {
        const { isPlaying, currentTime, sliderTime } = this.props;
        if (isPlaying !== prevProps.isPlaying) {
            if (isPlaying) {
                this.handlePlay()
            } else {
                this.handlePause()
            }
        }
        if (currentTime !== prevProps.currentTime) {
            this.handleChange(currentTime)
        } else {
            this.handleCorrection(sliderTime)
        }
    }

    componentWillUnmount() {
        this.hlsArr.forEach((item) => {
            if (item) {
                item.destroy();
            }
        })
    }

    handlePlay = () => {
        this.videoRefs.forEach((item) => {
            if (item.current && item.current.paused) {
                item.current.play()
            }
        })

    };

    handlePause = () => {
        this.videoRefs.forEach((item) => {
            if (item.current && item.current.played) {
                item.current.pause()
            }
        })
    };

    handleChange = (value) => {
        this.videoRefs.forEach((item) => {
            if (item.current.currentTime !== value) {
                item.current.currentTime = value
            }
        })
    };

    handleCorrection = (value) => {
        this.videoRefs.forEach((item) => {
            if (item.current.currentTime <= value - 1) {
                item.current.currentTime = value
            }
        })
    };

    render() {
        return (
            <div className="left">
                <div className="videoList">
                    {this.videoRefs.map((item, index) => (
                        <video
                            key={index}
                            ref={item}
                            width="600"
                            poster={VIDEO_INFO.poster}
                            crossOrigin
                        />
                    ))}
                </div>
            </div>
        );
    }
}