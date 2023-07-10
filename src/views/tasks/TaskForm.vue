<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      width="1024"
    >
      <v-card>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
        <v-card-title>
          <span class="text-h5">Tasks Details</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    v-model="taskInput.name"
                    :rules="requiredRules"
                    label="Title*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-select
                      v-model="taskInput.state"
                      :items="['open', 'inprogress', 'pending', 'completed']"
                      :rules="requiredRules"
                      label="State"
                      required
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="taskInput.description"
                    :rules="requiredRules"
                    label="Description*"
                    required
                  ></v-textarea>
                </v-col>
              </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="dialog = false, clearFormInputs()"
          >
            Close
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="saveTask()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>
import axios from "axios";
import Swal from 'sweetalert2'

  export default {
    name:"TaskForm",
    data: () => ({
      API_KEY: process.env.VUE_APP_API_KEY,
      API_URL: process.env.VUE_APP_API_URL,
      dialog: false,
      taskInput:{},
      isEditMode:false,
      valid:false,
      requiredRules: [
        v => !!v || 'This is a required field',
      ],
    }),
    methods:{
      toggleDialog (params) {
        if(params){
          this.taskInput = params;
          this.isEditMode = true;
        }
        this.dialog = !this.dialog;
      },
      saveTask () {
        this.$refs.form.validate()
        const {name,description,state} = this.taskInput
        if(name && description && state){
          this.isEditMode ? this.editTask() : this.addTask();
        }
      },
      async addTask () {
        const config = {
          headers:{
            "x-api-key": this.API_KEY,
          }
        };
        const params = this.taskInput;
        await axios.post(`${this.API_URL}/tasks/`,params, config)
          .then(res=> {
            if(res.status === 200){
              this.tasks = res?.data;
              const task_id = res?.data?.task_id;
              this.$store.commit("add_task",{...params, task_id});
              this.dialog = false;
              this.clearFormInputs();
              this.genericSuccessMessage();
            }
          })
          .catch(err=> console.log(err))
      
      },
      async editTask () {
        const config = {
          headers:{
            "x-api-key": this.API_KEY,
          }
        };
        const url = `${this.API_URL}/tasks/${this.taskInput.task_id}`;
        const params = this.taskInput;
        delete params.active;
        await axios.put(url,params, config)
          .then(res=> {
            if(res.status === 200){
              this.dialog = false;
              this.clearFormInputs();
              this.genericSuccessMessage();
            }
          })
          .catch(err=> console.log(err))
      
      },

      clearFormInputs (){
        this.taskInput = {};
        this.isEditMode = false;
      },

      genericSuccessMessage (){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        });
      },

    },
    
  }
</script>