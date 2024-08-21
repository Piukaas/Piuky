<template>
  <button type="button" class="btn btn-switch switch-button" @click="toggle" @mouseover="hover = true" @mouseleave="hover = false">
    <div class="switch-container">
      <template v-if="type === 'svg'">
        <img :src="leftValue" :class="{ active: currentSelection === 'left' }" :style="[leftStyle, hover && currentSelection === 'right' && !isMobile ? hoverOppositeStyle : {}]" class="icon-size" />
        <div class="separator"></div>
        <img :src="rightValue" :class="{ active: currentSelection === 'right' }" :style="[rightStyle, hover && currentSelection === 'left' && !isMobile ? hoverOppositeStyle : {}]" class="icon-size" />
      </template>
      <template v-else-if="type === 'icon'">
        <i :class="[leftValue, { active: currentSelection === 'left' }]" :style="[leftStyle, hover && currentSelection === 'right' && !isMobile ? hoverOppositeStyle : {}]"></i>
        <div class="separator"></div>
        <i :class="[rightValue, { active: currentSelection === 'right' }]" :style="[rightStyle, hover && currentSelection === 'left' && !isMobile ? hoverOppositeStyle : {}]"></i>
      </template>
      <template v-else>
        <span :class="{ 'switch-txt': true, active: currentSelection === 'left' }" :style="[leftStyle, hover && currentSelection === 'right' && !isMobile ? hoverOppositeStyle : {}]">{{
          leftValue
        }}</span>
        <div class="separator"></div>
        <span :class="{ 'switch-txt': true, active: currentSelection === 'right' }" :style="[rightStyle, hover && currentSelection === 'left' && !isMobile ? hoverOppositeStyle : {}]">{{
          rightValue
        }}</span>
      </template>
    </div>
    <div class="overlay" :class="overlayClass" :style="overlayStyle"></div>
  </button>
</template>

<script>
import Colors from "@/assets/enums/colors";

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
      default: "svg",
      validator: (value) => ["svg", "icon", "txt"].includes(value),
    },
    leftColor: {
      type: String,
      default: Colors.YELLOW,
    },
    rightColor: {
      type: String,
      default: Colors.YELLOW,
    },
    defaultSelection: {
      type: String,
      default: "left",
      validator: (value) => ["left", "right"].includes(value),
    },
    leftTxtColor: {
      type: String,
      default: "black",
    },
    rightTxtColor: {
      type: String,
      default: "black",
    },
  },
  data() {
    return {
      currentSelection: this.defaultSelection,
      hover: false,
      Colors,
      isMobile: window.innerWidth <= 900,
    };
  },
  computed: {
    overlayStyle() {
      return {
        backgroundColor: this.currentSelection === "left" ? this.leftColor : this.rightColor,
      };
    },
    overlayClass() {
      return {
        "left-selected": this.currentSelection === "left",
        "right-selected": this.currentSelection === "right",
        "border-right": this.currentSelection === "left",
        "border-left": this.currentSelection === "right",
      };
    },
    leftStyle() {
      return {
        color: this.currentSelection === "left" ? this.leftTxtColor : "inherit",
      };
    },
    rightStyle() {
      return {
        color: this.currentSelection === "right" ? this.rightTxtColor : "inherit",
      };
    },
    hoverOppositeStyle() {
      return {
        color: this.currentSelection === "right" ? this.rightTxtColor : this.leftTxtColor,
      };
    },
  },
  methods: {
    toggle() {
      this.currentSelection = this.currentSelection === "left" ? "right" : "left";
    },
    handleResize() {
      this.isMobile = window.innerWidth <= 900;
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
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
  position: relative;
  z-index: 1;
}

.switch-button img,
.switch-button i,
.switch-button .switch-txt {
  opacity: 0.5;
  transition: opacity 0.5s ease, color 0.5s ease;
  color: black;
}

.btn-switch {
  background-color: transparent !important;
  border: 2px solid black !important;
  color: black !important;
}

.icon-size {
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
  border-right: 2px solid black;
}

.border-left {
  border-left: 2px solid black;
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
