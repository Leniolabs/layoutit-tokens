export { default as Leniologo } from '../../components/leniologo.vue'
export { default as IconsColor } from '../../components/icons/color.vue'
export { default as IconsCubicBezier } from '../../components/icons/cubicBezier.vue'
export { default as IconsDelete } from '../../components/icons/delete.vue'
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
export { default as IconsToken } from '../../components/icons/token.vue'
export { default as IconsUndefined } from '../../components/icons/undefined.vue'
export { default as PreviewsColor } from '../../components/previews/color.vue'
export { default as PreviewsDuration } from '../../components/previews/duration.vue'
export { default as PreviewsFontFamily } from '../../components/previews/fontFamily.vue'
export { default as PreviewsFontSize } from '../../components/previews/fontSize.vue'
export { default as PreviewsFontWeight } from '../../components/previews/fontWeight.vue'
export { default as PreviewsLetterSpacing } from '../../components/previews/letterSpacing.vue'
export { default as PreviewsLineHeight } from '../../components/previews/lineHeight.vue'
export { default as PreviewsMediaQuery } from '../../components/previews/mediaQuery.vue'
export { default as PreviewsOpacity } from '../../components/previews/opacity.vue'
export { default as PreviewsRadius } from '../../components/previews/radius.vue'
export { default as PreviewsShadow } from '../../components/previews/shadow.vue'
export { default as PreviewsSpacing } from '../../components/previews/spacing.vue'
export { default as PreviewsWrapper } from '../../components/previews/wrapper.vue'

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
