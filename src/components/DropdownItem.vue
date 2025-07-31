<template>
  <a
    href="#"
    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    :class="[additionalClasses]"
    role="menuitem"
    @click="handleClick"
  >
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: 'DropdownItem',
  props: {
    additionalClasses: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
      // Close parent dropdown if exists
      let parent = this.$parent
      while (parent) {
        if (parent.$options.name === 'CustomDropdown') {
          parent.closeDropdown()
          break
        }
        parent = parent.$parent
      }
    }
  }
}
</script>