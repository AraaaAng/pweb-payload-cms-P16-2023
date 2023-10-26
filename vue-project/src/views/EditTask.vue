<template>
  <div>
    <h2>Edit Task</h2>
    <form @submit.prevent="updateTask">
      <div>
        <label for="editedCategory">Category:</label>
        <input v-model="editedCategory" type="text" id="editedCategory" />
      </div>
      <div>
        <label for="editedTask">Task:</label>
        <input v-model="editedTask" type="text" id="editedTask" />
      </div>
      <div>
        <button type="submit">Update Task</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    index: Number, // Prop untuk menyimpan nilai index dari parameter rute
  },

  name: "EditTask",
  data() {
    return {
      editedCategory: "",
      editedTask: "",
    };
  },
  methods: {
    updateTask() {
      // Emit event untuk mengirim data yang diperbarui
      this.$emit("update-task", {
        category: this.editedCategory,
        task: this.editedTask,
      });

      // Setelah mengirim event, Anda dapat mengarahkan kembali ke halaman sebelumnya
      this.$router.go(-1);
    },
  },
};
</script>
