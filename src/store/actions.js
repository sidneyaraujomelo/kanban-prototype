export default {
  moveTask ({ commit }, { board_index, list_name, task_index, dir }) {
    const payload = { board_index, list_name, task_index }
    if (dir === 1) {
        commit('moveTaskRight', payload)
    } else if (dir === 0) {
        commit('moveTaskLeft', payload)
    }
  },
  addTask ({ commit }, { board_index, list_name, title, formatDeadline, owners }) {
    const owners_list = [...owners]
    console.log(owners_list)
    const newTask = {
        name: title,
        deadline: formatDeadline,
        owner: owners_list
    }
    const payload = { board_index, list_name, newTask}
    commit('createTask', payload)
  }
}