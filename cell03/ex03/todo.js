const ft_list = document.getElementById("ft_list");
const newBtn = document.getElementById("newBtn");

function saveList() {
  let todos = [];
  document.querySelectorAll('#ft_list .todo').forEach(todo => {
    todos.push(todo.textContent);
  });
  document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos)) + "; path=/";
}

function loadList() {
  const cookies = document.cookie.split(";").map(c => c.trim());
  let todosCookie = cookies.find(c => c.startsWith("todos="));
  if (todosCookie) {
    let todos = JSON.parse(decodeURIComponent(todosCookie.split("=")[1]));
    todos.forEach(text => addTodo(text, false));
  }
}

function addTodo(text, save=true) {
  const div = document.createElement("div");
  div.className = "todo";
  div.textContent = text;

  if (ft_list.firstChild) {
    ft_list.insertBefore(div, ft_list.firstChild);
  } else {
    ft_list.appendChild(div);
  }

  div.addEventListener("click", () => {
    if (confirm("Do you want to remove this TO DO?")) {
      div.remove();
      saveList();
    }
  });

  if(save) saveList();
}

newBtn.addEventListener("click", () => {
  const text = prompt("Enter new TO DO:");
  if (text && text.trim() !== "") {
    addTodo(text.trim());
  }
});


loadList();
