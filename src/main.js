import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import './assets/css/common.less';
import axios from 'axios'

Vue.use(ElementUI);
Vue.directive('drag', {
  // bind(el) {
  //   let setPos={
  //     x:0,
  //     y:0
  //   }
  //   let lastPos={
  //     x:0,
  //     y:0
  //   };
    // function move(curPos){
    //   const d={
    //     dX:curPos.x-lastPos.x,
    //     dY:curPos.y-lastPos.y
    //   };
    //   setPos.x+=d.dX;
    //   setPos.y+=d.dY;
    //   el.style.transform=`translate(${setPos.x}px,${setPos.y}px)`;
    //   lastPos.x=curPos.x;
    //   lastPos.y=curPos.y;
    // }
    // el.addEventListener("mousedown",(e)=>{
    //   e.stopPropagation();
    //   lastPos.x=e.clientX;
    //   lastPos.y=e.clientY;
    //   document.addEventListener('mousemove',mouseMove);
    //   document.addEventListener('mouseup',mouseUp)
    // });
    // function mouseMove(e) {
    //   const curPos={
    //     x:e.clientX,
    //     y:e.clientY
    //   }
    //   move(curPos)
    // }
    // function mouseUp(e) {
    //   e.stopPropagation();
    //   const curPos={
    //     x:e.clientX,
    //     y:e.clientY
    //   };
    //   move(curPos);
    //   document.removeEventListener("mousemove",mouseMove);
    //   document.removeEventListener('mouseup',mouseUp)
    // }
  // }
});
// 处理跨域接口
axios.defaults.baseURL = "http://172.30.54.151:8000"
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
new Vue({
  render: h => h(App),
}).$mount('#app')
