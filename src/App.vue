<template>
  <div id="app">
    <label class="all_task" @click="allTask"></label>

    <input autofocus="autofocus" autocomplete="off"  placeholder="What needs to be done?" class="new-todo"  v-on:keyup.enter="nextTask"   v-model="firstrow" >

    <router-view/>

    <footer class="footer" v-show="footerStatu">
        <span class="row_count" >{{completed_count}}<strong> item left</strong></span>
        <ul class="foot_nav">
            <li><router-link  to="/">All</router-link></li>
            <li><router-link  to="/Active">Active</router-link></li>
            <li><router-link  to="/completed">completed</router-link></li>
        </ul>
        <span class="clear_task"  @click='delCompleted'>
          <a-button>Clear complete</a-button>
        </span>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      firstrow: '',
      footerStatu: false,
      rowsValue: [],
      completed_count: 0
    }
  },
  // 更新数据
  mounted: function () {
    this.updateDate()
    this.getcompletedCount()
  },
  created () {
    this.$watch('rowsValue', function (newValue, oldValue) {
      this.showNav()
    })
  },
  methods: {
    // 显示导航栏
    showNav: function () {
      this.footerStatu = this.rowsValue.length > 0
    },
    nextTask: function () {
      if (this.firstrow) {
        this.$store.commit('SET_ROWDATA', {content: this.firstrow, state: false})
        this.firstrow = ''
        this.updateDate()// 刷新
        this.getcompletedCount()
      }
    },
    updateDate: function () {
      this.rowsValue = this.$store.state.rowData
      console.log(this.rowsValue)
    },
    editContent: function (that) {
      // eslint-disable-next-line camelcase
      let curr_node = that.currentTarget
      var nextnode = curr_node.nextElementSibling
      curr_node.style.display = 'none'
      nextnode.classList.add('edit_after')
      nextnode.focus()

      console.log('获取焦点' + nextnode)
    },
    editItem: function (that, index, state) {
      // eslint-disable-next-line camelcase
      let curr_node = that.currentTarget
      var prevnode = curr_node.previousElementSibling
      prevnode.style.display = 'block'
      curr_node.classList.remove('edit_after')
      this.$store.commit('UPL_ROWDATA', {data: {content: curr_node.value, state: state}, index: index})
      this.updateDate()// 刷新
    },
    delItem: function (index) {
      this.$store.commit('DEL_ROWDATA', {index: index})
      this.updateDate()// 刷新
    },
    allTask: function () {
      this.$store.commit('ALLUPL_ROWDATA', {})
      this.updateDate()// 刷新
    },
    delCompleted: function () {
      this.$store.commit('DELCOMPLETED_ROWDATA', {})
    },
    getcompletedCount: function () {
      this.$store.commit('COMPLETED_COUNT')
      this.completed_count = this.$store.state.count
    }
  }
}
</script>

<style >
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    background: #fff;
    margin: 130px 32% 40px 32%;
    position: relative;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
    display: block;
  }
  .row{
    border-top: 1px solid #e6e6e6;
    position: relative;
  }
  .new-todo {
    padding: 16px 16px 16px 60px;
    border: none;
    background: rgba(0, 0, 0, 0.003);
    box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
    outline: none;
    color:#777777;
  }

  .footer {
    color: #777;
    padding: 10px 15px;
    height: 51px;
    text-align: center;
    border-top: 1px solid #e6e6e6;
  }
  .row_count{
    float: left;
  }
  .clear_task{
    position: absolute;
    right: 10px;
    cursor: pointer;
    z-index: 10;
  }
  .foot_nav{
    margin: 0;
    padding: 0;
    list-style: none;
    position: absolute;
    right: 0;
    left: 0;
  }
  .foot_nav li {
    margin: 3px;
    padding: 2px;
    display: inline;
    cursor: pointer;
    border: 1px solid transparent;
  }
  .foot_nav>li:active{
    border: 1px solid #e6e6e6;
    border-radius: 13px;
  }
  .toggle {
    text-align: center;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    margin: auto 0;
    border: none;
    -webkit-appearance: none;
    appearance: none;
    background-image: url("./assets/下载02.svg")
  }
  .toggle:checked{
    background: url("./assets/下载.svg")no-repeat center;
  }
  .toggle + label {
    background-image: url("./assets/下载02.svg");
    background-repeat: no-repeat;
    background-position: center left;
    text-align: left;
  }
  .rowsBel {
    word-break: break-all;
    padding: 15px 15px 15px 60px;
    display: block;
    line-height: 1.2;
    transition: color 0.4s;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;

  }
  .destroy {
    display: none;
    position: absolute;
    top: 0;
    right: 10px;
    bottom: 0;
    width: 40px;
    height: 40px;
    margin: auto 0;
    font-size: 30px;
    color: #cc9a9a;
    margin-bottom: 11px;
    transition: color 0.2s ease-out;
  }
  .completed {
    color: #d9d9d9;
    text-decoration: line-through;
  }
  .edit {
    display: none;
  }
  .edit_after {
    display: block;
    width: 580px !important;
    padding: 15px 16px;
    font-size: 24px;
    margin: 0 0 0 43px !important;
  }
  .edit {
    position: relative;
    margin: 0;
    width: 100%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    border: 0;
    color: inherit;
    border: 1px solid #999;
    box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  button {
    margin: 0;
    padding: 0;
    border: 0;
    background: none;
    font-size: 100%;
    vertical-align: baseline;
    font-family: inherit;
    font-weight: inherit;
    color: inherit;
    -webkit-appearance: none;
    appearance: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .destroy {
    display: none;
    position: absolute;
    top: 0;
    right: 10px;
    bottom: 0;
    width: 40px;
    height: 40px;
    margin: auto 0;
    font-size: 30px;
    color: #cc9a9a;
    margin-bottom: 11px;
    transition: color 0.2s ease-out;
  }
  .row:hover .destroy{
    display: block;
  }
  .destroy:after {
    content: '×';
  }
  .all_task{
    display: inline-block;
    height: 45px;
    width: 20px;
    position: absolute;
    left: 10px;
    transform: rotate(90deg);
  }
  .all_task:before{
    content:">";
    font-size: 22px;
    color: #737373;
    padding: 10px 11px 10px 4px;

  }
  input{
    outline: none;
  }
</style>
