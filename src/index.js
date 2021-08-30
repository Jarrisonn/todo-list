import { compareAsc, format } from "date-fns";
import "./style.css";
const projectContainer = document.querySelector(".project-container")
const todoContainer = document.querySelector(".todo-container")

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
    this.selected = true 
    clearTodoDom();
    showTodoDom();
  }
  deSelect(){
      this.selected = false
      
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
const secondProject = new Project("secondProject", [newTodo1,newTodo,newTodo], false);
const thirdProject = new Project("thirdProject", [newTodo2], false);

let projectList = [defaultProject,secondProject,thirdProject];


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

            projectNameEl.innerText = project.name
            todoTitleEl.innerText = todo.title 
            todoDescEl.innerText = todo.description
            todoDueDateEl.innerText = todo.dueDate
            todoPriorityEl.innerText = todo.priority

            
            item.classList.add("todo")

            
            item.appendChild(projectNameEl)
            item.appendChild(todoTitleEl)
            item.appendChild(todoDescEl)
            item.appendChild(todoDueDateEl)
            item.appendChild(todoPriorityEl)
            todoContainer.appendChild(item)
            

        });
    }
  });
};

showTodoDom();

const clearTodoDom = () => {
    todoContainer.innerHTML = ""
}

const showProjectListDom = () => {
    const projectListEl = document.createElement("ul")
    projectListEl.classList.add("project-list")
    projectList.forEach(project => {
        const projectNameEl = document.createElement("h2")
        projectNameEl.innerText = project.name
        projectListEl.appendChild(projectNameEl)
        projectContainer.appendChild(projectListEl)
        if(project.selected){
            projectNameEl.classList.add("selected")

        }else if(!project.selected){
            projectNameEl.classList.remove("selected")

        }
    })
}
showProjectListDom();

const selectProjectDom = () => {
    const projectListEl = document.querySelector(".project-list")
    projectListEl.addEventListener("click", (e) => {
        projectListEl.childNodes.forEach(node => {
            node.classList.remove("selected")
            
        })
        e.target.classList.add("selected")
        
        setProjectAsDeselected(e.target.innerText);
        setProjectAsSelected(e.target.innerText);
        

         
    })

   
}
selectProjectDom();


const setProjectAsSelected = (projectName) => {
  projectList.forEach((project) => {
      
    if (projectName === project.name) {
        project.select();
        
    }else if(projectName !== project.name){
        project.deSelect();
        
    }
    console.log(project);
  });
};

const setProjectAsDeselected = (projectName) => {
    projectList.forEach(project => {
        if(projectName !== project.name){
            project.deSelect();
            
        }
    })
}