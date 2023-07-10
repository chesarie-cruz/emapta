<template>
  <v-app>
      <tasks-index></tasks-index>
  </v-app>
</template>

<script>
import TasksIndex from './views/tasks/Task-Index.vue';

export default {
  name: 'App',

  components: {
    TasksIndex,
  },

  data: () => ({
    //
  }),
};
</script>
