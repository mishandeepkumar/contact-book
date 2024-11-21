<template>
  <div class="app-container">
    <header>
      <h2>Contact Book</h2>
      <router-link to="/" class="home-link">
        <span class="mdi mdi-home"></span> Home
      </router-link>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
.app-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 12px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  position: sticky;
  top: 10px;
  border-bottom: 1px solid #aaa;
  background-color: #f5f5f5;
}

.home-link {
  text-decoration: none;
  color: #2c3e50;
  font-size: 1em;
}

.home-link:hover {
  color: #00371e;
  text-decoration: underline;
}
</style> 