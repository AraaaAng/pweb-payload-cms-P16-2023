<template>
  <div class="not-found">
    <div class="not-found-content">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <router-link to="/" class="home-link">Go to Home Page</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.not-found-content {
  text-align: center;
}

h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

p {
  font-size: 24px;
  margin-bottom: 20px;
}

.home-link {
  display: inline-block;
  padding: 10px 20px;
  font-size: 18px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease-in-out;
}

.home-link:hover {
  background-color: #0056b3;
}

.illustration img {
  max-width: 100%;
  height: auto;
  margin-left: 20px; /* Adjust the margin as needed */
}
</style>
