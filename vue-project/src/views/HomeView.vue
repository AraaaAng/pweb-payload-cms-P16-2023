<template>
  <div class="container">
    <br />
    <h2 class="text-center">TO-DO LIST</h2>
    <br />

    <!-- input -->
    <div class="d-flex">
      <select v-model="selectedCategory" class="form-control">
        <option value="" disabled>Select Category</option>
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
      <input
        v-model="task"
        type="text"
        placeholder="Enter task"
        class="form-control"
      />
      <button @click="submitTask" class="btn btn-warning rounded-0">
        Submit
      </button>
    </div>
    <!-- input end -->

    <!-- task -->
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Task Name</th>
          <th scope="col">Category</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="tasks.length > 0">
          <tr v-for="(task, index) in tasks" :key="task.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>
              <span v-if="editedTaskIndex !== index">{{ task.title }}</span>
              <input v-model="editedTask.title" v-else />
            </td>
            <td>
              <span v-if="editedTaskIndex !== index">{{
                getCategoryName(task.categories)
              }}</span>
              <select v-model="selectedTaskCategory" v-else>
                <option value="" disabled>Select Category</option>
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
            </td>
            <td>
              <button @click="editTask(index)" class="btn btn-primary">
                {{ editedTaskIndex === index ? "Cancel" : "Edit" }}
              </button>
              <button @click="deleteTask(task.id)" class="btn btn-danger">
                Delete
              </button>
              <button
                v-if="editedTaskIndex === index"
                @click="updateTask(index)"
                class="btn btn-success"
              >
                Update
              </button>
            </td>
          </tr>
        </template>
        <tr v-else>
          <td colspan="4" class="text-center">No data available</td>
        </tr>
      </tbody>
    </table>
    <!-- task end -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TodoList",
  data() {
    return {
      task: "",
      tasks: [],
      categories: [],
      selectedCategory: "",
      selectedTaskCategory: "", // Tambahkan selectedTaskCategory
      editedTask: {
        title: "",
        categories: null,
      },
      editedTaskIndex: -1,
    };
  },
  mounted() {
    this.fetchCategories();
    this.fetchTasks();
  },
  methods: {
    async fetchCategories() {
      try {
        const categoriesResponse = await axios.get(
          "http://localhost:3000/api/Category"
        );
        this.categories = categoriesResponse.data.docs;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    async fetchTasks() {
      try {
        const tasksResponse = await axios.get("http://localhost:3000/api/Todo");
        this.tasks = tasksResponse.data.docs;
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    },

    submitTask() {
      if (!this.selectedCategory || this.task.length === 0) {
        alert("Please select a category and enter a task.");
        return;
      }
      const newTask = {
        title: this.task,
        categories: this.selectedCategory,
      };

      axios
        .post("http://localhost:3000/api/Todo", newTask)
        .then((response) => {
          this.task = "";
          this.selectedCategory = "";
          this.fetchTasks();
        })
        .catch((error) => {
          console.error("Error creating task:", error);
        });
    },

    editTask(index) {
      if (this.editedTaskIndex === index) {
        this.editedTaskIndex = -1;
      } else {
        this.editedTask = { ...this.tasks[index] };
        this.selectedTaskCategory = this.editedTask.categories; // Atur selectedTaskCategory dengan ID kategori
        this.editedTaskIndex = index;
      }
    },

    updateTask(index) {
      if (this.editedTaskIndex === -1) return;

      this.editedTask.categories = this.selectedTaskCategory;

      axios
        .put(
          `http://localhost:3000/api/Todo/${this.tasks[index].id}`,
          this.editedTask
        )
        .then((response) => {
          this.editedTask = {
            title: "",
            categories: null,
          };
          this.selectedTaskCategory = "";
          this.editedTaskIndex = -1;
          this.fetchTasks();
        })
        .catch((error) => {
          console.error("Error updating task:", error);
        });
    },
    getCategoryName(categoryObj) {
      return categoryObj ? categoryObj.name : "";
    },
    deleteTask(taskId) {
      axios
        .delete(`http://localhost:3000/api/Todo/${taskId}`)
        .then(() => {
          this.tasks = this.tasks.filter((task) => task.id !== taskId);
        })
        .catch((error) => {
          console.error("Error deleting task:", error);
        });
    },
  },
};
</script>
