import React from 'react';
import Hls from 'hls.js';

import SOURCES from "./videoList";
import './App.css';
import Slider from "antd/lib/slider";
import Icon from "antd/lib/icon";

class App extends React.Component {
    videoRefs = [React.createRef(), React.createRef(), React.createRef()];
    hlsArr = ["", "", ""];

    state = {
        isPlaying: false,
    }

    componentDidMount() {
        this.videoRefs.forEach((item, index) => {
            const hls = new Hls();
            this.hlsArr[index] = hls;
            hls.loadSource(SOURCES[index].src);
            hls.attachMedia(item.current);
        })

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
            item.current.play()
        })
        this.setState({
            isPlaying: true
        })
    };

    handlePause = () => {
        this.videoRefs.forEach((item) => {
            item.current.pause()
        })
        this.setState({
            isPlaying: false
        })
    };

    handleChange = (value) => {
        this.videoRefs.forEach((item) => {
            item.current.currentTime = value
        })
    };

    render() {
        const {isPlaying} = this.state;
        return (
            <div className="App">
                <header>
                    <h1>Test Video</h1>
                </header>
                <div className="videoList">
                    {SOURCES.map((item, index) => (
                        <video
                            key={index}
                            ref={this.videoRefs[index]}
                            width="400"
                            poster={item.poster}
                            crossOrigin
                            playsInline
                        />
                    ))}
                </div>
                <div className="icon-wrapper">
                    {
                        isPlaying
                            ? <Icon type="pause-circle" onClick={this.handlePause}/>
                            : <Icon type="play-circle" onClick={this.handlePlay}/>
                    }
                    <Slider onChange={this.handleChange}/>
                </div>
            </div>
        );
    }
}

export default App;
