import "./style.css";

const projectContainer = document.querySelector(".project-container");
const todoContainer = document.querySelector(".todo-container");
const createTodoContainer = document.querySelector(".create-todo");

const localStorage = window.localStorage;

class Todo {
  constructor(
    title,
    description,
    creationDate,
    dueDate,
    priority,
    status,
    project
  ) {
    this.title = title;
    this.description = description;
    this.creationDate = creationDate;
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = status;
    this.project = project;
  }
  changeStatus() {
    //if status is true, todo is complete
    this.status = !this.status;
  }
}

class Project {
  constructor(name, todosList, selected) {
    this.name = name;
    this.todosList = todosList;
    this.selected = selected;
  }

  select() {
    this.selected = true;
    clearTodoDom();
    showTodoDom();
  }
  deSelect() {
    this.selected = false;
  }
}

const newTodo = new Todo(
  "Title",
  "desc",
  new Date(),
  "Monday 10th",
  "2",
  true,
  "default"
);
const newTodo1 = new Todo(
  "Title1",
  "desc1",
  new Date(),
  "Tuesday 11th",
  "5",
  false,
  "secondList"
);
const newTodo2 = new Todo(
  "Title2",
  "desc1",
  new Date(),
  "Tuesday 11th",
  "8",
  false,
  "thirdList"
);

const defaultProject = new Project("default", [newTodo], true);
const secondProject = new Project(
  "secondProject",
  [newTodo1, newTodo, newTodo],
  false
);
const thirdProject = new Project("thirdProject", [newTodo2], false);

let projectList = [defaultProject, secondProject, thirdProject];

//make projectList use local storage and turn values back into Project objects so they have required methods
let projectListLS = JSON.parse(localStorage.getItem("projectList"));
let array = [];
if (projectListLS === null) {
  let projectList = [defaultProject, secondProject, thirdProject];
} else {
  projectListLS.forEach((project) => {
    let newProject = new Project(
      project.name,
      project.todosList,
      project.selected
    );
    array.push(newProject);
  });
}

projectList = array;

console.log(projectList);

const showTodoDom = () => {
  projectList.forEach((project) => {
    if (project.selected === true) {
      project.todosList.forEach((todo) => {
        const item = document.createElement("ul");
        const todoTitleEl = document.createElement("h2");
        const todoDescEl = document.createElement("h3");
        const todoCreateDate = document.createElement("h3");
        const todoDueDateEl = document.createElement("h3");
        const todoPriorityEl = document.createElement("h3");
        const todoStatusEl = document.createElement("h3");
        const deleteBtnEl = document.createElement("button");

        deleteBtnEl.innerHTML = `<i class="fas fa-trash"></i>`;
        deleteBtnEl.addEventListener("click", () => {
          removeTodoDom();
          removeTodo(project, todo);
        });

        todoTitleEl.innerText = todo.title;
        item.addEventListener("mouseenter", () => {
          todoDescEl.innerText = todo.description;
          todoDueDateEl.innerText = todo.dueDate;
          todoCreateDate.innerText = `Date todo created: ${todo.creationDate}`;
        });
        item.addEventListener("mouseleave", () => {
          todoDescEl.innerText = "";
          todoDueDateEl.innerText = "";
          todoCreateDate.innerText = "";
        });

        if (todo.status === false) {
          todoStatusEl.innerHTML = `Todo Status: Incomplete <i class="fas fa-times-circle"></i>`;
        } else {
          todoStatusEl.innerHTML = `Todo Status: Complete <i class="fas fa-check-square"></i>`;
        }

        //Change from complete to uncomplete
        todoStatusEl.addEventListener("click", () => {
          todo.changeStatus();
          clearTodoDom();
          showTodoDom();
        });

        if (todo.priority <= 3) {
          item.classList.add("red");
          todoPriorityEl.innerText = `The priority is high, set to ${todo.priority}`;
        } else if (todo.priority > 4 && todo.priority < 7) {
          item.classList.add("yellow");
          todoPriorityEl.innerText = `The priority is medium, set to ${todo.priority}`;
        } else if (todo.priority >= 8) {
          item.classList.add("green");
          todoPriorityEl.innerText = `The priority is low, set to ${todo.priority}`;
        }

        item.classList.add("todo");

        item.appendChild(todoTitleEl);
        item.appendChild(todoDescEl);
        item.appendChild(todoCreateDate);
        item.appendChild(todoDueDateEl);
        item.appendChild(todoPriorityEl);
        item.appendChild(todoStatusEl);
        item.appendChild(deleteBtnEl);
        todoContainer.appendChild(item);
      });
    }
  });
};

showTodoDom();

const removeTodoDom = () => {
  const todo = document.querySelector(".todo");
  todo.remove();
};
const removeTodo = (project, todo) => {
  console.log(todo);
  console.log(project);
  if (project.todosList.includes(todo)) {
    let index = project.todosList.indexOf(todo);
    project.todosList.splice(index, 1);
    clearTodoDom();
    showTodoDom();
  }
};

const clearTodoDom = () => {
  todoContainer.innerHTML = "";
};
const clearProjectDom = () => {
  projectContainer.innerHTML = "";
};

const showProjectListDom = () => {
  clearProjectDom();
  let i = 1;
  const projectListEl = document.createElement("ul");
  projectListEl.classList.add("project-list");
  const showProjectsButton = document.createElement("button");
  showProjectsButton.innerText = "Show Projects List";
  projectListEl.appendChild(showProjectsButton);
  projectContainer.appendChild(projectListEl);
  showProjectsButton.addEventListener("click", () => {
    showProjectsButton.innerText = "Hide Projects List";
    if (i % 2 === 1) {
      console.log(i);
      i++;
      projectList.forEach((project) => {
        const projectNameEl = document.createElement("h2");
        projectNameEl.classList.add("project");
        projectNameEl.innerText = project.name;
        projectListEl.appendChild(projectNameEl);
      });
    } else {
      showProjectListDom();
      selectProjectDom();
      createProjectDom();
    }
  });
};
showProjectListDom();

const selectProjectDom = () => {
  const projectListEl = document.querySelector(".project-list");
  projectListEl.addEventListener("click", (e) => {
    projectListEl.childNodes.forEach((node) => {
      node.classList.remove("selected");
    });
    if (e.target.nodeName === "H2") {
      e.target.classList.add("selected");
    }

    setProjectAsDeselected(e.target.innerText);
    setProjectAsSelected(e.target.innerText);
  });
};
selectProjectDom();

const setProjectAsSelected = (projectName) => {
  projectList.forEach((project) => {
    if (projectName === project.name) {
      project.select();
    } else if (projectName !== project.name) {
      project.deSelect();
    }
  });
};

const setProjectAsDeselected = (projectName) => {
  projectList.forEach((project) => {
    if (projectName !== project.name) {
      project.deSelect();
    }
  });
};

const createProjectDom = () => {
  const createProjectButton = document.createElement("button");
  createProjectButton.innerText = "Create a new Project!";
  createProjectButton.classList.add("create-project-button");
  createProjectButton.addEventListener("click", () => {
    const form = document.createElement("form");

    form.classList.add("create-project");
    todoContainer.classList.add("hidden");

    const projectNameInput = document.createElement("input");
    const projectNameLabel = document.createElement("label");
    const projectSubmitButton = document.createElement("button");
    const projectCancelButton = document.createElement("button");

    projectNameLabel.htmlFor = "name";
    projectNameLabel.innerText = "Please enter a name for your project \n";
    projectNameInput.name = "name";

    projectSubmitButton.innerText = "Submit";
    projectCancelButton.innerHTML = `<i class="fas fa-trash"></i>`;
    projectCancelButton.classList.add("cancel-project");

    projectCancelButton.addEventListener("click", (e) => {
      e.preventDefault();
      form.remove();
      todoContainer.classList.remove("hidden");
    });

    form.appendChild(projectNameLabel);
    form.appendChild(projectNameInput);
    form.appendChild(projectSubmitButton);
    form.appendChild(projectCancelButton);
    projectContainer.appendChild(form);

    projectSubmitButton.addEventListener("click", (e) => {
      e.preventDefault();
      createProject(projectNameInput.value);
      form.remove();
      todoContainer.classList.remove("hidden");
    });
  });
  projectContainer.appendChild(createProjectButton);
};
createProjectDom();

const createProject = (name) => {
  const project = new Project(name, [], false);
  projectList.push(project);
  console.log(projectList);
  showProjectListDom();
  selectProjectDom();
  createProjectDom();
  localStorage.setItem("projectList", JSON.stringify(projectList));
};

const createTodoDom = () => {
  const createTodoButton = document.createElement("button");
  createTodoButton.innerText = "Add a new todo!";

  createTodoButton.addEventListener("click", () => {
    createTodoButton.classList.add("hidden");
    todoContainer.classList.add("hidden");

    const form = document.createElement("form");

    const titleInput = document.createElement("input");
    const titleLabel = document.createElement("label");
    titleLabel.innerText = "Please enter a title for the todo";

    const descriptionInput = document.createElement("input");
    const descriptionLabel = document.createElement("label");
    descriptionLabel.innerText = "Please enter a description of the todo";

    const dueDateInput = document.createElement("input");
    dueDateInput.type = "date";
    const dueDateLabel = document.createElement("label");
    dueDateLabel.innerText = "Please enter the due date of the todo";

    const priorityInput = document.createElement("input");
    priorityInput.type = "range";
    priorityInput.min = "1";
    priorityInput.max = "10";
    const priorityLabel = document.createElement("label");
    priorityLabel.innerText =
      "Please enter the priority of the todo from 1 to 10, 1 being most important with 10 being least important";

    const projectNameInput = document.createElement("input");
    const projectNameLabel = document.createElement("label");
    projectNameLabel.innerText =
      "Please enter the name of the project for the todo to go on ";
    projectList.forEach((project) => {
      if (project.selected) {
        projectNameInput.value = project.name;
      }
    });

    const submitButton = document.createElement("button");
    submitButton.innerText = "Submit new Todo!";
    submitButton.addEventListener("click", (e) => {
      e.preventDefault();
      createTodoButton.classList.remove("hidden");
      createTodo(
        titleInput.value,
        descriptionInput.value,
        dueDateInput.valueAsDate,
        priorityInput.value,
        projectNameInput.value
      );
      createTodoContainer.removeChild(form);
      todoContainer.classList.remove("hidden");
      clearTodoDom();
      showTodoDom();
    });
    const cancelButton = document.createElement("button");
    cancelButton.innerHTML = `<i class="fas fa-trash"></i>`;
    cancelButton.classList.add("cancel-todo");
    cancelButton.addEventListener("click", (e) => {
      e.preventDefault();
      createTodoButton.classList.remove("hidden");
      form.remove();
      todoContainer.classList.remove("hidden");
    });

    form.appendChild(titleLabel);
    form.appendChild(titleInput);
    form.appendChild(descriptionLabel);
    form.appendChild(descriptionInput);
    form.appendChild(dueDateLabel);
    form.appendChild(dueDateInput);
    form.appendChild(priorityLabel);
    form.appendChild(priorityInput);
    form.appendChild(projectNameLabel);
    form.appendChild(projectNameInput);
    form.appendChild(submitButton);

    form.appendChild(cancelButton);
    createTodoContainer.appendChild(form);
  });

  createTodoContainer.appendChild(createTodoButton);
};
createTodoDom();

const createTodo = (title, description, dueDate, priority, projectName) => {
  const todo = new Todo(
    title,
    description,
    new Date(),
    dueDate,
    priority,
    false,
    projectName
  );
  projectList.forEach((project) => {
    if (project.name === projectName) {
      project.todosList.push(todo);
    }
  });
  localStorage.setItem("projectList", JSON.stringify(projectList));
  console.log(projectList);
  clearTodoDom();
  showTodoDom();
};
