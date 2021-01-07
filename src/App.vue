<template>
  <div>
    <div class="container">
      <video class="input_video"></video>
      <canvas class="output_canvas" width="1280px" height="720px"></canvas>
      <div class="loading">
        <div class="spinner"></div>
        <div class="message">
          Loading
        </div>
      </div>
      <a class="abs logo" href="http://www.mediapipe.dev" target="_blank">
        <div style="display: flex;align-items: center;bottom: 0;right: 10px;">
          <img
            class="logo"
            src="logo_white.png"
            alt=""
            style="
            height: 50px;"
          />
          <span class="title">MediaPipe</span>
        </div>
      </a>
      <div class="shoutout">
        <div>
          <a href="https://code.mediapipe.dev/codepen/holistic">
            Click here to edit in CodePen
          </a>
        </div>
        <div>
          <a href="https://solutions.mediapipe.dev/holistic">
            Click here for more info
          </a>
        </div>
      </div>
    </div>
    <div class="control-panel"></div>
  </div>
</template>

<script>
import { Camera } from "@mediapipe/camera_utils/camera_utils.js";
import { Holistic } from "@mediapipe/holistic/holistic.js";

console.log(Camera);

export default {
  name: "App",
  mounted() {
    // Our input frames will come from here.
    const videoElement = document.getElementsByClassName("input_video")[0];

    // function connect(ctx, connectors) {
    //   const canvas = ctx.canvas;
    //   for (const connector of connectors) {
    //     const from = connector[0];
    //     const to = connector[1];
    //     if (from && to) {
    //       if (
    //         from.visibility &&
    //         to.visibility &&
    //         (from.visibility < 0.1 || to.visibility < 0.1)
    //       ) {
    //         continue;
    //       }
    //       ctx.beginPath();
    //       ctx.moveTo(from.x * canvas.width, from.y * canvas.height);
    //       ctx.lineTo(to.x * canvas.width, to.y * canvas.height);
    //       ctx.stroke();
    //     }
    //   }
    // }

    // function onResults(results) {
    //   // Hide the spinner.
    //   document.body.classList.add("loaded");

    //   // Remove landmarks we don't want to draw.
    //   removeLandmarks(results);

    //   // Update the frame rate.
    //   fpsControl.tick();

    //   // Draw the overlays.
    //   canvasCtx.save();
    //   canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    //   canvasCtx.drawImage(
    //     results.image,
    //     0,
    //     0,
    //     canvasElement.width,
    //     canvasElement.height
    //   );
    //   // Pose...
    //   drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
    //     color: "#00FF00"
    //   });
    //   drawLandmarks(canvasCtx, results.poseLandmarks, {
    //     color: "#00FF00",
    //     fillColor: "#FF0000"
    //   });

    //   // Hands...
    //   drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS, {
    //     color: "#00CC00"
    //   });
    //   drawLandmarks(canvasCtx, results.rightHandLandmarks, {
    //     color: "#00FF00",
    //     fillColor: "#FF0000"
    //   });
    //   drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS, {
    //     color: "#CC0000"
    //   });
    //   drawLandmarks(canvasCtx, results.leftHandLandmarks, {
    //     color: "#FF0000",
    //     fillColor: "#00FF00"
    //   });

    //   // Face...
    //   drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_TESSELATION, {
    //     color: "#C0C0C070",
    //     lineWidth: 1
    //   });
    //   drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_RIGHT_EYE, {
    //     color: "#FF3030"
    //   });
    //   drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_RIGHT_EYEBROW, {
    //     color: "#FF3030"
    //   });
    //   drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_LEFT_EYE, {
    //     color: "#30FF30"
    //   });
    //   drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_LEFT_EYEBROW, {
    //     color: "#30FF30"
    //   });
    //   drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_FACE_OVAL, {
    //     color: "#E0E0E0"
    //   });
    //   drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_LIPS, {
    //     color: "#E0E0E0"
    //   });

    //   // Connect elbows to hands.
    //   canvasCtx.lineWidth = 5;
    //   if (results.poseLandmarks) {
    //     if (results.rightHandLandmarks) {
    //       canvasCtx.strokeStyle = "#00FF00";
    //       connect(canvasCtx, [
    //         [
    //           results.poseLandmarks[POSE_LANDMARKS.RIGHT_ELBOW],
    //           results.rightHandLandmarks[0]
    //         ]
    //       ]);
    //     }
    //     if (results.leftHandLandmarks) {
    //       canvasCtx.strokeStyle = "#FF0000";
    //       connect(canvasCtx, [
    //         [
    //           results.poseLandmarks[POSE_LANDMARKS.LEFT_ELBOW],
    //           results.leftHandLandmarks[0]
    //         ]
    //       ]);
    //     }
    //   }

    //   canvasCtx.restore();
    // }

    const holistic = new Holistic({
      locateFile: file => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic@0.1/${file}`;
      }
    });
    holistic.onResults(results => {
      console.log(results);
    });

    /**
     * Instantiate a camera. We'll feed each frame we receive into the solution.
     */
    const camera = new Camera(videoElement, {
      onFrame: async () => {
        await holistic.send({ image: videoElement });
      },
      width: 1280,
      height: 720
    });
    camera.start();
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
