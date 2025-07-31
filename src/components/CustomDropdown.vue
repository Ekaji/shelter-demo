<template>
  <div class="relative" @mouseleave="isOpen = false">
    <div @mouseenter="handleMouseEnter" @click="toggleDropdown">
      <slot name="trigger" :isOpen="isOpen">
        <button class="flex items-center space-x-1 focus:outline-none">
          <span>{{ label }}</span>
          <svg
            :class="['w-4 h-4 transition-transform duration-200', { 'transform rotate-180': isOpen }]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
      </slot>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-show="isOpen"
        class="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        :class="[positionClasses, additionalClasses]"
        role="menu"
      >
        <div class="py-1">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'CustomDropdown',
  props: {
    label: {
      type: String,
      default: 'Dropdown'
    },
    position: {
      type: String,
      default: 'left', // 'left', 'right'
      validator: value => ['left', 'right'].includes(value)
    },
    hover: {
      type: Boolean,
      default: true
    },
    additionalClasses: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isOpen: false
    }
  },
  computed: {
    positionClasses() {
      return {
        left: 'left-0',
        right: 'right-0'
      }[this.position]
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    handleMouseEnter() {
      if (this.hover && window.innerWidth > 768) {
        this.isOpen = true
      }
    },
    closeDropdown() {
      this.isOpen = false
    }
  }
}
</script>