<template>
<!-- <div > -->
<!-- <Menu style="width:30%" /> -->
<div id="container">
  <!-- <div class="mapTheme">
       <label>地图主题:</label>
         <select v-model="mapStyle" @change="changeStyle(mapStyle)">
    <option v-for="item in styleList" :key="item.style" :value='item.style'>{{item.name}}</option>
  </select>
  </div>
  <div class="inputLng">
    <label>经度:</label>
    <input type="number" v-model="lng"/>
    <label>纬度:</label>
    <input type="number" v-model="lag"/>
    <button @click="addMark(lng,lag,+ new Date()+'定位')">解析</button>
  </div> -->

</div> 
  <div id="mapMenu">
    <n-menu  mode="horizontal"  :options="menuOptions"  @update:value="handleUpdateValue"/>
  </div>
<!-- </div> -->
</template>
<script >
// @ is an alias to /src
import {onMounted,ref,reactive,defineComponent,h} from 'vue'
// import AMapLoader from '@amap/amap-jsapi-loader';
import AMapLoader from '@amap/amap-jsapi-loader';
import { shallowRef } from '@vue/reactivity'
import { useMessage, NIcon  } from 'naive-ui'
// import {request} from '@/util/request.js'
import {GeolocationApi} from '@/util/mapApi.js'
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
  PaperPlaneSharp 
} from "@vicons/ionicons5";
// import {handler} from '@/util/message.js'
// import Menu from '@/views/menu.vue'
function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions = [
    {
    label: "经纬定位",
    key: "LngLatLocation",
    icon: renderIcon(PaperPlaneSharp)
  },
      {
    label: "覆盖物",
    key: "",
    icon: renderIcon(BookIcon)
  },
      {
    label: "更换地图主题",
    key: "",
    icon: renderIcon(BookIcon)
  },
  {
    label: "几何计算",
    key: "dance-dance-dance",
    // icon: renderIcon(BookIcon),
    children: [
      {
        type: "group",
        label: "人物",
        key: "people",
        children: [
          {
            label: "叙事者",
            key: "narrator",
            icon: renderIcon(PersonIcon)
          },
          {
            label: "羊男",
            key: "sheep-man",
            icon: renderIcon(PersonIcon)
          }
        ]
      },
      {
        label: "饮品",
        key: "beverage",
        icon: renderIcon(WineIcon),
        children: [
          {
            label: "威士忌",
            key: "whisky"
          }
        ]
      },
      {
        label: "食物",
        key: "food",
        children: [
          {
            label: "三明治",
            key: "sandwich"
          }
        ]
      },
      {
        label: "过去增多，未来减少",
        key: "the-past-increases-the-future-recedes"
      }
    ]
  }
];
export default defineComponent ({
  name: 'MapIndex',
  setup(){
    const message = useMessage()
    //  const dialog = useDialog()
     window.$message = useMessage()
      const map = shallowRef(null);
      let  AmapObj = reactive({})
      const mapStyle = ref('normal')
      const styleList = ref([])
      let lng = ref(0)
      let lag = ref(0)
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
          "plugins": ['AMap.Scale','AMap.ToolBar','AMap.MouseTool','AMap.Geocoder','AMap.Geolocation'],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
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
            map.value.addControl(new AMap.Scale());
            map.value.addControl(new AMap.ToolBar());
            //定位
            AMap.plugin('AMap.Geolocation', function() {
              var geolocation = new AMap.Geolocation({
                // 是否使用高精度定位，默认：true
                enableHighAccuracy: true,
                // 设置定位超时时间，默认：无穷大
                timeout: 5000,
                // 定位按钮的停靠位置的偏移量
                offset: [10, 20],
                //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                zoomToAccuracy: true,     
                //  定位按钮的排放位置,  RB表示右下
                position: 'RB'
              })
              if(geolocation){
              geolocation.getCurrentPosition(function(status,result){
                  if(status=='complete'){
                      onComplete(result)
                  }else{
                      onError(result)
                  }
               });
              }
            function onComplete (data) {
              console.log(data)
              message.success(data.message, {closable: true,duration: 5000})
              // data是具体的定位信息
            }

            function onError (data) {
              // 定位出错
              console.log(data)
              message.info(data.originMessage, {closable: true,duration: 5000})
              GeolocationApi('d0e6ece4aa9ed4191790ecb3a8871f08').then(res=>{
                console.log(res)
                if(res.status==1){
                  let  rectangle =res.rectangle.split(';')[1]
                  let lng = rectangle.split(',')[0]
                  let lat = rectangle.split(',')[1]
                  console.log(lng,lat)
                  addMark(lng,lat)
                }
              })
            }
            })
            // console.log(new AMap.LngLat(116, 39))
   
        }).catch(e=>{
            console.log(e);
        })
      }
      //添加标记点
      function addMark(lng,lat,title){
        //  dialog.warning('执行')
        if(!lng||!lat){
          alert('经纬度不全或没有名称添加失败;')
          return false;
        }
        let marker = new AmapObj.Marker({
            position: new AmapObj.LngLat(lng,lat),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: title||(lng+'-'+lat+ '_t'+ +new Date()),
            bubble:true
        });
        map.value.add(marker);  
        map.value.setCenter(new AmapObj.LngLat(lng, lat)); 
      }// 创建一个 Marker 实例：
// 将创建的点标记添加到已有的地图实例：
      onMounted(()=>{
        initMap()
      })
      //更改主题;
      function changeStyle(newVal){
        console.log('更改地图主题==>',newVal)
          map.value.setMapStyle(`amap://styles/${newVal}`);
      }
      return {map,lng,lag,mapStyle,styleList,changeStyle,addMark,menuOptions, handleUpdateValue (key,item) {
        switch(key){
        case 'LngLatLocation':
          break;
          default :
                  message.info('[onUpdate:value]: ' + JSON.stringify(key))
        message.info('[onUpdate:value]: ' + JSON.stringify(item))
        break;
        }

      }}
  }
})
</script>
<style scoped lang="less">
#container {width:100%; height:calc(100vh - 25px); position: relative;top: 0;left: 0;} 
.mapTheme{position: absolute;  z-index: 150;top: 0;left: 40%;}
.inputLng{position:absolute; z-index: 150; }
#mapMenu{position: absolute;top: 15px;right:15px;background-color:#fff;}
</style>
