<template>
<div style='display:flex'>
<!-- <Menu style="width:30%" /> -->
<div id="container">
  <div class="mapTheme">
       <label>地图主题:</label>
         <select v-model="mapStyle" @change="changeStyle(mapStyle)">
   <!-- <option value="">请选择</option> -->
    <option v-for="item in styleList" :key="item.style" :value='item.style'>{{item.name}}</option>
  </select>
  </div>
  <div class="inputLng">
    <label>经度:</label>
    <input type="text" v-model="lng"/>
    <label>纬度:</label>
    <input type="text" v-model="lag"/>
    <button @click="addMark(lng,lag,+ new Date()+'定位')">解析</button>
  </div>
</div> 
</div>
</template>
<script>
// @ is an alias to /src
import {onMounted,ref,reactive,defineComponent} from 'vue'
// import AMapLoader from '@amap/amap-jsapi-loader';
import AMapLoader from '@amap/amap-jsapi-loader';
import { shallowRef } from '@vue/reactivity'
import { useMessage } from 'naive-ui'
import {handler} from '@/util/message.js'
// import Menu from '@/views/menu.vue'
export default defineComponent ({
  name: 'MapIndex',
  // components:{Menu},
  setup(){
    const message = useMessage()
     window.$message = useMessage()
      const map = shallowRef(null);
      let AmapObj =reactive(null);
      const mapStyle = ref('normal')
      const styleList = ref([])
      const lng = ref('')
      const lag = ref('')
      styleList.value=[
        {name:'标准',style:'normal'},
        {name:'马卡龙',style:'macaron'},
        {name:'涂鸦',style:'graffiti'},
        {name:'远山黛',style:'whitesmoke'},
        {name:'幻影黑',style:'dark'},
        {name:'草色青',style:'fresh'},
        {name:'极夜蓝',style:'darkblue'},
        {name:'湛清蓝',style:'blue'},
        {name:'月光银',style:'light'},
        {name:'雅士灰',style:'grey'},
      ]
      function initMap (){
         AMapLoader.load({
          "key": "429c00849904969d73e2fa09fddc2ba9",              // 申请好的Web端开发者Key，首次调用 load 时必填
          "version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
          "plugins": ['AMap.Scale','AMap.ToolBar','AMap.MouseTool','AMap.Geocoder'],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
          "AMapUI": {             // 是否加载 AMapUI，缺省不加载
              "version": '1.1',   // AMapUI 版本
              "plugins":['overlay/SimpleMarker'],       // 需要加载的 AMapUI ui插件
          },
          "Loca":{                // 是否加载 Loca， 缺省不加载
              "version": '2.0'  // Loca 版本
          },   // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        }).then((AMap)=>{
          AmapObj=AMap
              window._AMapSecurityConfig = {
                securityJsCode:'b4e3310fb049fd0b00ff481a66ec729e',
              }
          
            map.value = new AMap.Map("container",{  //设置地图容器id
                viewMode:"3D",    //是否为3D地图模式
                zoom:11,           //初始化地图级别
                // center:[105.602725,37.076636], //初始化地图中心点位置
               mapStyle: 'amap://styles/normal', //设置地图的显示样式
            });
                console.log(map)
            map.value.addControl(new AMap.Scale());
            map.value.addControl(new AMap.ToolBar());
            // var position = new AMap.LngLat(116, 39);  
            // map.value.setCenter(position); 
        }).catch(e=>{
            console.log(e);
        })
      }
      //添加标记点
      function addMark(lng,lat,title){
        if(!lng||!lat){
          alert('经纬度不全或没有名称添加失败;')
          return false;
        }
        let marker = new AmapObj.Marker({
            position: new AmapObj.LngLat(lng,lat),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: title||lng+lat,
            bubble:true
        });
        map.value.add(marker);  
      }// 创建一个 Marker 实例：

// 将创建的点标记添加到已有的地图实例：
      onMounted(()=>{
        initMap()
     handler()

        message.info(          "I don't know why nobody told you how to unfold your love",
          {
            keepAliveOnHover: true
          })
      })
      //更改主题;
      function changeStyle(newVal){
        console.log('更改地图主题==>',newVal)
          map.value.setMapStyle(`amap://styles/${newVal}`);
      }
      return {map,lng,lag,mapStyle,styleList,changeStyle,addMark}
  }
})
</script>
<style scoped>
#container {width:70%; height:100vh;} 
.mapTheme{position: absolute;  z-index: 150;top: 0;left: 40%;}
.inputLng{position:absolute; z-index: 150; }

</style>
