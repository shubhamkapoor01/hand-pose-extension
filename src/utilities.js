const fingerJoints = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
};

// Infinity Gauntlet Style
const style = {
	0: { color: "cyan", size: 8 },
	1: { color: "cyan", size: 8 },
	2: { color: "cyan", size: 8 },
	3: { color: "cyan", size: 8 },
	4: { color: "cyan", size: 8 },
	5: { color: "cyan", size: 8 },
	6: { color: "cyan", size: 8 },
	7: { color: "cyan", size: 8 },
	8: { color: "cyan", size: 8 },
	9: { color: "cyan", size: 8 },
	10: { color: "cyan", size: 8 },
	11: { color: "cyan", size: 8 },
	12: { color: "cyan", size: 8 },
	13: { color: "cyan", size: 8 },
	14: { color: "cyan", size: 8 },
	15: { color: "cyan", size: 8 },
	16: { color: "cyan", size: 8 },
	17: { color: "cyan", size: 8 },
	18: { color: "cyan", size: 8 },
	19: { color: "cyan", size: 8 },
	20: { color: "cyan", size: 8 },
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
          ctx.strokeStyle = "white";
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

export const getHandPose = (poseData) => {
  console.log(poseData);

  if ((poseData[1][1] === 'Full Curl' || poseData[1][1] === 'Half Curl') && 
  (poseData[2][1] === 'Full Curl' || poseData[2][1] === 'Half Curl') &&
  (poseData[3][1] === 'Full Curl' || poseData[3][1] === 'Half Curl') && 
  (poseData[4][1] === 'Full Curl' || poseData[4][1] === 'Half Curl') &&
  (poseData[0][1] === 'Full Curl' || poseData[0][1] === 'Half Curl')) {
    return 'zero';
  }

  if ((poseData[1][1] === 'No Curl' || poseData[1][1] === 'Half curl') && 
  (poseData[2][1] === 'Full Curl' || poseData[2][1] === 'Half Curl') &&
  (poseData[3][1] === 'Full Curl' || poseData[3][1] === 'Half Curl') &&
  (poseData[4][1] === 'Full Curl' || poseData[4][1] === 'Half Curl') &&
  (poseData[0][1] === 'Full Curl' || poseData[0][1] === 'Half Curl')) {
    return 'one';
  }

  if ((poseData[1][1] === 'No Curl' || poseData[1][1] === 'Half Curl') &&
  (poseData[2][1] === 'No Curl' || poseData[2][1] === 'Half Curl') &&
  (poseData[3][1] === 'Full Curl' || poseData[3][1] === 'Half Curl') &&
  (poseData[4][1] === 'Full Curl' || poseData[4][1] === 'Half Curl') &&
  (poseData[0][1] === 'Full Curl' || poseData[0][1] === 'Half Curl')) {
    return 'two';
  }

  if ((poseData[1][1] === 'No Curl' || poseData[1][1] === 'Half Curl') &&
  (poseData[2][1] === 'No Curl' || poseData[2][1] === 'Half Curl') &&
  (poseData[3][1] === 'No Curl' || poseData[3][1] === 'Half Curl') &&
  (poseData[4][1] === 'Full Curl' || poseData[4][1] === 'Half Curl') &&
  (poseData[0][1] === 'Full Curl' || poseData[0][1] === 'Half Curl')) {
    return 'three';
  }

  if ((poseData[1][1] === 'No Curl' || poseData[1][1] === 'Half Curl') &&
  (poseData[2][1] === 'No Curl' || poseData[2][1] === 'Half Curl') &&
  (poseData[3][1] === 'No Curl' || poseData[3][1] === 'Half Curl') &&
  (poseData[4][1] === 'No Curl' || poseData[4][1] === 'Half Curl') &&
  (poseData[0][1] === 'Full Curl' || poseData[0][1] === 'Half Curl')) {
    return 'four';
  }

  if ((poseData[1][1] === 'No Curl' || poseData[1][1] === 'Half Curl') &&  
  (poseData[2][1] === 'No Curl' || poseData[2][1] === 'Half Curl') &&
  (poseData[3][1] === 'No Curl' || poseData[3][1] === 'Half Curl') &&
  (poseData[4][1] === 'No Curl' || poseData[4][1] === 'Half Curl') &&
  (poseData[0][1] === 'No Curl' || poseData[0][1] === 'Half Curl')) {
    return 'four';
  }

  return 'invalid';
}
