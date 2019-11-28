import React, {Component} from "react";
import * as THREE from "three";
import {LINE_STEP, VIDEO_LENGTH} from "./constant";

const _width = 400;
const _height = 800;

export default class Three extends Component {
    timer = 1;
    animationId = null;
    scene = null;
    renderer = null;
    camera = null;
    line = null;

    componentDidMount() {
        /* To display anything, need a scene, a camera, and renderer */
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xffffff);
        this.camera = new THREE.PerspectiveCamera(
            90, //field of view
            _width / _height, //aspect ratio width/height
            0.1, //near
            1000 //far
        );
        this.camera.position.z = _width;
        this.camera.position.y = -_width;
        this.camera.position.x = _width;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(_width, _height);
        document.body.appendChild(this.renderer.domElement);
        let geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(400, 0, 0)); //x, y, z
        geometry.vertices.push(new THREE.Vector3(400, -this.timer * LINE_STEP, 0));
        geometry.verticesNeedUpdate = true;
        geometry.dynamic = true;

        let material = new THREE.LineBasicMaterial({color: 0x000000, linewidth: 5});
        this.line = new THREE.Line(geometry, material);
        this.scene.add(this.line);
        this.renderLine()
    }

    componentDidUpdate(prevProps) {
        const {isPlaying, currentTime, sliderTime} = this.props;
        if (isPlaying !== prevProps.isPlaying) {
            if (isPlaying) {
                this.handlePlay()
            } else {
                this.handlePause()
            }
        }
        // if (currentTime !== prevProps.currentTime) {
        //     this.handleChange(currentTime)
        // } else {
        //     this.handleCorrection(sliderTime)
        // }
    }

    renderLine = () => {
        this.renderer.render(this.scene, this.camera);
    }

    handlePause = () => {
        cancelAnimationFrame(this.animationId);
    }

    handlePlay = () => {
        const animate = () => {
            this.animationId = requestAnimationFrame(animate);
            this.renderLine();
        };
        animate();
        const timerInterval = setInterval(() => {
            this.timer = this.timer + 1;
            this.line.geometry.vertices[1].y = -this.timer * LINE_STEP;
            this.line.geometry.verticesNeedUpdate = true;
            if (this.timer === VIDEO_LENGTH) {
                this.timer = 0;
                clearInterval(timerInterval)
            }
        }, 1000)
    }

    render() {
        return (
            <div/>
        )
    }
}