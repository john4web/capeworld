<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/superheroes">Superheroes</router-link>
      <router-link to="/comics">Comics</router-link>
      <router-link to="/movies">Movies</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
