<template>
    <div>
        {{message}}
        <button @click="to('/about')">to about</button>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
          return {
              message:'来了，老铁'
          }
        },
        methods: {
            to(_hash) {
                this.$srouter.push(_hash)
            }
        }
    }
</script>

<style scoped>
    div {
        font-size: 20px;
        margin: 20px;
    }
</style>