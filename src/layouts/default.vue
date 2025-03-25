<script setup>
import {
  NIcon, NSpace, NLayout, NLayoutHeader, NMenu, NLayoutSider, NLayoutFooter, darkTheme, NBackTop, NNotificationProvider, NLoadingBarProvider, NConfigProvider, NDialogProvider, NModalProvider, zhTW, dateZhTW, enUS, dateEnUS, NMessageProvider, NSwitch, NLayoutContent, NScrollbar, NBreadcrumb, NBreadcrumbItem,
} from "naive-ui";
</script>

<template>
  <n-dialog-provider>
    <n-message-provider>
      <RouterView />
    </n-message-provider>
  </n-dialog-provider>
</template>

<style scoped></style>