import { defineStore } from "pinia";
import { ref } from "vue";

const videoUrls: Array<string> = JSON.parse(import.meta.env.VITE_VIDEO_URLS);
const titles: Array<string> = JSON.parse(
  import.meta.env.VITE_ONBOARDING_TITLES
);

export const useOnboardingStore = defineStore("onboarding", {
  state: () => ({
    videosCache: ref<{ [key: number]: HTMLVideoElement }>({}),
    currentStep: 1,
    direction: "next",
    titles,
  }),
  actions: {
    loadVideos() {
      videoUrls.forEach((url, index) => {
        if (!this.videosCache[index]) {
          const video = document.createElement("video");
          video.src = url;
          video.preload = "auto";
          this.videosCache[index] = video;
        }
      });
    },
    setNextDirection() {
      this.direction = "next";
    },
    setPreviousDirection() {
      this.direction = "previous";
    },
    goToStep(step: number) {
      this.currentStep = step;
    },
  },
});
