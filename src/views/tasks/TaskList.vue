<template>
    <v-list>
      <v-list-group
        v-for="task in (tasks.length > 0 ? tasks: defaultTask)"
        :key="task.task_id"
        v-model="task.active"
        no-action
      >
          <template v-if="tasks.length > 0" v-slot:prependIcon>
            <v-icon class="task-state-icon" :title="task.state" :color="colorScheme[task.state] ?? 'gray'">mdi-circle</v-icon>
            <v-icon 
              title="edit" 
              color="blue"
              class="edit-button"
              @click="openEditFormDialog(task)"
              >
              mdi-text-box-edit-outline
            </v-icon>
            <v-icon 
              title="delete" 
              color="red"
              class="edit-button"
              @click="deleteTask(task.task_id)"
              >
              mdi-delete
            </v-icon>
          </template>
        <template v-slot:activator>
            <v-list-item-title class="task-title" v-text="task.name"> </v-list-item-title>
        </template>
            <v-card-text v-text="task.description"></v-card-text>
      </v-list-group>
    </v-list>
</template>
  
<script>
import axios from "axios";
import Swal from 'sweetalert2'

  export default {
    name: 'TaskList',
    components:{
    },
    data: () => ({
      API_KEY: process.env.VUE_APP_API_KEY,
      API_URL: process.env.VUE_APP_API_URL,
      colorScheme: {
        "open":"gray",
        "inprogress":"blue",
        "pending":"orange",
        "completed":"green"
      },
      defaultTask: [
        {
          status: 'new',
          description: "Description will be displayed here.",
          name: 'Task Title will be displayed here',
        },
      ]
    }),
    mounted() {
      this.getTasks();
    },
    computed:{
      tasks () {
        return this.$store.state?.tasks;
      },
    },
    "methods": {
      async getTasks () {
        const config = {
          headers:{
            "x-api-key": this.API_KEY,
          }
        };
       await axios.get(`${this.API_URL}/tasks/all`, config)
          .then(res=> {
            this.$store.commit("set_tasks",res?.data);
          })
          .catch(err=> console.log(err))
      },

      openEditFormDialog (params) {
        this.$emit("openEditFormDialog",params);
      },

       deleteTask (task_id) {
        const config = {
          headers:{
            "x-api-key": this.API_KEY,
          }
        };
        Swal.fire({
          title: 'Delete Task!',
          text: 'Do you want to continue',
          icon: 'error',
          showCancelButton: true,
          confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
             axios.delete(`${this.API_URL}/tasks/${task_id}`, config)
              .then(res=> {
                if(res.status === 200)
                  this.$store.commit("delete_task",task_id);
                  Swal.fire('Saved!', '', 'success')
              })
            .catch(err=> console.log(err))
              
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })
        },
    }
  }
</script>
<style scoped lang="scss">
.edit-button{
}
.task-title{
  font-size: 1em;
  padding-left: 1em;
}
.task-state-icon{
  cursor: default;
}
</style>