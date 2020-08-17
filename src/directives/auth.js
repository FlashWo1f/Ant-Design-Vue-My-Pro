import { check } from '@/utils/auth'

// 注册指令  但是这里的话有弊端  removeChild 就没办法加回来了  相对组件的Auth不够灵活
function install(Vue, options = {}) {
  Vue.directive(options.name || 'auth', {
    inserted(el, binding) {
      if (!check(binding.value)) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  })
}

export default { install }