<template>
    <div>
        <input v-model="code" />
        <button @click = "handleVerifyCode">Submit</button>
        <p v-if="store.error">{{ store.error }}</p>
    </div>
</template>

<script setup>
import { ref } from "vue";
import useLoginStore from "../store/loginStore"
import {useRouter} from "vue-router"

const code = ref("")
const store = useLoginStore()
const route = useRouter()

const handleVerifyCode = async() => {
    await store.verifyCode(code.value);
    if (!store.error) {
        route.push('/home')
    }
}
</script>