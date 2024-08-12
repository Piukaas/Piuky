<template>
  <b-button rounded class="is-primary switch-button" @click="toggle">
    <div class="switch-container">
      <template v-if="type === 'svg'">
        <img :src="leftValue" alt="Left Image" :class="{ active: currentSelection === 'left' }" class="icon-size" />
        <div class="separator"></div>
        <img :src="rightValue" alt="Right Image" :class="{ active: currentSelection === 'right' }" class="icon-size" />
      </template>
      <template v-else-if="type === 'icon'">
        <i :class="[leftValue, { active: currentSelection === 'left' }]" :style="{ color: currentSelection === 'left' ? leftIconColor : '#000' }"></i>
        <div class="separator"></div>
        <i :class="[rightValue, { active: currentSelection === 'right' }]" :style="{ color: currentSelection === 'right' ? rightIconColor : '#000' }"></i>
      </template>
    </div>
    <div class="overlay" :class="overlayClass" :style="overlayStyle"></div>
  </b-button>
</template>

<script>
export default {
  name: "SwitchButton",
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
      validator: (value) => ["svg", "icon"].includes(value),
    },
    leftColor: {
      type: String,
      default: "#ffc107",
    },
    rightColor: {
      type: String,
      default: "#ffc107",
    },
    leftIconColor: {
      type: String,
      default: "#000",
    },
    rightIconColor: {
      type: String,
      default: "#000",
    },
    defaultSelection: {
      type: String,
      default: "left",
      validator: (value) => ["left", "right"].includes(value),
    },
  },
  data() {
    return {
      currentSelection: this.defaultSelection,
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
  },
  methods: {
    toggle() {
      this.currentSelection = this.currentSelection === "left" ? "right" : "left";
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
  padding: 0;
}

.switch-container {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
}

.switch-button img,
.switch-button i {
  opacity: 0.5;
  transition: opacity 0.5s ease;
}

.is-primary {
  background-color: transparent !important;
  border: 2px solid black !important;
  color: black !important;
}

.is-primary:focus {
  outline: none !important;
}

.switch-button img.active,
.switch-button i.active {
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

@media (max-width: 899px) {
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
