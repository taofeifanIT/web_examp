<template>
  <div>
    <div class="row" v-for="(item, index) in rowsValue"  v-show="item.state?true:false">
      <input type="checkbox"  class="toggle"  v-bind:checked="item.state"   v-on:click="item.state=!item.state"  @click="s_getcompleted_count">
      <label  :class="item.state?'rowsbel completed':'rowsbel'"   @dblclick="s_editContent($event)">{{item.content}}</label>
      <input type="text" class="edit" :value="item.content"  v-on:blur="s_edit_f($event,index,item.state)"  >
      <button class="destroy" @click="s_del_f(index)"></button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'completed',
    data(){
      return {
        rowsValue: []
      }
    },
    mounted () {
      this.rowsValue = this.$store.state.rowData;
    },
    methods : {
      s_editContent:function(that) {
        this.$parent.editContent(that)
      },
      s_edit_f:function (that,index,state) {
        this.$parent.edit_f(that,index,state)
      },
      s_del_f:function (index) {
        this.$parent.del_f(index);
      },
      s_getcompleted_count:function () {
        this.$parent.getcompleted_count();
      }
    }
  }
</script>

<style scoped>

</style>
