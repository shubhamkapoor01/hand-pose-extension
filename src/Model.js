import React, { useRef, useState } from 'react'
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import * as fp from 'fingerpose';
import { drawHand, getHandPose } from './utilities';

function Model(props) {
	const webcamRef = useRef(null);
	const canvasRef = useRef(null);

	const runHandpose = async () => {
		const cnn = await handpose.load();
		setInterval(() => {
			detect(cnn);
		}, 100);
	}

	const detect = async (cnn) => {
		if (typeof webcamRef.current === 'undefined' || 
			webcamRef.current === null || 
			webcamRef.current.video.readyState !== 4) {
				return;
		}

		const video = webcamRef.current.video;
		const videoWidth = video.videoWidth;
		const videoHeight = video.videoHeight;

		webcamRef.current.video.width = videoWidth;
		webcamRef.current.video.Height = videoHeight;

		canvasRef.current.width = videoWidth;
		canvasRef.current.height = videoHeight;

		const hand = await cnn.estimateHands(video);

		if (hand.length > 0) {
			const ge = new fp.GestureEstimator([
				fp.Gestures.VictoryGesture,
				fp.Gestures.ThumbsUpGesture,
			]);

			const gesture = await ge.estimate(hand[0].landmarks, 8);

			if (gesture.gestures.length > 0) {
				props.setGestureState(getHandPose(gesture.poseData));
			}
		}

		const ctx = canvasRef.current.getContext('2d');
		drawHand(hand, ctx);
	}

	runHandpose();

	return (
		<div className="model">
			<Webcam 
				ref={webcamRef}
				style={{
					position: "absolute",
					left: 0,
					right: 0,
					width: "400px",
					Height: "700px"
				}}
			/>
			<canvas
				ref={canvasRef}
				style={{
					position: "absolute",
					left: 0,
					right: 0,
					width: "400px",
					Height: "700px"
				}}
			/>
		</div>
	)
}

export default Model
