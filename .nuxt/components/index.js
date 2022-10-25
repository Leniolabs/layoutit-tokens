export { default as Tutorial } from '../../components/Tutorial.vue'
export { default as Leniologo } from '../../components/leniologo.vue'
export { default as IconsColor } from '../../components/icons/color.vue'
export { default as IconsCubicBezier } from '../../components/icons/cubicBezier.vue'
export { default as IconsDuration } from '../../components/icons/duration.vue'
export { default as IconsFontFamily } from '../../components/icons/fontFamily.vue'
export { default as IconsFontSize } from '../../components/icons/fontSize.vue'
export { default as IconsFontStyle } from '../../components/icons/fontStyle.vue'
export { default as IconsFontWeight } from '../../components/icons/fontWeight.vue'
export { default as IconsLetterSpacing } from '../../components/icons/letterSpacing.vue'
export { default as IconsLineHeight } from '../../components/icons/lineHeight.vue'
export { default as IconsMediaQuery } from '../../components/icons/mediaQuery.vue'
export { default as IconsOpacity } from '../../components/icons/opacity.vue'
export { default as IconsOther } from '../../components/icons/other.vue'
export { default as IconsRadius } from '../../components/icons/radius.vue'
export { default as IconsShadow } from '../../components/icons/shadow.vue'
export { default as IconsSpacing } from '../../components/icons/spacing.vue'
export { default as IconsUndefined } from '../../components/icons/undefined.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
