import NavBar from './NavBar.vue'
import cell from './cell.vue'
import ShareList from './ShareList.vue'

function plugin (Vue) {
  console.log(Vue)
  Vue.component(NavBar.name, NavBar)
  Vue.component(cell.name, cell)
  Vue.component(ShareList.name, ShareList)
}
export default plugin
