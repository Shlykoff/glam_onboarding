<template>
  <div class="onboarding wrapper">
    <transition :name="transitionName" mode="out-in">
      <OnboardingStep
        :key="currentStep"
        :video-url="currentVideoUrl"
        :title="currentTitle"
        :is-first-step="isFirstStep"
        :is-last-step="isLastStep"
        @next="nextStep"
        @previous="previousStep"
        @finish="finishOnboarding"
        @backToLanding="backToLanding"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useOnboardingStore } from "@/store/onboarding";
import OnboardingStep from "@/components/OnboardingStep.vue";
import { sendStatistic } from "@/services/sendStatistic";

export default defineComponent({
  name: "Onboarding",
  components: {
    OnboardingStep,
  },
  setup() {
    const onboardingStore = useOnboardingStore();
    const router = useRouter();

    onBeforeUnmount(() => {
      onboardingStore.goToStep(1);
    });

    const finishOnboarding = async (): Promise<void> => {
      await sendStatistic({ isFinished: true });
      router.push("/");
    };

    const backToLanding = async (): Promise<void> => {
      router.push("/");
    };

    const titles = onboardingStore.titles;

    const currentStep = computed(() => onboardingStore.currentStep);
    const currentTitle = computed(() => titles[currentStep.value - 1]);

    const currentVideoUrl = computed(() => {
      const video = onboardingStore.videosCache[currentStep.value - 1];
      return video ? video.src : "";
    });

    const transitionName = computed(() =>
      onboardingStore.direction === "next" ? "slide-left" : "slide-right"
    );

    const nextStep = async () => {
      if (currentStep.value < titles.length) {
        onboardingStore.direction = "next";
        onboardingStore.currentStep++;
        await sendStatistic({ step: onboardingStore.currentStep });
      }
    };

    const previousStep = async () => {
      if (currentStep.value > 1) {
        onboardingStore.direction = "previous";
        onboardingStore.currentStep--;
        await sendStatistic({ step: onboardingStore.currentStep });
      }
    };

    return {
      currentStep,
      currentTitle,
      currentVideoUrl,
      nextStep,
      previousStep,
      finishOnboarding,
      backToLanding,
      transitionName,
      isFirstStep: computed(() => currentStep.value === 1),
      isLastStep: computed(() => currentStep.value === titles.length),
    };
  },
});
</script>

<style>
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.35s ease;
}
.slide-left-enter-from {
  transform: translateX(100%);
}
.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.35s ease;
}
.slide-right-enter-from {
  transform: translateX(-100%);
}
.slide-right-leave-to {
  transform: translateX(100%);
}
</style>
