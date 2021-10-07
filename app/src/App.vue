<template>
  <div id="app" class="container">
    <h2 class="text-primary">{{ title }}</h2>
    <SearchForm
      @clickModalButton="showOverlayScreen"
      @clickEscButton="closeOverlayScreen"
    />
    <div :class="showOverlay"></div>
  </div>
</template>

<script>
import SearchForm from "@/components/SearchForm.vue";

export default {
  name: "App",
  components: {
    SearchForm,
  },
  data() {
    return {
      title: "Google Search Books",
      showOverlay: {
        overlay: true,
        overlay_open: false,
      },
    };
  },
  methods: {
    showOverlayScreen() {
      if (this.showOverlay.overlay) {
        this.showOverlay.overlay_open = true;
      }
    },
    closeOverlayScreen() {
      if (this.showOverlay.overlay_open) {
        this.showOverlay.overlay_open = false;
      }
    },
  },
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

li {
  list-style: none;
}

.overlay {
  $color_white_90: rgba(255, 255, 255, 0.9);

  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  width: 100%;
  height: 100%;
  display: none;
  background: $color_white_90;
}

.overlay_open {
  display: block;
}
</style>
