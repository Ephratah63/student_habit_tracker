// Initializing an empty array to hold the task items
const taskList = [
  /* Uncomment to add default tasks
  {
    name: "read a book",
    due: "07-31-2026"
  },
  {
    name: "study DSA chapter 1",
    due: "07-28-2016"
  }
  */
];

/*
The function add_tasks():
--> retrieves values from the input fields, 
--> checks if they are filled, 
--> adds these tasks to the taskList, 
--> clears the inputs, and 
--> updates the displayed list.
*/
function add_tasks() {
  const taskInputElement = document.querySelector(".add_tasks_field");
  const taskName = taskInputElement.value.trim();

  const dateInputElement = document.querySelector(".due_date");
  const dueDate = dateInputElement.value;

  const categoryInputElement = document.querySelector(".category");
  const categoryName = categoryInputElement.value.trim();

  // Check if all fields have values
  if (taskName && dueDate && categoryName) {
    // Add the new task to the list
    taskList.push({
      name: taskName,
      due: dueDate,
      category: categoryName,
      completed: false, // Track checkbox state
    });

    // Clear the input fields for new entries
    taskInputElement.value = "";
    dateInputElement.value = "";

    save_tasks_locally();

    // Update the displayed list
    display_tasks();
  } else {
    alert("Please fill in all required fields!");
  }
}

/*
The display_tasks() function:
--> creates list items for each task in the taskList and 
--> appends the items to the <ul>
*/
function display_tasks() {
  const tasksListElement = document.getElementById("tasks_list");

  // Clear existing elements listed on the page
  tasksListElement.innerHTML = "";

  taskList.forEach((task, index) => {
    const listItem = document.createElement("li");

    // Create a checkbox element
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    // Set checked state based on task completion
    checkBox.checked = task.completed;
    // Add event listener to update task completion status when checkbox state changes
    checkBox.addEventListener("change", () => {
      // Update task completion status
      task.completed = checkBox.checked;
      save_tasks_locally();
      display_tasks(); // Re-display tasks to reflect changes
    });

    //task text
    const taskSpan = document.createElement("span");
    taskSpan.textContent = `${task.name} - Due: ${task.due} - Category: ${task.category}`;
    if (task.completed) {
      taskSpan.style.textDecoration = "line-through";
    }

    const categorySpan = document.createElement("span");
    categorySpan.textContent = task.category;

    listItem.appendChild(taskSpan);

    // Add checkbox to list item
    //listItem.appendChild(checkBox);

    // Build the inner HTML for task name and due date with strikethrough effect if completed
    /*
    listItem.innerHTML += `
        <span style="${task.completed ? "text-decoration: line-through;" : ""}">
          ${task.name} - Due: ${task.due}
        </span> 
        <button  
          style="background-color: transparent; border: none; cursor: pointer;"
          class="delete_btn" 
          onclick="delete_task(${index});">
          <img src="images/icon_delete.png" alt="delete icon">
        </button>
  `;
  */

    //delete button
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete_btn";
    deleteButton.style.backgroundColor = "transparent";
    deleteButton.style.border = "none";
    deleteButton.style.cursor = "pointer";
    deleteButton.addEventListener("click", () => {
      delete_task(index);
      save_tasks_locally();
    });

    //adding the delete icon
    const deleteIcon = document.createElement("img");
    deleteIcon.src = "images/delete red bin icon.png";
    deleteIcon.alt = "delete icon";
    deleteButton.appendChild(deleteIcon);

    // Append the list item to the tasks list element (UL)
    //tasksListElement.appendChild(listItem);

    //append everything
    listItem.appendChild(checkBox);
    listItem.appendChild(taskSpan);
    listItem.appendChild(deleteButton);
    tasksListElement.appendChild(listItem);

    save_tasks_locally();
  });
}

function save_tasks_locally() {
  localStorage.setItem("tasks", JSON.stringify(taskList));
}

function load_tasks_locally() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks != null) {
    taskList.splice(0, taskList.length, ...JSON.parse(storedTasks)); // Load tasks from local storage
    display_tasks();
  }
}

function delete_task(index) {
  taskList.splice(index, 1); // Remove task from list by index
  save_tasks_locally();
  display_tasks(); // Update displayed tasks
}

document.addEventListener("DOMContentLoaded", load_tasks_locally);

// Add an event listener to the button for adding tasks
document.querySelector(".add_task").addEventListener("click", add_tasks);
