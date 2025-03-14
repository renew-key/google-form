<script setup>
import {
  NIcon, NSpace, NLayout, NLayoutHeader, NMenu, NLayoutSider, NLayoutFooter, darkTheme, NBackTop, NNotificationProvider, NLoadingBarProvider, NConfigProvider, NDialogProvider, NModalProvider, zhTW, dateZhTW, enUS, dateEnUS, NMessageProvider, NSwitch, NLayoutContent, NScrollbar, NBreadcrumb, NBreadcrumbItem,
} from "naive-ui";
</script>

<template>
  <n-message-provider>
    <RouterView />
  </n-message-provider>
</template>

<style scoped></style>