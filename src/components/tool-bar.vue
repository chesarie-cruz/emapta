<template>
    <v-toolbar
        color="teal"
        dark
    >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
  
        <v-toolbar-title>{{appName}}</v-toolbar-title>
  
        <v-spacer></v-spacer>
        <slot name="append"></slot>
        
    </v-toolbar>
</template>
<script>
export default {
    props: {
        appName: {
            default:"Tasks"
        },
    },
}

</script>
