<template>
  <div>
    <div class="row" v-for="(item, index) in rowsValue" v-bind:key="index"  v-show="item.state?false:true">
      <input type="checkbox"  class="toggle"  v-bind:checked="item.state"   v-on:click="item.state=!item.state" @click="getCompletedCount">
      <label  :class="item.state?'rowsBel completed':'rowsBel'"   @dblclick="editContent($event)">{{item.content}}</label>
      <input type="text" class="edit" :value="item.content"  v-on:blur="editItem($event,index,item.state)"  >
      <button class="destroy" @click="delItem(index)" ></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Active',
  data () {
    return {
      rowsValue: this.$store.getters.rowData
    }
  },
  methods: {
    editContent (that) {
      this.$parent.editContent(that)
    },
    editItem (that, index, state) {
      this.$parent.editItem(that, index, state)
    },
    delItem (index) {
      this.$parent.delItem(index)
    },
    getCompletedCount () {
      this.$parent.getCompletedCount()
    }
  }
}
</script>

<style scoped>

</style>
