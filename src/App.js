import React from 'react';

import Left from "./Left";
import './App.css';
import Icon from "antd/lib/icon";
import Slider from "antd/lib/slider";

export default class App extends React.Component {
    timer = null;

    state = {
        currentTime: 0,
        sliderTime: 0,
        isPlaying: false,
    }

    handlePlay = () => {
        this.setState({
            isPlaying: true
        })
        this.handlePlaying()
    }

    handlePause = () => {
        this.setState({
            isPlaying: false
        })
        clearInterval(this.timer)
    }

    handlePlaying = () => {
        this.timer = setInterval(() => {
            this.setState((prevState) => ({
                sliderTime: prevState.sliderTime + 1
            }))
        }, 1000)
    }

    handleChange = (value) => {
        this.setState({
            currentTime: value,
            sliderTime: value,
        })
    }

    render() {
        const {isPlaying, currentTime, sliderTime} = this.state;
        return (
            <div className="app">
                <header>
                    <h1>Test Video</h1>
                </header>
                <div className="content">
                    <Left isPlaying={isPlaying} currentTime={currentTime} sliderTime={sliderTime}/>
                </div>
                <div className="icon-wrapper">
                    {
                        isPlaying
                            ? <Icon type="pause-circle" onClick={this.handlePause}/>
                            : <Icon type="play-circle" onClick={this.handlePlay}/>
                    }
                    <Slider onChange={this.handleChange} max={888} value={sliderTime} />
                </div>
            </div>
        );
    }
}
