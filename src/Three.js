import React, {Component} from "react";
import * as THREE from "three";

import {CAR_DOT, DYNAMIC_DOTS, LINES} from "./constant";

const _width = 400;
const _height = 800;

export default class Three extends Component {
    animationId = null;
    scene = null;
    renderer = null;
    camera = null;
    lines = new Array(LINES.length).fill("");
    dots = new Array(DYNAMIC_DOTS.length).fill("");

    componentDidMount() {
        this.initScene();
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
        if (currentTime !== prevProps.currentTime) {
            this.handleUpdate(currentTime)
        } else {
            this.handleUpdate(sliderTime)
        }
    }

    initScene = () => {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xffffff);
        this.camera = new THREE.PerspectiveCamera(
            90,
            _width / _height,
            0.1,
            1000
        );
        this.camera.position.z = _width;
        this.camera.position.y = -_width;
        this.camera.position.x = _width;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(_width, _height);
        document.body.appendChild(this.renderer.domElement);
        this.initLines();
        this.initDots();
        this.renderScene()
    }

    initDots = () => {
        const dotGeometry = new THREE.Geometry();
        dotGeometry.vertices.push(new THREE.Vector3(CAR_DOT.x, CAR_DOT.y, 0));
        const dotMaterial = new THREE.PointsMaterial({size: 10, color: CAR_DOT.color});
        const dot = new THREE.Points(dotGeometry, dotMaterial);
        this.scene.add(dot);
        DYNAMIC_DOTS.forEach((item, index) => {
            const dotGeometry = new THREE.Geometry();
            dotGeometry.vertices.push(new THREE.Vector3(item.x, item.y, 0));
            dotGeometry.verticesNeedUpdate = true;
            dotGeometry.dynamic = true;
            const dotMaterial = new THREE.PointsMaterial({size: 10, color: item.color});
            this.dots[index] = new THREE.Points(dotGeometry, dotMaterial);
            this.scene.add(this.dots[index]);
        })
    }

    initLines = () => {
        LINES.forEach((item, index) => {
            let geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(item.x, 0, 0)); //x, y, z
            geometry.vertices.push(new THREE.Vector3(item.x, item.y, 0));
            geometry.verticesNeedUpdate = true;
            geometry.dynamic = true;

            const material = new THREE.LineBasicMaterial({color: item.color, linewidth: 10});
            this.lines[index] = new THREE.Line(geometry, material);
            this.scene.add(this.lines[index]);
        })
    }

    renderScene = () => {
        this.renderer.render(this.scene, this.camera);
    }

    handlePause = () => {
        cancelAnimationFrame(this.animationId);
    }

    handlePlay = () => {
        const animate = () => {
            this.animationId = requestAnimationFrame(animate);
            this.renderScene();
        };
        animate();
    }

    handleUpdate = (timer) => {
        DYNAMIC_DOTS.forEach((item, index) => {
            this.dots[index].geometry.vertices[0].y = -(timer + 1) * item.yStep + item.y;
            this.dots[index].geometry.verticesNeedUpdate = true;
        })
    }

    render() {
        return (
            <div/>
        )
    }
}