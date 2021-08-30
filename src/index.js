import { compareAsc, format } from "date-fns";
import "./style.css";
const projectContainer = document.querySelector(".project-container");
const todoContainer = document.querySelector(".todo-container");
const createTodoContainer = document.querySelector(".create-todo");
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
  "High",
  false,
  "default"
);
const newTodo1 = new Todo(
  "Title1",
  "desc1",
  new Date(),
  "Tuesday 11th",
  "Low",
  false,
  "secondList"
);
const newTodo2 = new Todo(
  "Title2",
  "desc1",
  new Date(),
  "Tuesday 11th",
  "Low",
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

const showTodoDom = () => {
  projectList.forEach((project) => {
    if (project.selected === true) {
      project.todosList.forEach((todo) => {
        const item = document.createElement("ul");
        const projectNameEl = document.createElement("h2");
        const todoTitleEl = document.createElement("h2");
        const todoDescEl = document.createElement("h3");
        const todoDueDateEl = document.createElement("h3");
        const todoPriorityEl = document.createElement("h3");

        projectNameEl.innerText = project.name;
        todoTitleEl.innerText = todo.title;
        todoDescEl.innerText = todo.description;
        todoDueDateEl.innerText = todo.dueDate;
        todoPriorityEl.innerText = todo.priority;

        item.classList.add("todo");

        item.appendChild(projectNameEl);
        item.appendChild(todoTitleEl);
        item.appendChild(todoDescEl);
        item.appendChild(todoDueDateEl);
        item.appendChild(todoPriorityEl);
        todoContainer.appendChild(item);
      });
    }
  });
};

showTodoDom();

const clearTodoDom = () => {
  todoContainer.innerHTML = "";
};
const clearProjectDom = () => {
  projectContainer.innerHTML = "";
};

const showProjectListDom = () => {
  clearProjectDom();
  const projectListEl = document.createElement("ul");
  projectListEl.classList.add("project-list");
  projectList.forEach((project) => {
    const projectNameEl = document.createElement("h2");
    projectNameEl.innerText = project.name;
    projectListEl.appendChild(projectNameEl);
    projectContainer.appendChild(projectListEl);
    if (project.selected) {
      projectNameEl.classList.add("selected");
    } else if (!project.selected) {
      projectNameEl.classList.remove("selected");
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
    e.target.classList.add("selected");

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
  createProjectButton.addEventListener("click", () => {
    const form = document.createElement("form");

    const projectNameInput = document.createElement("input");
    const projectNameLabel = document.createElement("label");
    const projectSubmitButton = document.createElement("button");

    projectNameLabel.htmlFor = "name";
    projectNameLabel.innerText = "Please enter a name for your project \n";
    projectNameInput.name = "name";

    projectSubmitButton.innerText = "Submit";

    form.appendChild(projectNameLabel);
    form.appendChild(projectNameInput);
    form.appendChild(projectSubmitButton);
    todoContainer.appendChild(form);

    projectSubmitButton.addEventListener("click", (e) => {
      e.preventDefault();
      createProject(projectNameInput.value);
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
};


const getProjectName = () => {
    projectList.forEach(project => {
        if(project.selected){
            console.log(project.name);
            return project.name
            
        }
    })
}


const createTodoDom = () => {
    
  const createTodoButton = document.createElement("button");
  createTodoButton.innerText = "Add a new todo!";
  createTodoButton.addEventListener("click", () => {
    let fName = getProjectName();

      console.log(fName);
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
    const priorityLabel = document.createElement("label");
    priorityLabel.innerText = "Please enter the priority of the todo";
    const projectNameInput = document.createElement("input");
    const projectNameLabel = document.createElement("label");
    projectNameLabel.innerText =
      "Please enter the name of the project for the todo to go on ";
    const submitButton = document.createElement("button");
    submitButton.innerText = "Submit new Todo!";
    submitButton.addEventListener("click", (e) => {
      e.preventDefault();
      createTodo(
        titleInput.value,
        descriptionInput.value,
        dueDateInput.valueAsDate,
        priorityInput.value,
        projectNameInput.value
      );
      createTodoContainer.removeChild(form);
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
  console.log(projectList);
  clearTodoDom();
  showTodoDom();
};
