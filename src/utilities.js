const fingerJoints = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
};

// Infinity Gauntlet Style
const style = {
	0: { color: "red", size: 6 },
	1: { color: "red", size: 6 },
	2: { color: "red", size: 6 },
	3: { color: "red", size: 6 },
	4: { color: "red", size: 6 },
	5: { color: "red", size: 6 },
	6: { color: "red", size: 6 },
	7: { color: "red", size: 6 },
	8: { color: "red", size: 6 },
	9: { color: "red", size: 6 },
	10: { color: "red", size: 6 },
	11: { color: "red", size: 6 },
	12: { color: "red", size: 6 },
	13: { color: "red", size: 6 },
	14: { color: "red", size: 6 },
	15: { color: "red", size: 6 },
	16: { color: "red", size: 6 },
	17: { color: "red", size: 6 },
	18: { color: "red", size: 6 },
	19: { color: "red", size: 6 },
	20: { color: "red", size: 6 },
};

export const drawHand = (predictions, ctx) => {
  if (predictions.length > 0) {
    predictions.forEach((prediction) => {
      const landmarks = prediction.landmarks;

      for (let j = 0; j < Object.keys(fingerJoints).length; j++) {
        let finger = Object.keys(fingerJoints)[j];
        for (let k = 0; k < fingerJoints[finger].length - 1; k++) {
          const firstJointIndex = fingerJoints[finger][k];
          const secondJointIndex = fingerJoints[finger][k + 1];
          ctx.beginPath();
          ctx.moveTo(
            landmarks[firstJointIndex][0],
            landmarks[firstJointIndex][1]
          );
          ctx.lineTo(
            landmarks[secondJointIndex][0],
            landmarks[secondJointIndex][1]
          );
          ctx.strokeStyle = "plum";
          ctx.lineWidth = 4;
          ctx.stroke();
        }
      }

      for (let i = 0; i < landmarks.length; i++) {
        const x = landmarks[i][0];
        const y = landmarks[i][1];
        ctx.beginPath();
        ctx.arc(x, y, style[i]["size"], 0, 3 * Math.PI);
        ctx.fillStyle = style[i]["color"];
        ctx.fill();
      }
    });
  }
};