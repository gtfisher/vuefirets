<template>
   <div>
      <div>
        <form>
            <v-text-field
            v-model="action"
            label="Task"
            >
            </v-text-field>
            <v-text-field
            v-model="priority"
            label="Priority"
            >
            </v-text-field>
          <v-text-field
            v-model="complexity"
            label="Complexity"
            >
          </v-text-field>


          <v-btn v-on:click="saveTask()">Save task</v-btn>
        </form>
      </div>
      <br><br><br>
      <table  class='table'>
        <tr>
          <td>Action</td>
          <td>Priority</td>
          <td>Complexity</td>
        </tr>
        <tr v-for='task in tasks' v-bind:key='task.id'>
          <td>{{task.action}}</td>
          <td>{{task.complexity}}</td>
          <td>{{task.priority}}</td>
          <td >
            <v-btn small color="error" v-on:click="removeTask(task)" dark>Delete</v-btn>
          </td>
        </tr>
      </table>
       <v-data-table
        :headers="headers"
        :items="tasks"
      ></v-data-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { TodoDataServices, TodoRecord } from './FireStoreDataServices';
// import HelloWorld from '../components/HelloWorld.vue';

export default Vue.extend({
  name: 'TodoView',
  data() {
    return {
       headers: [
        {
          text: 'Action',
          align: 'left',
          sortable: false,
          value: 'action',
        },
        { text: 'Priority', value: 'priority' },
        { text: 'Complexity', value: 'complexity' },
      ],
      tasks: [],
      action: '',
      complexity: '',
      priority: ''
    }
  },
  created() {
    this.loadTasks();
  },
  methods: {
    saveTask() {
      let todoDataService = new TodoDataServices();
      let todo = new TodoRecord();
      todo.action = this.action;
      todo.complexity = this.complexity;
      todo.priority = this.priority;
      let context = this;
      todoDataService.Add(todo).then(function () {
        context.loadTasks();
      })
    },
    loadTasks() {
      let todoDataService = new TodoDataServices();
      todoDataService.GetAll().then(listData => {
        this.tasks = listData;
      });
    },
    removeTask(record: any) {
      let todoDataService = new TodoDataServices();
      let context = this;
      todoDataService.Delete(record.id).then(function () {
        context.loadTasks();
      });
    }

  },

});
</script>