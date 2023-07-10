<template>
  <v-app>
    <v-main>
      <task-list></task-list>
    </v-main>
  </v-app>
</template>

<script>
import TaskList from './components/tasks/TaskList.vue';

export default {
  name: 'App',

  components: {
    TaskList,
  },

  data: () => ({
    //
  }),
};
</script>
