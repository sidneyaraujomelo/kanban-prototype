export default {
    Backlog: {
        prev : null,
        next : "ToDo"
    },
    ToDo: {
        prev : "Backlog",
        next : "Doing"
    },
    Doing: {
        prev : "ToDo",
        next : "Done"
    },
    Done : {
        prev : "Doing",
        next : null
    }
}