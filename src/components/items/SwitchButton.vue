<template>
  <button type="button" class="btn btn-switch switch-button" @click="toggle" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
    <div class="switch-container">
      <template v-if="type === SwitchTypes.SVG">
        <img :src="leftValue" class="flag-size" :class="{ active: currentSelection === Directions.LEFT }" :style="[leftStyle, hover && hoverStyle]" />
        <div class="separator"></div>
        <img :src="rightValue" class="flag-size" :class="{ active: currentSelection === Directions.RIGHT }" :style="[rightStyle, hover && hoverStyle]" />
      </template>
      <template v-else-if="type === SwitchTypes.ICON">
        <i class="icon-size" :class="[leftValue, { active: currentSelection === Directions.LEFT }]" :style="[leftStyle, hover && hoverStyle]"></i>
        <div class="separator"></div>
        <i class="icon-size" :class="[rightValue, { active: currentSelection === Directions.RIGHT }]" :style="[rightStyle, hover && hoverStyle]"></i>
      </template>
      <template v-else>
        <span :class="{ 'switch-txt': true, active: currentSelection === Directions.LEFT }" :style="[leftStyle, hover && hoverStyle]">{{ leftValue }}</span>
        <div class="separator"></div>
        <span :class="{ 'switch-txt': true, active: currentSelection === Directions.RIGHT }" :style="[rightStyle, hover && hoverStyle]">{{ rightValue }}</span>
      </template>
    </div>
    <div class="overlay" :class="overlayClass" :style="overlayStyle"></div>
  </button>
</template>

<script>
import Directions from "@/assets/enums/directions";
import SwitchTypes from "@/assets/enums/switch-types";
import ColorClasses from "@/assets/enums/color-classes";

export default {
  props: {
    leftValue: {
      type: String,
      required: true,
    },
    rightValue: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: SwitchTypes.ICON,
      validator: (value) => [SwitchTypes.SVG, SwitchTypes.ICON, SwitchTypes.TEXT].includes(value),
    },
    colorClass: {
      type: String,
      default: ColorClasses.PRIMARY,
      validator: (value) =>
        [ColorClasses.PRIMARY, ColorClasses.SECONDARY, ColorClasses.BLACKWHITE, ColorClasses.WARNING, ColorClasses.DANGER, ColorClasses.SUCCESS, ColorClasses.INFO, ColorClasses.LINK].includes(value),
    },
    defaultSelection: {
      type: String,
      default: Directions.LEFT,
      validator: (value) => [Directions.LEFT, Directions.RIGHT].includes(value),
    },
  },

  data() {
    return {
      currentSelection: this.defaultSelection,
      hover: false,
      isMobile: window.innerWidth <= 900,
      Directions,
      SwitchTypes,
      ColorClasses,
    };
  },

  mounted() {
    window.addEventListener("resize", this.handleResize);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },

  computed: {
    overlayStyle() {
      return {
        backgroundColor: `var(--${this.colorClass})`,
      };
    },

    overlayClass() {
      return {
        "left-selected": this.currentSelection === Directions.LEFT,
        "right-selected": this.currentSelection === Directions.RIGHT,
        "border-right": this.currentSelection === Directions.LEFT,
        "border-left": this.currentSelection === Directions.RIGHT,
      };
    },

    hoverStyle() {
      return this.isMobile ? {} : { color: "var(--white)" };
    },

    leftStyle() {
      return {
        color: this.currentSelection === Directions.LEFT ? "var(--white)" : "var(--black)",
      };
    },

    rightStyle() {
      return {
        color: this.currentSelection === Directions.RIGHT ? "var(--white)" : "var(--black)",
      };
    },
  },

  methods: {
    toggle() {
      this.currentSelection = this.currentSelection === Directions.LEFT ? Directions.RIGHT : Directions.LEFT;
    },

    handleResize() {
      this.isMobile = window.innerWidth <= 900;
    },

    handleMouseOver() {
      if (!this.isMobile) {
        this.hover = true;
      }
    },

    handleMouseLeave() {
      if (!this.isMobile) {
        this.hover = false;
      }
    },
  },
};
</script>

<style>
.switch-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.switch-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.switch-button img,
.switch-button i,
.switch-button .switch-txt {
  opacity: 0.5;
  transition: opacity 0.5s ease, color 0.5s ease;
}

.btn-switch {
  background-color: var(--white) !important;
  border: 2px solid var(--black) !important;
  color: var(--black) !important;
}

.btn-switch:focus {
  box-shadow: 0 0 5px 1px var(--black) !important;
}

.flag-size {
  width: 24px;
  height: 24px;
}

.icon-size {
  padding-top: 3px;
  font-size: 20px;
  width: 24px;
  height: 24px;
}

.switch-button img.active,
.switch-button i.active,
.switch-button .switch-txt.active {
  opacity: 1;
}

.separator {
  width: 2px;
  height: 24px;
  background-color: transparent !important;
  margin: 0 10px;
}

.overlay {
  position: absolute;
  top: 0;
  height: 100%;
  width: 50%;
  transition: all 0.5s ease;
  z-index: 0;
}

.left-selected {
  left: 0;
  width: 50%;
}

.right-selected {
  right: 0;
  width: 50%;
}

.border-right {
  border-right: 2px solid var(--black);
}

.border-left {
  border-left: 2px solid var(--black);
}

@media (min-width: 900px) {
  .switch-button:hover .overlay.left-selected {
    left: 0;
    width: 100%;
  }

  .switch-button:hover .overlay.right-selected {
    right: 0;
    width: 100%;
  }
}

@media (max-width: 900px) {
  .right-selected {
    left: 50%;
  }
}

.clicked.left-selected {
  left: 0;
  width: 100%;
}

.clicked.right-selected {
  right: 0;
  width: 100%;
}
</style>
