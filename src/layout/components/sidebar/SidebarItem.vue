<template>
  <div
    v-if="item.hidden"
    :class="{'simple-mode': isCollapse, 'first-level': isFirstLevel}"
  >
    <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{ 'submenu-title-noDropdown': !isNest }">
          <ElSvgItem :elSvgName="onlyOneChild.meta.icon" />
          <template #title>{{ onlyOneChild.meta.title }}</template>
        </el-menu-item>
      </app-link>
    </template>

    <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template v-if="item.meta" #title>
        <ElSvgItem :elSvgName="item.meta.icon" />
        <span>{{ item.meta.title }}</span>
      </template>

      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script lang="ts" setup>
import { isExternal } from '@/utils/validate'
import AppLink from './Link.vue'
import { getResolvePath } from '@/utils'
import { ref } from 'vue'
import ElSvgItem from './ElSvgItem.vue'

const props = defineProps({
  // route object
  item: {
    type: Object,
    required: true
  },
  icon: {
    type: String,
    default: ''
  },
  meta: {
    type: Object,
    default: null
  },
  title: {
    type: String,
    default: ''
  },
  elIcon: {
    type: Boolean,
    default: false
  },
  isCollapse: {
    type: Boolean,
    required: false
  },
  isFirstLevel: {
    type: Boolean,
    default: true
  },
  isNest: {
    type: Boolean,
    default: false
  },
  basePath: {
    type: String,
    default: ''
  }
})

const onlyOneChild = ref({});

function hasOneShowingChild(children = [], parent: any) {
  if (!children) {
    children = [];
  }
  const showingChildren = children.filter((item: any) => {
    if (item.hidden) {
      return false
    } else {
      // Temp set(will be used if only has one showing child)
      onlyOneChild.value = item
      return true
    }
  })

  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return true
  }

  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    return true
  }

  return false
}

function resolvePath(routePath: any) {
  if (routePath instanceof Object) {
    return routePath
  }
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  return getResolvePath(`${props.basePath}/${routePath}`)
}
</script>
