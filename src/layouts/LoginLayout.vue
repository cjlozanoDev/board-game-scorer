<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      elevated
      class="login-layout__q-header text-center text-white lt-md"
    >
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          <span> Board Game Scorer </span>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.login-layout__q-header {
  background: var(--color-secondary);
}
</style>
