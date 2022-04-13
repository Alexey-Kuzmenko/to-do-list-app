
// * array of tasks
const tasks = [
    {
        _id: '5d2ca9e2e03d40b326596aa7',
        completed: true,
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
        completed: true,
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

    // * UI elements
    const pageContainer = document.querySelector('.flex-container')
    const form = document.forms['form']
    const inputTitle = form.elements['title']
    const inputBody = form.elements['body']

    // ! calling functions
    renderTasks(objectOfTasks)
    form.addEventListener('submit', formSubmitActionHendler, {
        // once: false,
        // capture: false,
    })

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

        // * perent element
        const div = document.createElement('div')
        div.classList.add('tasks-section')
        div.setAttribute('data-task-id', _id)

        const taskTitle = document.createElement('span')
        taskTitle.classList.add('tasks-section-span')
        taskTitle.textContent = title

        const taskButton = document.createElement('button')
        taskButton.classList.add('tasks-section-btn')
        taskButton.textContent = 'Delete'

        const taskBody = document.createElement('p')
        taskBody.classList.add('tasks-section-p')
        taskBody.textContent = body

        elementsArray.push(taskTitle, taskButton, taskBody)
        elementsArray.forEach(el => {
            div.appendChild(el)
            // ! testing
            // console.log(div);
        })

        return div
    }

    // * function wich generate id for task
    function createTaskId() {
        let id = '';
        id += Math.random().toString(36).slice(2);
        return id
    }

    function formSubmitActionHendler(event) {
        event.preventDefault()
        const titleValue = inputTitle.value
        const bodyValue = inputBody.value

        const task = createNewTask(titleValue, bodyValue)
        const newTaskSection = taskSectionTemplate(task)
        pageContainer.insertAdjacentElement('afterbegin', newTaskSection)
        form.reset()
    }

    function createNewTask(title, body,) {
        const newTaskObject = {
            title,
            body,
            completed: false,
            _id: createTaskId(),
        }

        objectOfTasks[newTaskObject._id] = newTaskObject

        return { ...newTaskObject }
    }

    // ! delete task
    pageContainer.addEventListener('click', onDeleteHeandler, {
        once: false,
        capture: false,
        passive: false,
    })

    function deleteTask(id) {
        const taskTitle = objectOfTasks[id].title
        const isConfirm = confirm(`Are you sure you want to delete the task: ${taskTitle}`)
        if (confirm === false) {
            return confirm
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



})(tasks)