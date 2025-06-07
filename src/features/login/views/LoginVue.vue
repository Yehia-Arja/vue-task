<template>
    <div>
        <input v-model="email" :placeholder="'email'"/>
        <button @click = "handleLogin">Login</button>
        <p v-if="store.error">{{ store.error }}</p>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import useLoginStore from "../store/loginStore"
import { requestMethods } from "../../../utils/enums/requestMethods"
import { request } from "../../../utils/remote/axios"

const email = ref("");
const route = useRouter();
const store = useLoginStore()

const handleLogin = async() => {
    await store.login(email.value)
    if (!store.error) {
        route.push('/verifyCode')
    }
}
</script>