document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskCategory = document.getElementById('taskCategory');
    const taskReminder = document.getElementById('taskReminder');
    const taskPriority = document.getElementById('taskPriority');
    const taskList = document.getElementById('taskList');

    const modal = document.getElementById('modal');
    const taskIndexModal = document.getElementById('taskIndexModal');
    const taskFormModal = document.getElementById('taskFormModal');
    const taskInputModal = document.getElementById('taskInputModal');
    const taskCategoryModal = document.getElementById('taskCategoryModal');
    const taskReminderModal = document.getElementById('taskReminderModal');
    const taskPriorityModal = document.getElementById('taskPriorityModal');
    const taskListModal = document.getElementById('taskListModal');

    const buttonEditTask = document.getElementById('EditTaskModal');
    buttonEditTask.addEventListener('click', function () {

        tasks[taskIndexModal.value].task = taskInputModal.value;
        tasks[taskIndexModal.value].category = taskCategoryModal.value;
        tasks[taskIndexModal.value].reminder = taskReminderModal.value;
        tasks[taskIndexModal.value].priority = taskPriorityModal.value;

        saveTasks();
        renderTasks();

        taskInputModal.value = taskCategoryModal.value = taskReminderModal.value = taskPriorityModal.value = '';

        modal.style.display = 'none';
    })

    const priorityFilter = document.getElementById('priority-filter');
    const categoryFilter = document.getElementById('category-filter');

    const buttonLogout = document.getElementById('button-logout');
    buttonLogout.addEventListener('click', function () {
        localStorage.removeItem('logged-in');

        renderForm();
    })

    const buttonLogin = document.getElementById('button-login');
    buttonLogin.addEventListener('click', function () {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (!username || !password) {

            if (username !== 'admin' && password !== 'admin') {
                alert('username atau password salah');

                return;
            }

            alert('password atau username tidak boleh kosong');

            return;
        }

        alert('Halo admin, welcome to task tie');

        localStorage.setItem('logged-in', true); 

        renderForm();
    })

    let priorityFilterText = '';
    let categoryFilterText = '';

    priorityFilter.addEventListener('change', function (evt) {
        priorityFilterText = evt.target.value;

        loadTasksWithFilter(priorityFilterText, categoryFilterText);
    });

    categoryFilter.addEventListener('change', function (evt) {
        categoryFilterText = evt.target.value;

        loadTasksWithFilter(priorityFilterText, categoryFilterText);
    });

    document.getElementById('login-form').addEventListener('click', function (evt) {
        evt.preventDefault();
    })

    let tasks = [];

    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addTask(); 
    });

    taskFormModal.addEventListener('submit', function (evt) {
        evt.preventDefault();
    })
   
    function addTask() {
        const task = taskInput.value.trim();
        const category = taskCategory.value;
        const reminder = taskReminder.value;
        const priority = taskPriority.value;

        if (task === '' || category === '' || priority === '') {
            alert('Task, kategory atau priority tidak boleh kosong');
            return;
        }

        const newTask = {
            task: task,
            category: category,
            reminder: reminder,
            priority: priority,
            completed: false
        };

        tasks.push(newTask);
        saveTasks();
        renderTasks();
        taskForm.reset();
    }

    function renderTasks() {
        taskList.innerHTML = '';

        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];
            const taskItem = document.createElement('div');
            taskItem.classList.add('task');

            const taskText = document.createElement('div');
            taskText.classList.add('task-text');
            taskText.textContent = task.task;

            const taskActions = document.createElement('div');
            taskActions.classList.add('task-actions');

            const editBtn = document.createElement('button');
            editBtn.classList.add('edit-btn');
            editBtn.textContent = 'Edit';
            editBtn.addEventListener('click', function() {
                editTask(i);
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-btn');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', function() {
                deleteTask(i);
            });

            taskActions.appendChild(editBtn);
            taskActions.appendChild(deleteBtn);

            const taskInfo = document.createElement('div');
            taskInfo.classList.add('task-info');
            taskInfo.innerHTML = `
                <span>Category: ${task.category}</span>
                <span>Time: ${task.reminder}</span>
                <span>Priority: ${task.priority}</span>
            `;

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', function() {
                toggleTaskStatus(i);
            });

            const checklist = document.createElement('div');
            checklist.classList.add('checklist');
            checklist.appendChild(checkbox);
            checklist.appendChild(taskText);

            taskItem.appendChild(checklist);
            taskItem.appendChild(taskInfo);
            taskItem.appendChild(taskActions);

            if (task.completed) {
                taskItem.classList.add('completed');
            }

            taskItem.classList.add(task.priority + '-priority');

            taskList.appendChild(taskItem);
        }
    }

    function editTask(index) {
        modal.style.display = 'block';

        const task = tasks[index];

        taskIndexModal.value = index;
        taskInputModal.value = task.task;
        taskCategoryModal.value = task.category;
        taskReminderModal.value = task.reminder;
        taskPriorityModal.value = task.priority;

    }

    function deleteTask(index) {

        const deleted = confirm('Are you sure want to delete this task?');

        if (deleted) {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        }
    }

    function toggleTaskStatus(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        loadTasksWithFilter('');
    }

    function renderForm() {
        const hasLoggedIn = localStorage.getItem('logged-in');

        if (hasLoggedIn) {
            document.getElementById('container').style.display = 'block';
            document.getElementById('login-container').style.display = 'none';
        } else {
            document.getElementById('login-container').style.display = 'block';
            document.getElementById('container').style.display = 'none';
        }
    }
    
    function loadTasksWithFilter(priority, category) {
        priority = priority || '';
        category = category || '';

        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {

            const filteredTasks = [];

            for (const storedTask of JSON.parse(storedTasks)) {

                if ((!priority || storedTask.priority === priority) && (!category || storedTask.category === category)) {
                    filteredTasks.push(storedTask);
                }
            }

            tasks = filteredTasks;
            renderTasks();
        }
    }
    
    loadTasks();
    renderForm();

const prioritySelect = document.getElementById('priority');

prioritySelect.addEventListener('change', function() {
  const selectedPriority = prioritySelect.value;
  const tasks = taskList.children;

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const priority = task.dataset.priority;

    if (selectedPriority === 'all') {
      task.style.display = 'block';
    } else {
      task.style.display = priority === selectedPriority ? 'block' : 'none';
    }
  }
});

});