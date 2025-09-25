const category = [
  {
    id: 1,
    name: "Ev İşleri",
  },
  {
    id: 2,
    name: "Şirket İşleri",
  },
  {
    id: 3,
    name: "Bahçe İşleri",
  },
  {},
];
const todos = [
  {
    id: 1,
    category_id: 1,
    name: "Bulaşık",
    isCompleted: false,

    description: "bulaşıkları yıkayıp yerlerine kaldırmalıyım",
    startdate: "01.11.2024",
    deadline: "17.09.2025",
    creationdate: "25.10.2024",
    firstly: "0",
    upcomming: "",
  },
  {
    id: 2,
    category_id: 1,
    name: "Temizlik",
    isCompleted: false,

    description: "Ev süpür paspas at",
    startdate: "01.11.2024",
    deadline: "17.09.2025",
    creationdate: "25.10.2024",
    firstly: "0",
    upcomming: "",
  },
  {
    id: 3,
    category_id: 1,
    name: "Kıyafet",
    isCompleted: false,

    description: "kıyafetleri yıka ve ütüle",
    startdate: "01.11.2024",
    deadline: "17.09.2025",
    creationdate: "25.10.2024",
    firstly: "0",
    upcomming: "",
  },
  {
    id: 4,
    category_id: 2,
    isCompleted: false,

    name: "Projeyi Tamamla",
    description: "projeye fonk ekle",
    startdate: "01.11.2024",
    deadline: "17.09.2025",
    creationdate: "25.10.2024",
    firstly: "0",
    upcomming: "",
  },
  {
    id: 5,
    category_id: 3,
    name: "Çimleri Biç",
    isCompleted: false,
    description: "çimleri biçeceğim",
    startdate: "01.11.2024",
    deadline: "17.09.2025",
    creationdate: "25.10.2024",
    firstly: "0",
    upcomming: "",
  },
];
const selectedCategory = [];
localStorage.getItem("selectedCategory");
localStorage.getItem("todos");
localStorage.getItem("category");
function getFirstİtem() {
  let category = JSON.parse(localStorage.getItem("category")) ?? [];
  const firstİtem = category[0];
  getCategoryTodos(firstİtem.id);
}

function getCategoryTodos(category_id) {
  taskList = JSON.parse(localStorage.getItem("todos")) ?? [];
  let category = JSON.parse(localStorage.getItem("category")) ?? [];
  var table = document.getElementById("table");

  table.innerHTML = `
    <h2>${category.find((e) => e.id == category_id).name}</h2>
    <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Start Date</th>
                    <th>DeadLine</th>
                    <th>Creation Date</th>
                    <th>Firstly</th>
                    <th>Upcoming</th>
                    <th>İşlemler</th>
                  </tr>
                </thead>
                <tr>
        <button id="addTaskPage" onclick="getAddQuickTaskPage(${category_id})"> ➕ Görev Ekle</button>

        </tr>

  `;

  const taskListFiltered = taskList.filter((x) => x.category_id == category_id);

  const selected_category = category.find((e) => e.id == category_id);

  taskListFiltered.forEach(function (valuecategory) {
    table.innerHTML = `
    <h2>${selected_category.name}</h2>
    <select id ="filterSelect" onchange= "filterTodos()">
                    <option value="noCompleted">Tamamlanmamış</option>
                    <option value="completed">Tamamlanmış</option>
                    <option value="a-z">A-Z</option>
                    <option value="z-a">Z-A</option>
                    <option value="near">Tarihe Göre(Yakından - Uzağa)</option>
                    <option value="far">Tarihe Göre(Uzaktan - Yakına)</option>
    </select>
    <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Start Date</th>
                    <th>DeadLine</th>
                    <th>Creation Date</th>
                    <th>Firstly</th>
                    <th>Upcoming</th>
                    <th>İşlemler</th>
                  </tr>
                </thead>
    <tr>
        <button id="addTaskPage" onclick="getAddQuickTaskPage(${category_id})"> ➕ Görev Ekle</button>

        </tr>
    `;
  });
  console.log(taskListFiltered);
  allTask(taskListFiltered);
}

function allTask(taskList) {
  var table = document.getElementById("table");

  taskList?.forEach((value) => {
    table.innerHTML += `
        
    
        <tr id ="${value.id}">
  
  <td data-label= "isCompleted">
  <input type="checkbox" id="isCompleted_${
    value.id
  }" name="isCompleted" onchange ="isCompletedTask(${
      value.id
    }),allCategory()" ${value.isCompleted && "checked"}>
  </td>

  <!-- İsim (yanında düzenleme butonu gizli) -->
  <td data-label= "updateName">
    <div class="parent-element">
      <input
        type="text"
        disabled
        style="border: 0; background: transparent;"
        value="${value.name}"
      />
      <div class="hidden-element">
        <button title="Düzenle">✏️</button>
      </div>
    </div>
  </td>

  <!-- Açıklama (tooltip ile) -->
  <td data-label= "description">
    
      ${value.description}
      
    
  </td>
  <td data-label= "startDate">${value.startdate}</td>

  <!-- Tarihler ve diğer alanlar -->
  <td data-label= "deadline" >${value.deadline}</td>
  <td data-label= "CreatinDate">${value.creationdate}</td>
  <td data-label= "firstly">${value.firstly}</td>
  <td data-label= "upComing">${value.upcomming}</td>

  <!-- Sil Butonu -->
  <td data-label= "delete">
    <button onclick="deleteTask(${value.id})">Sil</button><button
      id="updatePageBtn_${value.id}"
      onclick="getUpdatePage(${value.id})"
    >
      Güncelle
    </button>
  </td>

  <!-- Güncelle Butonu -->
  
</tr>

        `;
  });
}

function allCategory() {
  var categoryTable = document.getElementById("categoryTable");
  categoryTable.innerHTML = ``;

  categoryList = JSON.parse(localStorage.getItem("category")) ?? [];
  var select = document.getElementById("inputTaskCategoryId");
  var categorySelect = document.getElementById("categoryList");
  select.innerHTML = "";
  categorySelect.innerHTML = "";

  categoryList.forEach(function (value) {
    categoryTable.innerHTML += `
    
    <button id = "categoryBtn_${value.id}" value = "${value.id}" class ="categoryBtn" onclick = "getCategoryTodos(${value.id})">
        
      ${value.name}
      
      
      </button><button id = "categoryBtnDelete_${value.id}" value = "${value.id}" class ="categoryBtn" onclick = "deleteCategory(${value.id})">
        
      ❌
      
      
      </button>
      <br>
    `;
    select.innerHTML += `<option value="${value.id}">${value.name}</option>`;
    categorySelect.innerHTML += `<option value="${value.id}">${value.name}</option>`;
  });
}
function isCompletedTask(id) {
  taskList = JSON.parse(localStorage.getItem("todos")) ?? [];
  checkBox = document.getElementById("isCompleted_" + id);
  console.log(checkBox);

  let currentTask = taskList.find((e) => e.id == id);
  let currentTaskIndex = taskList.indexOf(currentTask);
  console.log(currentTask);
  currentTask.isCompleted = checkBox.checked;

  localStorage.setItem("todos", JSON.stringify(taskList));
  console.log(currentTask);
  filterTodos();
}
function filterTodos() {
  const filterType = document.getElementById("filterSelect").value;
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  const table = document.getElementById("table");
  const items = Array.from(table.children);
  const tdWithId = items.filter(
    (item) => item.tagName === "TR" && item.hasAttribute("id")
  );
  console.log(tdWithId);

  const sortedItems = tdWithId.sort((a, b) =>
    a.textContent.localeCompare(b.textContent)
  );

  /* if (filterType === "all") {
    allTask();
  } 
  } else if (filterType === "completed") {
    todos = todos.filter((t) => t.isCompleted);
  } */ if (filterType === "a-z") {
    const sortedItems = [...tdWithId].sort((a, b) =>
      a.textContent.localeCompare(b.textContent)
    );

    sortedItems.forEach((item) => table.appendChild(item));
  } else if (filterType === "z-a") {
    const sortedItems = [...tdWithId].sort((a, b) =>
      b.textContent.localeCompare(a.textContent)
    );

    sortedItems.forEach((item) => table.appendChild(item));
  } else if (filterType === "near") {
    const sortedItems = [...tdWithId].sort(
      (a, b) => new Date(toString(a.deadline)) - new Date(b.deadline)
    );
    sortedItems.forEach((item) => table.appendChild(item));
  } else if (filterType === "far") {
    const sortedItems = [...tdWithId].sort(
      (a, b) => new Date(toString(a.deadline)) - new Date(b.deadline)
    );
    sortedItems.reverse().forEach((item) => table.appendChild(item));
  }
}

function addTask(value) {
  taskList = JSON.parse(localStorage.getItem("todos")) ?? [];
  var id;
  taskList.length != 0 ? taskList.findLast((item) => (id = item.id)) : (id = 0);

  var item = {
    id: id + 1,
    isCompleted: false,
    name: document.getElementById("inputTaskName").value,
    description: document.getElementById("inputTaskDescription").value,
    deadline: document.getElementById("inputTaskDeadLine").value,
    category_id: value,
    startdate: document.getElementById("inputTaskStartDate").value,
    creationdate: new Date().toLocaleDateString("tr-TR"),
    firstly:
      (innerHTML = `<input type="checkbox" id="firstlyCheck" name="firstlyCheck" value="firstly">`),

    upcomming: "",
  };
  taskList.push(item);

  localStorage.setItem("todos", JSON.stringify(taskList));
  console.log(taskList);

  document.getElementById("form").reset();
  getCategoryTodos(item.category_id);
}
function addCategory() {
  categoryList = JSON.parse(localStorage.getItem("category")) ?? [];
  var id;
  categoryList.length != 0
    ? categoryList.findLast((item) => (id = item.id))
    : (id = 0);
  var item = {
    id: id + 1,
    name: document.getElementById("category_name").value,
  };
  categoryList.push(item);
  localStorage.setItem("category", JSON.stringify(categoryList));
  console.log(categoryList);
  allCategory();
  allTask();
  document.getElementById("category").reset();
}
function deleteCategory(valuecategory) {
  categoryList = JSON.parse(localStorage.getItem("category")) ?? [];
  selectedCategoryId = document.getElementById(
    "categoryBtnDelete_" + valuecategory
  ).value;
  categoryList = categoryList.filter(function (valuecategory) {
    return valuecategory.id != selectedCategoryId;
  });
  localStorage.setItem("category", JSON.stringify(categoryList));
  console.log(selectedCategoryId);
  allCategory();
  allTask();
}

function deleteTask(id) {
  taskList = JSON.parse(localStorage.getItem("todos")) ?? [];
  taskCAtegory = taskList.find((x) => x.id == id).category_id;
  console.log(taskCAtegory);

  taskList = taskList.filter(function (value) {
    return value.id != id;
  });
  localStorage.setItem("todos", JSON.stringify(taskList));
  getCategoryTodos(taskCAtegory);
}

function getUpdatePage(id) {
  console.log("çağrıldım");

  var modal = document.getElementById("myModal");
  var btn = document.getElementById("updatePageBtn_" + id);
  console.log(btn);

  var span = document.getElementsByClassName("close")[0];

  modal.style.display = "block";
  modal.innerHTML = `
            <div class="modal-content">
                  
                  <input type="hidden" name="id" id="inputTaskId" />

                  <label for="updateName">Name</label>
                  <input type="text" id="updateName" />
                  <br />
                  <label for="updateDescription">Description</label>
                  <input type="text" id="updateDescription" />
                  <br />
                  <label for="updateDeadLine">DeadLine</label>
                  <input type="text" id="updateDeadLine" />
                  <br />
                  <button type="button" onclick="updateTask(${id})">
                    Update Task
                  </button>
            </div>
            `;

  // When the user clicks on <span> (x), close the modal

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}
function getAddCategoryPage() {
  console.log("çağrıldım");

  var modal = document.getElementById("myModal");
  var btn = document.getElementById("addCategoryPage");
  console.log(btn);

  modal.style.display = "block";
  modal.innerHTML = `
            <div class="modal-content">
                  
                  <div class="card">
                <form class="category" id="category">
                  <h3>Yeni Kategori Ekle</h3>
                  <input type="text" name="category_name" id="category_name" />
                  <button type="button" id="addBtn" onclick="addCategory()">Ekle</button>
                  
                </form>
              </div>
            </div>
            `;

  // When the user clicks on <span> (x), close the modal

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}
function getAddQuickTaskPage(value) {
  console.log("çağrıldım");

  var modal = document.getElementById("myModal");
  var btn = document.getElementById("addTaskPage");
  console.log(btn);

  modal.style.display = "block";
  modal.innerHTML = `
            <div class="modal-content">
                  
                  <div class="card">
        <form id="form">
          <input type="hidden" name="id" id="inputTaskId" />

          <label for="inputTaskName">Name</label>
          <input type="text" id="inputTaskName" placeholder="" />
          <br />
          <label for="inputTaskDescription">Description</label>
          <input type="text" id="inputTaskDescription" />
          <br />
          <label for="inputTaskStartDate">Start Date</label>
          <input type="date" id="inputTaskStartDate" placeholder="" />
          <br />
          <label for="inputTaskDeadLine">DeadLine</label>
          <input type="date" id="inputTaskDeadLine" placeholder="" />
          <br />
          
          
          <button type="button" value="emre" onclick="addTask(${value})">
            Save Task
          </button>
        </form>
      </div>
            </div>
            `;

  // When the user clicks on <span> (x), close the modal

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}
function updateTask(id) {
  var updateName = document.getElementById("updateName");
  var updateDescription = document.getElementById("updateDescription");
  var updateDeadLine = document.getElementById("updateDeadLine");
  taskList = JSON.parse(localStorage.getItem("todos")) ?? [];

  let currentTask = taskList.find((e) => e.id == id);

  currentTask.name = updateName.value;
  currentTask.description = updateDescription.value;
  currentTask.deadline = updateDeadLine.value;

  localStorage.setItem("todos", JSON.stringify(taskList));
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
  getCategoryTodos(currentTask.category_id);
}
