<template>
  <n-space vertical >
    <!-- <n-space> <n-switch v-model:value="inverted" /> inverted </n-space> -->
    <n-layout  >
      <!-- <n-layout-header :inverted="inverted" bordered>
        Header Header Header
        <n-menu mode="horizontal" :inverted="inverted" :options="menuOptions" />
      </n-layout-header> -->
      <n-layout has-sider style="max-height:calc(100vh - 25px);min-height: calc(100vh - 25px);">
        <n-layout-sider
          bordered
          show-trigger
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          :collapsed="collapsed"
          :native-scrollbar="false"
          :inverted="inverted"
                  @collapse="collapsed = true"
        @expand="collapsed = false"

        >
          <!-- style="max-height: calc(100% - 200px)" -->
          <n-menu
            :inverted="inverted"
            :collapsed-width="64"
            :collapsed="collapsed"
            :collapsed-icon-size="22"
            :options="menuOptions"
            value="go-back-home"
          />
        </n-layout-sider>
        <n-layout has-sider style="height:100%"> 
           <router-view  />
        </n-layout>
      </n-layout>
      <n-layout-footer :inverted="inverted" bordered>
        9374
      </n-layout-footer>
    </n-layout>
  </n-space>
</template>
<style>
  /* .routerView{
    max-height: calc(100vh - 25px);
    height: calc(100vh - 25px);
    min-height: calc(100vh - 25px);
    overflow: auto;
  } */
</style>

<script>
import { h, defineComponent, ref } from "vue";
import { NIcon } from "naive-ui";
import { RouterLink } from 'vue-router'
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
  HomeOutline  as HomeIcon
} from "@vicons/ionicons5";

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions = [
  {
    // label: "地图",
    label:()=>
       h(
        RouterLink,
        {
          to: {
            path:'/',
            name: 'Index',
            params: {
              lang: 'zh-CN'
            }
          }
        },
        { default: () => '地图' }
        ),
    key: "go-back-home",
    icon: renderIcon(HomeIcon)
  },
  {
    label: "舞，舞，舞",
    key: "dance-dance-dance",
    icon: renderIcon(BookIcon),
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

export default defineComponent({

  setup() {
    return {
      inverted: ref(false),
      menuOptions,
      collapsed:ref(true)
    };
  }
});
</script>