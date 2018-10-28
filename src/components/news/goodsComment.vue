<template>
    <div>
       <comment :id='id'></comment> 
    </div>
</template>
<script>
import comment from '../subcomponents/comments.vue'
  export default{
    data(){
        return{
            id:this.$route.params.id
        }
    },
    components:{
         comment,
    }
  }
</script>
<style scoped lang='less'>
   
</style>
