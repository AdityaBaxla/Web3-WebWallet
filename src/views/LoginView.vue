<template>
    <p>Login</p>
    <input v-model="username" placeholder="name" />
    <input v-model="password" placeholder="password" type="password" />
    <button @click="login">Login</button>
</template>

<script>
export default {
    data(){
        return {
            username,
            password,
        }
    },
    methods :{
        login(){
            return ''
        }
    }
}
</script>