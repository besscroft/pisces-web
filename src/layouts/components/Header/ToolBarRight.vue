<template>
	<div class="tool-bar-ri">
		<div class="header-icon">
			<AssemblySize id="assemblySize" />
			<Language id="language" />
			<SearchMenu id="searchMenu" />
			<ThemeSetting id="themeSetting" />
			<Message id="message" />
			<Fullscreen id="fullscreen" />
		</div>
		<span class="username">{{ realName }}</span>
		<Avatar />
	</div>
</template>

<script setup lang="ts">
import SearchMenu from './components/SearchMenu.vue'
import Fullscreen from './components/Fullscreen.vue'
import Message from './components/Message.vue'
import Language from './components/Language.vue'
import ThemeSetting from './components/ThemeSetting.vue'
import AssemblySize from './components/AssemblySize.vue'
import Avatar from './components/Avatar.vue'
import { GlobalStore } from '@/stores'

const globalStore = GlobalStore()

const realName = globalStore.realName
</script>

<style scoped lang="scss">
.tool-bar-ri {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 30px;
	.header-icon {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 230px;
		margin-right: 22px;
	}
	.username {
		margin: 0 20px 0 0;
		font-size: 15px;
	}
}
</style>
