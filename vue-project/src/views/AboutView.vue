<template>
  <div class="about-us">
    <div class="about-us-content">
      <h1>About Us</h1>
      <div class="team-member">
        <div class="avatar">
          <img :src="ara" alt="Mutiara Nurhaliza" />
        </div>
        <div class="info">
          <h2>Mutiara Nurhaliza</h2>
          <p>NRP: 5027221010</p>
        </div>
      </div>
      <div class="team-member">
        <div class="avatar">
          <img :src="bintang" alt="Bintang Ryan" />
        </div>
        <div class="info">
          <h2>Bintang Ryan Wardana</h2>
          <p>NRP: 5027221022</p>
        </div>
      </div>
      <div class="team-member">
        <div class="avatar">
          <img :src="krisna" alt="Marcelinus Krisnawan" />
        </div>
        <div class="info">
          <h2>Marselinus Krisnawan Riandika</h2>
          <p>NRP: 5027221056</p>
        </div>
      </div>
      <!-- Add more team members as needed -->
    </div>
  </div>
</template>

<script>
import ara from "@/assets/img/ara.jpg";
import bintang from "@/assets/img/bintang.jpg";
import krisna from "@/assets/img/krisna.jpg";

export default {
  name: "AboutView",
  props: {},

  data() {
    return {
      ara: ara,
      bintang: bintang,
      krisna: krisna,
    };
  },
};
</script>

<style scoped>
.about-us {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.about-us-content {
  text-align: center;
}

h1 {
  font-size: 36px;
  margin-bottom: 20px;
}

.team-member {
  display: flex;
  align-items: center;
  margin: 20px;
}

.avatar img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
}

h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

p {
  font-size: 18px;
}
</style>
