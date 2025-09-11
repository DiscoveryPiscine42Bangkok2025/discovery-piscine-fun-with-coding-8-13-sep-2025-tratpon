$(document).ready(function() {
  const $ft_list = $('#ft_list');

  function saveList() {
    let todos = [];
    $ft_list.find('.todo').each(function() {
      todos.push($(this).text());
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
    const $div = $('<div class="todo"></div>').text(text);
    $ft_list.prepend($div);

    $div.click(function() {
      if (confirm("Do you want to remove this TO DO?")) {
        $(this).remove();
        saveList();
      }
    });

    if (save) saveList();
  }

  $('#newBtn').click(function() {
    const text = prompt("Enter new TO DO:");
    if (text && text.trim() !== "") {
      addTodo(text.trim());
    }
  });

  loadList();
});
