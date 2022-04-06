
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
    const objectOfTasks = arrOfTasks.reduce((acc, task) => {
        acc[task._id] = task
        return acc
    }, {})

    // * UI elements
    const pageContainer = document.querySelector('.container')

    // ! calling functions
    renderTasks(objectOfTasks)

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

})(tasks)