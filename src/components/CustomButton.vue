<template>
  <button
    :class="[
      'rounded-md px-4 py-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2',
      variantClasses,
      sizeClasses,
      additionalClasses
    ]"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'CustomButton',
  props: {
    variant: {
      type: String,
      default: 'primary', // 'primary', 'secondary', 'outline', 'ghost'
      validator: value => ['primary', 'secondary', 'outline', 'ghost'].includes(value)
    },
    size: {
      type: String,
      default: 'md', // 'sm', 'md', 'lg'
      validator: value => ['sm', 'md', 'lg'].includes(value)
    },
    additionalClasses: {
      type: String,
      default: ''
    }
  },
  computed: {
    variantClasses() {
      const classes = {
        primary: 'bg-[#0033ea] text-white hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500',
        outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
        ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500'
      }
      return classes[this.variant]
    },
    sizeClasses() {
      const classes = {
        sm: 'text-sm py-1 px-3',
        md: 'text-base py-2 px-4',
        lg: 'text-lg py-3 px-6'
      }
      return classes[this.size]
    }
  }
}
</script>