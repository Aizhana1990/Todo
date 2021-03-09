// CRUD CREAD READ UPDATE DELETE

//Получаем все элементы HTML
let todoName = document.querySelector('.task-name')
let addBtn = document.querySelector('.add-todo')
let todoBlock = document.querySelector('.todos')
let clearAll = document.querySelector('.clear-all')


//Добавялем дело при клике на кнопку добавить
addBtn.addEventListener('click', () => addTodo())

//Обработка собития при клике на кнопку Очистить все
clearAll.addEventListener('click', () => clear())

//Довабляем днло при клике на Enter
todoName.addEventListener('keypress', (e)=>{
    if (e.key === 'Enter') {
        addTodo()
    }
})

//Получаем все данные из localStorage, если их там нет,то даем новый массив
function getTodos() {
    return JSON.parse(localStorage.getItem('todos')) || []
}

///Запускаем при клике на кнопку добавить
function addTodo() {
    //берем данные из inputa
    let newTodo = todoName.value
    //проверяем на пустоту
    if (newTodo.length > 0) {
        //получаем данные из localStorage и создаем массив, в котором все из этого хранилища
        //и через запятую значение из инпут.
        let todos = getTodos()
        todos = [...todos, newTodo]
        //записываем обновленый массив в localStorage
        localStorage.setItem('todos', JSON.stringify(todos))
        //Перериросывываем список
        view()
        //чистим инпут
        todoName.value = '' //обнуляет
    }
}

//отрисовка списка на страницу
function view() {
    let tasks = getTodos()
    let list = ''
    //Перебираем масив со всеми делами и складываем <li> в переменную list в виде строки
    tasks.forEach(item => list = list + `<li class="list-group-item d-flex justify-content-between">${item} <button class="del-btn btn btn-danger">Del</button></li>`)
    //вставляем список на страницу
    todoBlock.innerHTML = `<ul class="list-group ">` + list + `</ul>`
    //Берем все кнокпи удаления и навешиваем на каждую собитые клика.
    document.querySelectorAll('.del-btn').forEach((button, idx) =>{
        button.addEventListener('click', ()=>{
            //Вырезаем по индексу удаленный элемент
            tasks.splice(idx, 1)
            //после удаления записываем массив без этого элемента хранилища
            localStorage.setItem('todos',JSON.stringify(tasks))
            //перерисовка
            view()
        })
    })
}
//очистка
function clear(){
    //удаляем строку и localStorage по названию ключа todos
    localStorage.removeItem('todos')
    //перерисовка
    view()
}
view()

//Область видимости переменной ограничена фигурными скобками
//в которых она была объявлена
// {
//     let a = 10
//     console.log(a)
// }
//     let a = 20
//     console.log(a)
//Ограничили фигурными скобками, поэтому код будет работать.


