(function () {
  // Создаем и возвращаем заголовок приложения
  function createAppTitle(title) {
    let appTitle = document.createElement("h2");
    appTitle.innerHTML = title;
    return appTitle;
  }

  // Создаем и возвращаем форму для создания дела
  function createTodoItemForm() {
    let form = document.createElement("form");
    let input = document.createElement("input");
    let buttonWrapper = document.createElement("div");
    let button = document.createElement("button");

    //деактивируем кнопку поумолчанию
    button.disabled = true;

    form.classList.add("input-group", "mb-3");
    input.classList.add("form-control");
    input.placeholder = "Введите название нового дела";
    buttonWrapper.classList.add("input-group-append");
    button.classList.add("btn", "btn-primary");
    button.textContent = "Добавить дело";

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    // функция активации кнопки при тексте в input
    input.addEventListener("input", function () {
      if (input.value.length > 0) {
        button.disabled = false;
      } else if (input.value.length === 0) {
        button.disabled = true;
      }
    });

    return {
      form,
      input,
      button,
    };
  }

  // Создаем и возвращаем список элементов
  function createTodoList() {
    let list = document.createElement("ul");
    list.classList.add("list-group");
    return list;
  }

  function createTodoItem(name, completed = false) {
    let item = document.createElement("li");

    let buttonGroup = document.createElement("div");
    let doneButton = document.createElement("button");
    let deleteButton = document.createElement("button");

    item.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );

    if (completed) {
        item.classList.add('green-active'); 
    }

    item.textContent = name;

    buttonGroup.classList.add("btn-group", "btn-group-sm");
    doneButton.classList.add("btn", "btn-succes", "green-active");
    doneButton.textContent = "Готово";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.textContent = "Удалить";

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return {
      item,
      doneButton,
      deleteButton,
    };
  }

  function createTodoApp(container, title, defaultTasks = []) {
    // let container = document.getElementById('todo-app'); // получаем сначала контейнер  // Тут не получаем ничего так как это функция, тогда мы брали чтобы определенную вывести на экран, а тут уже любую которую захотим мы

    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    const todoList = createTodoList(); //далее вызываем все эти функции

    defaultTasks.forEach(function (task) {
      const todoItem = createTodoItem(task.name, task.done);
      todoList.appendChild(todoItem.item);
      // добовляем обработчики на кнопку
      todoItem.doneButton.addEventListener("click", function () {
        //todoItem.doneButton - при таком значении (value в функции createTodoItem doneButton будет меняться таким образом ('click'), тоесть становиться зеленым если нажать на 'Готово'
        todoItem.item.classList.toggle("green-active");
      });
      todoItem.deleteButton.addEventListener("click", function () {
        if (confirm("Вы уверены")) {
          //Метод confirm() объекта window применяется для вывода модального диалогового окна с сообщением и кнопками «Ок» и «Отмена».
          todoItem.item.remove();
        }
      });
    });

    // let todoItems = [createTodoItem('Сходить за хлебом'), createTodoItem('Купить молоко')];

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    // todoList.append(todoItems[0].item);      //нужно item писать обязательно, если внутри него все остальные классы или все остальные ветки ДОМа
    // todoList.append(todoItems[1].item);      // а далее их результат размещаем внутри контейнера

    // браузер создает событие submit на форме по нажатию на Enter или на кнопку создания дела
    todoItemForm.form.addEventListener("submit", function (e) {
      // эта строчка необходима, чтобы предотвратить стандартные действия браузера
      // в данном случае мы не хотим, чтобы страница перезагружалась при отправке формы
      e.preventDefault();

      // игнорируем создание элемента, если  пользователь ничего не ввел в поле
      if (!todoItemForm.input.value) {
        return;
      }
      // создаем и добовляем в список новое дело с названием из поля для ввода
      // todoList.append(createTodoItem(todoItemForm.input.value).item);     // todoItemForm.input.value - это 'name', это как среагирует поле input при нажатии на кнопку button : грубо говоря, будет использоваться и открывать то что будет в поле input, тоесть в createTodoItem(name) будет использоваться то что в value от функции todoItemForm; В данном случае, когда name = value ,будет открываться это все

      //делаем так,чтобы при нажатии на готово загорался зеленый а при нажатии на удалить красный
      let todoItem = createTodoItem(todoItemForm.input.value);

      // добовляем обработчики на кнопку
      todoItem.doneButton.addEventListener("click", function () {
        //todoItem.doneButton - при таком значении (value в функции createTodoItem doneButton будет меняться таким образом ('click'), тоесть становиться зеленым если нажать на 'Готово'
        todoItem.item.classList.toggle("green-active");
      });
      todoItem.deleteButton.addEventListener("click", function () {
        if (confirm("Вы уверены")) {
          //Метод confirm() объекта window применяется для вывода модального диалогового окна с сообщением и кнопками «Ок» и «Отмена».
          todoItem.item.remove();
        }
      });

      //создаем и добовляем в список новое дело с названием из поля ввода
      todoList.append(todoItem.item);

      // обнуляем значение в поле, чтобы не пришлось стирать его вручную
      todoItemForm.input.value = "";

      todoItemForm.button.disabled = true;
    });
  }

  // document.addEventListener('DOMContentLoaded', function() { //чтобы загрузить весь окнтент на страницу мы создаем домконтентлоадед
  //     createTodoApp(document.getElementById('my-todos'), 'Мои дела');
  //     createTodoApp(document.getElementById('mom-todos'), 'Мамины дела');
  //     createTodoApp(document.getElementById('dad-todos'), 'Папины дела');
  // });  //Убрали




//   function getStoreageData (storageKey) {
//       let data = localStorage.getItem(storageKey);
//       return data || [];
//   };




  window.createTodoApp = createTodoApp; // добавим(зарегестрируем) фукнцию createTodoApp в глобальном объекте window, чтобы получить доступ к этоц функции из других скриптов  (Засарять нельзя, но а что делать, ничего уже не поделаешь)
})();
