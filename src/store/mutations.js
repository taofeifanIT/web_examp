const mutations = {
  SET_ROWDATA (state, val) {
    state.rowData.push(val)
  },
  UPL_ROWDATA (state, val) {
    state.rowData.splice(val.index, 1, val.data)
  },
  DEL_ROWDATA (state, val) {
    state.rowData.splice(val.index, 1)
  },
  ALLUPL_ROWDATA (state, val) {
    for (var v in state.rowData) {
      state.rowData[v].state = !state.rowData[v].state
    }
  },
  DELCOMPLETED_ROWDATA (state, val) {
    for (var v = state.rowData.length - 1; v >= 0; v--) {
      // eslint-disable-next-line eqeqeq
      if (state.rowData[v].state == true) { state.rowData.splice(v, 1) }
    }
  },
  COMPLETED_COUNT (state, val) {
    let count = 0
    for (var v in state.rowData) {
      if (state.rowData[v].state === false) { count += 1 }
    }
    console.log('count__' + count)
    state.count = count
  }
}
export default mutations
