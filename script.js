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

  // Check if both fields have values
  if (taskName && dueDate) {
    // Add the new task to the list
    taskList.push({
      name: taskName,
      due: dueDate,
      completed: false, // Track checkbox state
    });

    // Clear the input fields for new entries
    taskInputElement.value = "";
    dateInputElement.value = "";

    // Update the displayed list
    display_tasks();
  } else {
    alert("Please fill in both fields!");
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
      display_tasks(); // Re-display tasks to reflect changes
    });

    //task text
    const taskSpan = document.createElement("span");
    taskSpan.textContent = `${task.name} - Due: ${task.due}`;
    if (task.completed) {
      taskSpan.style.textDecoration = "line-through";
    }

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
    });

    //adding the delete icon
    const delteIcon = document.createElement("img");
    delteIcon.src = "images/icon_delete.png";
    delteIcon.alt = "delete icon";
    deleteButton.appendChild(delteIcon);

    // Append the list item to the tasks list element (UL)
    //tasksListElement.appendChild(listItem);

    //append everything
    listItem.appendChild(checkBox);
    listItem.appendChild(taskSpan);
    listItem.appendChild(deleteButton);
    tasksListElement.appendChild(listItem);
  });
}

function delete_task(index) {
  taskList.splice(index, 1); // Remove task from list by index
  display_tasks(); // Update displayed tasks
}

// Add an event listener to the button for adding tasks
document.querySelector(".add_task").addEventListener("click", add_tasks);
