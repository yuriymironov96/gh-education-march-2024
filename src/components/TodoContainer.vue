<script lang="ts">
import { Status, useTodoStore, type TodoItem } from '@/stores/counter';
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TodoContainer',
  setup() {
    return {
      todoStore: useTodoStore()
    }
  },
  data() {
    return {
      newTodo: '',
      showCompleted: true
    }
  },
  computed: {
    todos() {
      console.log({ items: this.todoStore.items })
      return this.showCompleted ? this.todoStore.items : this.todoStore.items.filter(item => item.status !== Status.DONE)
    },
    isDone() {
      return (item: TodoItem) => item.status === Status.DONE
    }
  },
  methods: {
    handleSubmit() {
      if (this.newTodo) {
        this.todoStore.addTodo(this.newTodo)
        this.newTodo = ""
      }
    },
    handleChangeStatus(item: TodoItem) {
      this.todoStore.changeStatus(item, item.status === Status.NEW ? Status.DONE : Status.NEW)
    }
  }
})
</script>

<template>
  <input
    type="text"
    class="todo-input"
    v-model="newTodo"
    @keydown.enter="handleSubmit"
  />
  <input
    type="checkbox"
    name="completed"
    v-model="showCompleted"
  />
  <label for="completed">Show completed</label>
  <br />
  <div
    v-for="todo in todos"
    :key="todo.id"
  >
    <span v-if="isDone(todo)">+</span>
    {{ todo.title }}
    <button @click="handleChangeStatus(todo)">Complete</button>
  </div>
</template>

<style>
.todo-input {
  border: 1px solid blue;
  padding: 5px
}
</style>