import { defineStore } from 'pinia'

export enum Status {
  NEW = 'new',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
  CANCELLED = 'cancelled'
}

export interface TodoItem {
  id: string
  title: string
  status: Status
}

export interface State {
  items: TodoItem[]
}

const LIMIT = 10;

export const useTodoStore = defineStore('todo', {
  state: (): State => ({
    items: []
  }),
  getters: {
    countDone: (state) => state.items.filter((item) => item.status === Status.DONE).length,
    countAll: (state) => state.items.length,
    canAdd: (state) => state.items.length < LIMIT
  },
  actions: {
    addTodo(title: string) {
      this.items.push({
        id: window.crypto.randomUUID(),
        title,
        status: Status.NEW
      })
    },
    changeStatus(item: TodoItem, status: Status) {
      item.status = status
    },
    deleteTodo(item: TodoItem) {
      this.items = this.items.filter((i) => i !== item)
    },
    moveUp(item: TodoItem) {
      const index = this.items.indexOf(item)
      if (index > 0) {
        this.items.splice(index, 1)
        this.items.splice(index - 1, 0, item)
      }
    },
    moveDown(item: TodoItem) {
      const index = this.items.indexOf(item)
      if (index < this.items.length - 1) {
        this.items.splice(index, 1)
        this.items.splice(index + 1, 0, item)
      }
    }
  }
})
