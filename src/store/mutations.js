export default {
  moveTaskRight: (state, { board_index, list_name, task_index }) => {
    //First we get the name of the list at the right position
    //board_schema = state.boards_schema
    if (state.boards_schema[list_name].next !== null) {
        const next_list_name = state.boards_schema[list_name].next
        const task = state.boards[board_index][list_name][task_index]
        state.boards[board_index][list_name].splice(task_index, 1)
        state.boards[board_index][next_list_name].push(task)
    }
  },
  moveTaskLeft: (state, { board_index, list_name, task_index }) => {
    if (state.boards_schema[list_name].prev !== null) {
        const previous_list_name = state.boards_schema[list_name].prev
        const task = state.boards[board_index][list_name][task_index]
        state.boards[board_index][list_name].splice(task_index, 1)
        state.boards[board_index][previous_list_name].push(task)
    }
  },
  createTask: (state, {board_index, list_name, newTask}) => {
    console.log(newTask)
    state.boards[board_index][list_name].push(newTask)
  }
}