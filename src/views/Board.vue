<template>
    <div>
        <h1>Board #{{parseInt($route.params.id)+1}}</h1>
        <hr>
        <span> Team: </span>
        <span v-for="(value, index) in team"
            :key="index">
            <a :href="`/member/${value}`">{{value}}</a>{{ index < team.length -1 ? ', ': '' }}
        </span>

        <hr/>

        <b-container>
            <b-row>
                <b-col
                    v-for="(value, list_name) in taskboards"
                    :key="list_name"
                    class="task-board-col"
                >
                    <h3>{{ list_name }} List</h3>
                    <hr/>
                    <span
                        v-for="(task_val, task_index) in value"
                        :key="task_index"
                    >
                        <b-card
                            :title="`Task: ${task_val.name}`"
                        >
                            <b-card-text>
                                <p>Deadline: {{task_val.deadline}}</p>
                                Members:
                                <span
                                    v-for="(owner, owner_index) in task_val.owner"
                                    :key="owner_index"
                                >
                                    <a :href="`/member/${owner}`">{{owner}}</a>{{ owner_index < task_val.owner.length - 1 ? ', ': '' }}
                                </span>
                            </b-card-text>
                            <b-button @click="wrapMoveTask($route.params.id, list_name, task_index, 0)" size="lg" variant="primary" :disabled="list_name === 'Backlog'">
                                <b-icon icon="arrow-left"></b-icon>
                            </b-button>
                            <b-button @click="wrapMoveTask($route.params.id, list_name, task_index, 1)" size="lg" variant="primary" :disabled="list_name === 'Done'">
                                <b-icon icon="arrow-right"></b-icon>
                            </b-button>
                        </b-card>
                    </span>
                    <b-card @click="openAddTaskModal(list_name)" class="task-add-button">
                        <b-card-text>
                            <b-icon icon="plus-circle"></b-icon>
                        </b-card-text>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>

        <b-modal id="modal-1" :title=modal_title @hide="resetForm()" hide-footer>
            <b-form @submit.prevent="handleSubmit">
                <b-form-group
                id="input-group-1"
                label="Task Title:"
                label-for="input-1"
                description="A short description of the task."
                >
                    <b-form-input
                    id="input-1"
                    v-model="formData.title"
                    placeholder="Task"
                    required
                    ></b-form-input>
                </b-form-group>
                <b-form-group
                id="input-group-2"
                label="Deadline:"
                label-for="input-2"
                >
                    <b-form-datepicker
                    id="input-group2"
                    v-model="formData.deadline"
                    required
                    ></b-form-datepicker>
                </b-form-group>
                <b-form-group
                id="input-group-3"
                label="Owners:"
                label-for="input-3"
                v-slot="{ ariaDescribedby }"
                >
                    <b-form-checkbox-group
                    id="input-3"
                    v-model="formData.owners"
                    :aria-describedby="ariaDescribedby"
                    >
                        <b-form-checkbox
                        v-for="(value, index) in team"
                        :key="index"
                        :value="value"
                        >
                            {{value}}
                        </b-form-checkbox>
                    </b-form-checkbox-group>
                </b-form-group>
                <b-button class="w-100" block type="submit" variant="primary">Submit</b-button>
            </b-form>
        </b-modal>

    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment'

export default {
    name: 'board',
    data (){
      return {
          team: [],
          taskboards: [],
          modal_title : '',
          formData: {
            list_name: '',
            title: '',
            deadline: new Date(),
            owners: []
          }
      }
    },
    methods: {
      ...mapActions([
        'moveTask',
        'addTask'
      ]),
      wrapMoveTask(board_index, list_name, task_index, dir) {
        const payload = {board_index, list_name, task_index, dir}
        this.moveTask(payload)
      },
      openAddTaskModal(list_name) {
        this.formData.list_name = list_name
        this.modal_title = "Add new "+list_name+" task"
        this.$bvModal.show('modal-1')
      },
      handleSubmit () {
          const { list_name, title, deadline, owners } = this.formData
          const formatDeadline = moment(deadline).format('DD/MM/YYYY')
          const board_index = this.$route.params.id
          const payload = {
            board_index,
            list_name,
            title,
            formatDeadline,
            owners
          }
          this.addTask(payload)
          this.resetForm()
          this.$bvModal.hide('modal-1')
      },
      resetForm () {
        this.formData = {
            list_name: '',
            title: '',
            deadline: new Date(),
            owners: []
          }
      }
    },
    computed: {
        ...mapState([
            'boards'
        ])
    },
    mounted () {
        const board = this.boards[this.$route.params.id]
        this.team = board['team']
        delete board['team']
        this.taskboards = board
    }
}
</script>
