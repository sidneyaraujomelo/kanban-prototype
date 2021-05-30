<template>
    <div>
        <!-- Logo and Version -->
        <h1 class="logo">KANBAN</h1>
        <p class="version">.:0.0.1:.</p>
        <hr class="my-3"/>

        <!-- Avatar Information -->
        <b-list-group>
            <b-list-group-item class="d-flex align-items-center sidebar-kanban-avatar">
                <b-avatar variant="info" src="https://placekitten.com/300/300" size=lg></b-avatar>
                <b-list-group class="avatar-info">
                    <b-list-group-item class="align-items-center">
                        Mr. Cat
                    </b-list-group-item>
                    <b-list-group-item class="align-items-center sidebar-kanban-role">
                        Programmer
                    </b-list-group-item>
                </b-list-group>
            </b-list-group-item>
        </b-list-group>

        <hr/>
        <!-- Main Menu -->
        <p class="nav-link"> Menu </p>

        <b-list-group>
            <!-- List of Boards -->
            <b-list-group-item v-b-toggle.collapse-boards class="sidebar-button">
                Boards
            </b-list-group-item>
            <b-collapse id="collapse-boards" style="width:100%">
            <b-list-group-item
                v-for="(answer, index) in this.boards"
                :key="index"
                class="sidebar-button-collapsible"
                :href="`/board/${index}`"
                >Board #{{index+1}}
            </b-list-group-item>
            </b-collapse>

            <!-- List of Teams -->

            <b-list-group-item v-b-toggle.collapse-teams class="sidebar-button">
                Teams
            </b-list-group-item>
            <b-collapse id="collapse-teams" style="width:100%">
            <b-list-group-item
                v-for="(answer, index) in this.teams"
                :key="index"
                class="sidebar-button-collapsible"
                >Team #{{answer}}
            </b-list-group-item>
            </b-collapse>

            <!-- Overall Statistics -->

            <b-list-group-item class="sidebar-button">
                Statistics
            </b-list-group-item>

            <!-- Overall Statistics -->

            <b-list-group-item class="sidebar-button">
                Logout
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Sidebar from '@/components/Sidebar.vue'
export default {
  components: {
    Sidebar
  },
  data () {
    return {
      teams: [1,2]
    }
  },
  computed: {
    ...mapState([
      'boards'
    ])
  }
}
</script>