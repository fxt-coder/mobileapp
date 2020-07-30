import NavBar from './NavBar.vue'
import cell from './cell.vue'

export default function (Vue) {
  console.log(Vue)
  Vue.component(NavBar.name, NavBar)
  Vue.component(cell.name, cell)
}
