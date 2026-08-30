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
  const dateInputElement = document.querySelector(".due_date");
  const dueDate = dateInputElement.value;

  const taskInputElement = document.querySelector(".add_tasks_field");
  const taskName = taskInputElement.value.trim();

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

    save_tasks_locally();

    // Clear the input fields for new entries
    taskInputElement.value = "";
    dateInputElement.value = "";

    // Update the displayed list
    display_tasks("all");
  } else {
    alert("Please fill in all required fields!");
  }
}

/*
The display_tasks() function:
--> creates list items for each task in the taskList and 
--> appends the items to the <ul>
*/
function display_tasks(filter = "all") {
  const tasksListElement = document.getElementById("tasks_list");

  // Clear existing elements listed on the page
  tasksListElement.innerHTML = "";

  //decide which tasks to show based on filter
  let filteredTasks = taskList;

  filteredTasks = taskList.filter((task) => !task.completed);
  let pendingCount = filteredTasks.length;
  document.getElementById("pending_count").textContent = pendingCount;
  filteredTasks = taskList.filter((task) => task.completed);
  let completedCount = filteredTasks.length;
  document.getElementById("completed_count").textContent = completedCount;
  let allCount = taskList.length;
  document.getElementById("all_count").textContent = allCount;

  //loop through filtered tasks and build list items
  filteredTasks.forEach((task, index) => {
    const listItem = document.createElement("li"); //create <li>

    //checkbox: marks task as completed/pending
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = task.completed; // Reflect current status
    checkBox.addEventListener("change", () => {
      task.completed = checkBox.checked; // Update status
      save_tasks_locally(); // Save change
      display_tasks(filter); // Re-render with current filter
    });
    // Task text: shows name, due date, category
    const taskSpan = document.createElement("span");
    taskSpan.textContent = `${task.name} - Due: ${task.due} - Category: ${task.category}`;
    if (task.completed) {
      // Strike-through if completed
      taskSpan.style.textDecoration = "line-through";
    }

    //delete button
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete_btn";
    deleteButton.style.backgroundColor = "transparent";
    deleteButton.style.border = "none";
    deleteButton.style.cursor = "pointer";
    deleteButton.addEventListener("click", () => {
      delete_task(index); //remove task from list
      save_tasks_locally(); //save updated list
      display_tasks(filter); //refresh display
    });

    //adding the delete icon inside the button
    const deleteIcon = document.createElement("img");
    deleteIcon.src = "images/delete red bin icon.png";
    deleteIcon.alt = "delete icon";
    deleteButton.appendChild(deleteIcon);

    //append everything into <li>
    listItem.appendChild(checkBox);
    listItem.appendChild(taskSpan);
    listItem.appendChild(deleteButton);

    //append <li> into the UL
    tasksListElement.appendChild(listItem);
  });
}

// -------------------------------
// Function: save_tasks_locally()
// -------------------------------

// -------------------------------
// Function: load_tasks_locally()
// -------------------------------
// Purpose: Load tasks from localStorage into taskList when page loads.
function load_tasks_locally() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    // Replace current taskList with stored tasks
    taskList.splice(0, taskList.length, ...JSON.parse(storedTasks));
    display_tasks("all"); // Show all tasks initially
  }
}

function delete_task(index) {
  taskList.splice(index, 1); // Remove task from list by index
  save_tasks_locally(); //save updated list
  display_tasks("all"); // Update displayed tasks
}

// -------------------------------
// Event Listeners
// -------------------------------

// Load tasks when DOM is ready
document.addEventListener("DOMContentLoaded", load_tasks_locally);

// Add an event listener to the "+" button for adding tasks
document.querySelector(".add_task").addEventListener("click", add_tasks);

// Filter buttons in Progress Summary
document.getElementById("box_4").addEventListener("click", () => {
  display_tasks("pending"); // Show only pending tasks
});
document.getElementById("box_5").addEventListener("click", () => {
  display_tasks("completed"); // Show only completed tasks
});
document.getElementById("box_6").addEventListener("click", () => {
  display_tasks("all"); // Show all tasks
});

function dark_theme() {
  const switchTheme = document.getElementById("switch");

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    switchTheme.checked = true;
  }

  switchTheme.addEventListener("change", () => {
    if (switchTheme.checked) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  });
}

document.addEventListener("DOMContentLoaded", dark_theme);
