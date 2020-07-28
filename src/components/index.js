// 导入navBar组件
import NavBar from './NavBar.vue'
import cell from './cell.vue'
// 暴露function 让外部Use
// Vue是Vue.use传递进来的 Vue的构造函数
export default function (Vue) {
  // 全局注册 NavBar组件
  Vue.component(NavBar.name, NavBar)
  // 全局注册 Cell
  Vue.component(cell.name, cell)
}
