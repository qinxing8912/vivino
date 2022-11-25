<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h1>{{count}}</h1>
    <p>{{list}}</p>
    <p v-for="item in list1">{{item}}</p>
  </div>
  <div class="p">

  </div>
</template>

<script setup>
import { onMounted, ref} from 'vue'
import {_post,_get} from './../http/request'
import {api} from "./../http/api";

let count = ref(0)
let list = ref(null)
let list1 = ref([])

onMounted(() => {
  getUser()
  let data1={
    params: 11
  }
  _post(api.getWxAppConfig,data1).then((res)=>{
    console.log(res);
    list.value=res
  })
})

function getUser() {
  let data = {
    page:1,
    size:10
  }
  _get(api.getCommentJoinInfo,data).then((res)=>{
    console.log(res);
    list1.value = res.data
  })
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
.p{
    width: calc(var(--vw) *200);
    height: calc(var(--vw) *200);
    color: var(--color-text1);
    background-color: var(--color-text);
  }
</style>
