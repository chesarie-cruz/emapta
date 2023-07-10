<template>
    <div>
        <tool-bar>
            <template v-slot:append>
                <v-btn icon @click="toggleFormDialog()">
                    <v-icon>mdi-plus-circle</v-icon>
                </v-btn>
            </template>
        </tool-bar>

        <v-card
        class="mx-auto"
        max-width="100vw"
        >
            <task-list ref="taskList" @openEditFormDialog="toggleFormDialog" ></task-list>
        </v-card>

        <task-form :app-name="'samplsase'" ref="taskForm"></task-form>
    </div>
</template>
<script>
import ToolBar from "../../components/tool-bar.vue"
import TaskList from "./TaskList.vue"
import TaskForm from "./TaskForm.vue"

export default {
    components:{
        ToolBar,
        TaskList,
        TaskForm,
    },
    mounted () {
    },
    methods: {
        toggleFormDialog (params) {
            this.$refs.taskForm.toggleDialog(params);
        },
    }
}
</script>