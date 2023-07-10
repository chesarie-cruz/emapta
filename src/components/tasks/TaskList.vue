<template>
    <v-card
      class="mx-auto"
      max-width="100vw"
      height="100vh"
    >
      <v-toolbar
        color="teal"
        dark
      >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
  
        <v-toolbar-title>Tasks</v-toolbar-title>
  
        <v-spacer></v-spacer>
  
        <v-btn icon>
          <v-icon>mdi-plus-circle</v-icon>
        </v-btn>
      </v-toolbar>
  
      <v-list>
        <v-list-group
          v-for="task in tasks"
          :key="task.title"
          v-model="task.active"
          :prepend-icon="task.status"
          no-action
        >
          <template v-slot:activator>
              <v-list-item-title v-text="task.title"></v-list-item-title>
          </template>
            <v-card
              elevation="2"
            >
              <v-list-item-title v-text="task.description"></v-list-item-title>
            </v-card>
            
        </v-list-group>
      </v-list>
    </v-card>
  </template>
  
  
  
  <script>
  import axios from "axios";

    export default {
      name: 'TaskList',
      data: () => ({
        tasks: [
          {
            status: 'mdi-circle',
            description: "Sample 1",
            title: 'Task Sample',
          },
        ],
      }),
      mounted() {
        this.getTasks();
      },
      "methods": {
        async getTasks () {
          axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
          const config = {
            headers:{
              "x-api-key": "vY3292YlyFanipq2ZOcU0nv6IlZ7sL/K+u703J3OP0E=",
            }
          };
          const url = "https://sample-api.stellanetworks.dev/tasks/all";
          axios.get(url, config)
            .then(res=> console.log(res))
            .catch(err=> console.log(err))
          
        }

      }
    }
  </script>