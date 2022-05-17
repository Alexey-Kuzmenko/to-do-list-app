// * array of tasks
const tasks = [
    {
        _id: '5d2ca9e2e03d40b326596aa7',
        completed: false,
        body:
            'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
        title: 'Eu ea incididunt sunt consectetur fugiat non.',
    },
    {
        _id: '5d2ca9e29c8a94095c1288e0',
        completed: false,
        body:
            'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
        title:
            'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
    },
    {
        _id: '5d2ca9e2e03d40b3232496aa7',
        completed: false,
        body:
            'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
        title: 'Eu ea incididunt sunt consectetur fugiat non.',
    },
    {
        _id: '5d2ca9e29c8a94095564788e0',
        completed: false,
        body:
            'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
        title:
            'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
    },
];

(function (arrOfTasks) {
    // ! convert array to object
    let objectOfTasks = arrOfTasks.reduce((acc, task) => {
        acc[task._id] = task
        return acc
    }, {})

    const themes = {
        default: {
            '--main-color': '#20222a',
            '--main-text-color': '#ffffff',
            '--elements-color': '#f4c038',
            '--section-btn-color': '#ed422b',
            '--complete-btn-color': '#3cbf27',
            '--all-tasks-btn-color': '#2da0e0',
            '--unfinished-tasks-btn-color': '#f47523',
            '--restore-btn-color': 'rgba(255, 255, 255, 0.5)',
        },
        light: {
            '--main-color': '#ffffff',
            '--main-text-color': '#425170',
            '--elements-color': '#425170',
            '--section-btn-color': '#ed422b',
            '--complete-btn-color': '#3cbf27',
            '--all-tasks-btn-color': '#2da0e0',
            '--unfinished-tasks-btn-color': '#f47523',
            '--btn-text-color': '#425170',
            '--restore-btn-color': '#425170',
        },
    }

    let lastSelectedTheme = 'default'

    // * UI elements
    const pageContainer = document.querySelectorAll('.flex-container')[1]
    const form = document.forms['form']
    const inputTitle = form.elements['title']
    const inputBody = form.elements['body']
    const navContainer = document.querySelector('.nav-btn-container')
    const themeSelect = document.getElementById('themeSelect')

    // ! calling functions
    renderTasks(objectOfTasks)
    form.addEventListener('submit', formSubmitActionHendler)
    pageContainer.addEventListener('click', onCompleteHeandler)
    pageContainer.addEventListener('click', onRestoreHeandler)
    navContainer.addEventListener('click', onNavBtnClickHeandler)
    themeSelect.addEventListener('change', onThemeSelectHeandler)

    // * function wich render UI elements 
    function renderTasks(objOfTasks) {

        if (!objOfTasks) {
            console.error('refer list of tasks');
            return
        }

        const fragment = document.createDocumentFragment()

        Object.values(objOfTasks).forEach(task => {
            const taskSection = taskSectionTemplate(task)
            fragment.appendChild(taskSection)
        })

        pageContainer.appendChild(fragment)
    }

    // * task section template
    function taskSectionTemplate({ _id, title, body } = {}) {
        let elementsArray = []

        // ! perent element
        const div = document.createElement('div')
        div.classList.add('tasks-section')
        div.setAttribute('data-task-id', _id)

        const taskTitle = document.createElement('span')
        taskTitle.classList.add('tasks-section-span')
        taskTitle.textContent = title

        const taskButton = document.createElement('button')
        taskButton.classList.add('tasks-section-btn')
        taskButton.textContent = 'Delete'

        const completeTaskBtn = document.createElement('button')
        completeTaskBtn.classList.add('tasks-section-complete-btn')
        completeTaskBtn.textContent = 'Complete'

        const restoreTaskBtn = document.createElement('button')
        restoreTaskBtn.classList.add('tasks-section-restore-btn')
        restoreTaskBtn.textContent = 'Restore'

        const taskBody = document.createElement('p')
        taskBody.classList.add('tasks-section-p')
        taskBody.textContent = body

        elementsArray.push(taskTitle, taskBody, taskButton, completeTaskBtn, restoreTaskBtn)
        elementsArray.forEach(el => {
            div.appendChild(el)
        })

        return div
    }

    // * generate task id
    function createTaskId() {
        let id = '';
        id += Math.random().toString(36).slice(2);
        return id
    }

    // * create new task 
    function formSubmitActionHendler(event) {
        event.preventDefault()
        const titleValue = inputTitle.value
        const bodyValue = inputBody.value

        const task = createNewTask(titleValue, bodyValue)
        const newTaskSection = taskSectionTemplate(task)
        pageContainer.insertAdjacentElement('afterbegin', newTaskSection)
        form.reset()
    }

    function createNewTask(title, body) {
        const newTaskObject = {
            title,
            body,
            completed: false,
            _id: createTaskId(),
        }

        objectOfTasks[newTaskObject._id] = newTaskObject
        return { ...newTaskObject }
    }

    // * delete task
    pageContainer.addEventListener('click', onDeleteHeandler, {
        once: false,
        capture: false,
        passive: false,
    })

    function deleteTask(id) {
        const taskTitle = objectOfTasks[id].title
        const isConfirm = confirm(`Are you sure you want to delete the task: ${taskTitle}`)
        if (isConfirm === false) {
            return isConfirm
        }

        delete objectOfTasks[id]
        return isConfirm
    }

    function deleteElementFromHtml(confirmed, element) {
        if (!confirmed) {
            return
        }
        element.remove()
    }

    function onDeleteHeandler({ target }) {
        if (target.classList.contains('tasks-section-btn')) {
            const perentElement = target.closest('[data-task-id]')
            const perentElementId = perentElement.dataset.taskId
            const confirmed = deleteTask(perentElementId)
            deleteElementFromHtml(confirmed, perentElement)
        }
    }

    // * complete task 
    function onCompleteHeandler({ target }) {
        if (target.classList.contains('tasks-section-complete-btn')) {
            const perentElement = target.closest('[data-task-id]')
            const perentElementId = perentElement.dataset.taskId
            perentElement.classList.add('completed')
            const object = objectOfTasks[perentElementId]
            object.completed = true
            const restoreBtn = perentElement.lastElementChild
            restoreBtn.style = 'display:inline-block'
        }
    }

    // * cestore task 
    function onRestoreHeandler({ target }) {
        if (target.classList.contains('tasks-section-restore-btn')) {
            const perentElement = target.closest('[data-task-id]')
            const perentElementId = perentElement.dataset.taskId
            perentElement.classList.remove('completed')
            const object = objectOfTasks[perentElementId]
            object.completed = false
            target.style = 'display:none'
            perentElement.style = 'order:0'
        }
    }

    // * sort object of tasks 
    function sortTasks(objectOfTasks, completed) {
        if (!completed) {
            return Object.values(objectOfTasks).filter(task => task.completed === false)
        }
        return Object.values(objectOfTasks).filter(task => task.completed === true)
    }

    // * nav buttonts container heandler  
    function onNavBtnClickHeandler({ target }) {
        const arrOfTaskSections = [...pageContainer.children]

        if (target.classList.contains('unfinished-tasks')) {
            const arrOfCompletedTasks = sortTasks(objectOfTasks, true)

            arrOfCompletedTasks.map(task => task._id)
                .forEach(objtaskId => {
                    const section = arrOfTaskSections.find(section => section.dataset.taskId === objtaskId)
                    section.style = 'display:none'
                }
                )
        } else if (target.classList.contains('all-tasks')) {
            const arrOfCompletedTasks = sortTasks(objectOfTasks, true)

            arrOfCompletedTasks.map(task => task._id)
                .forEach(objtaskId => {
                    const section = arrOfTaskSections.find(section => section.dataset.taskId === objtaskId)
                    section.style = 'display:block'
                    section.style = 'order: 2'
                })
        }
    }

    // * theme select
    function onThemeSelectHeandler(e) {
        const selectedTheme = themeSelect.value
        const isConfirm = confirm(`Do you want applay ${selectedTheme} color theme?`)
        if (!isConfirm) {
            themeSelect.value = lastSelectedTheme
            return
        }

        setTheme(selectedTheme)
        lastSelectedTheme = selectedTheme

    }

    function setTheme(name) {
        const selectedThemeObject = themes[name]
        Object.entries(selectedThemeObject).forEach(([key, value]) => {
            console.log(key, value);
            document.documentElement.style.setProperty(key, value)
        })
    }

})(tasks)