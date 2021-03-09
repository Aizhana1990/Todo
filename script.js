let todoName = document.querySelector('.task-name')
let addBtn = document.querySelector('.add-todo')
let todoBlock = document.querySelector('.todos')
let clearAll = document.querySelector('.clear-all')


addBtn.addEventListener('click', () => addTodo())
clearAll.addEventListener('click', () => clear())

todoName.addEventListener('keypress', (e)=>{
    if (e.key === 'Enter') {
        addTodo()
    }
})

function getTodos() {
    return JSON.parse(localStorage.getItem('todos')) || []
}


function addTodo() {
    let newTodo = todoName.value
    if (newTodo.length > 0) {
        let todos = getTodos()
        todos = [...todos, newTodo]
        localStorage.setItem('todos', JSON.stringify(todos))
        view()
        todoName.value = ''
    }
}

function view() {
    let tasks = getTodos()
    let list = ''
    tasks.forEach(item => list = list + `<li class="list-group-item d-flex justify-content-between">${item} <button class="del-btn btn btn-danger">Del</button></li>`)
    todoBlock.innerHTML = `<ul class="list-group ">` + list + `</ul>`
    document.querySelectorAll('.del-btn').forEach((button, idx) =>{
        button.addEventListener('click', ()=>{
            tasks.splice(idx, 1)
            localStorage.setItem('todos',JSON.stringify(tasks))
            view()
        })
    })
}
function clear(){
    localStorage.removeItem('todos')
    view()
}
view()




