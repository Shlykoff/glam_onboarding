<template>
  <div class="step-container wrapper">
    <video
      v-if="videoUrl"
      class="background-video"
      autoplay
      muted
      loop
      playsinline
    >
      <source :src="videoUrl" type="video/mp4" />
    </video>
    <video
      v-if="videoUrl"
      class="foreground-video"
      autoplay
      muted
      loop
      playsinline
    >
      <source :src="videoUrl" type="video/mp4" />
    </video>
    <img
      v-if="!isFirstStep"
      src="../assets/back.svg"
      class="button-previous"
      @click="$emit('previous')"
    />
    <img
      v-else
      src="../assets/back.svg"
      class="button-previous"
      @click="$emit('backToLanding')"
    />
    <div class="title-button-container">
      <p class="title">{{ title }}</p>
      <button v-if="!isLastStep" class="button-next" @click="$emit('next')">
        Next
      </button>
      <button v-else class="button-next" @click="$emit('finish')">
        Finish
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "OnboardingStep",
  props: {
    videoUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    isFirstStep: {
      type: Boolean,
      required: true,
    },
    isLastStep: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<style scoped>
.step-container {
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  overflow: hidden;
  justify-content: center;
  background-color: rgb(43, 43, 43);
}

.background-video {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(20px) brightness(50%);
  z-index: 1;
}

.foreground-video {
  position: relative;
  height: 100%;
  z-index: 5;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6);
}

.title-button-container {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  bottom: 3vh;
}
</style>
