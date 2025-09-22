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
    description: "çimleri biçeceğim",
    startdate: "01.11.2024",
    deadline: "17.09.2025",
    creationdate: "25.10.2024",
    firstly: "0",
    upcomming: "",
  },
];

localStorage.getItem("todos");
localStorage.getItem("category");

function getCategoryTodos(category_id) {
  taskList = JSON.parse(localStorage.getItem("todos")) ?? [];
  var table = document.getElementById("table");
  table.innerHTML = ``;
  const taskListFiltered = taskList.filter((x) => x.category_id == category_id);

  const selected_category = category.find((e) => e.id == category_id);
  taskListFiltered.forEach(function (valuecategory) {
    table.innerHTML = `
    <h2>${category_id.name}</h2>
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

    `;
  });

  allTask(taskListFiltered);
}

function allTask(taskList) {
  var table = document.getElementById("table");

  var select = document.getElementById("inputTaskCategoryId");
  var categorySelect = document.getElementById("categoryList");

  select.innerHTML = "";

  /*   select.innerHTML += `<option value="${valuecategory.id}">${valuecategory.name}</option>`;
  categorySelect.innerHTML += `<option value="${valuecategory.id}">${valuecategory.name}</option>`;
 */
  taskList.forEach((value) => {
    table.innerHTML += `
        
    
        <tr>
  

  <!-- İsim (yanında düzenleme butonu gizli) -->
  <td>
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
  <td>
    <div class="tooltip">
      ${value.description}
      <span class="tooltiptext">${value.description}</span>
    </div>
  </td>
  <td>${value.startdate}</td>

  <!-- Tarihler ve diğer alanlar -->
  <td>${value.deadline}</td>
  <td>${value.creationdate}</td>
  <td>${value.firstly}</td>
  <td>${value.upcomming}</td>

  <!-- Sil Butonu -->
  <td>
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
  categoryTable.innerHTML = "";
  categoryList = JSON.parse(localStorage.getItem("category")) ?? [];
  categoryList.forEach(function (value) {
    categoryTable.innerHTML += `
    
    <button id = "categoryBtn_${value.id}" value = "${value.id}" class ="categoryBtn" onclick = "getCategoryTodos(${value.id})">
        
      ${value.name}
      
      
      </button>
      <br>
    `;
  });
}

function addTask() {
  taskList = JSON.parse(localStorage.getItem("todos")) ?? [];
  var id;
  taskList.length != 0 ? taskList.findLast((item) => (id = item.id)) : (id = 0);

  var item = {
    id: id + 1,
    name: document.getElementById("inputTaskName").value,
    description: document.getElementById("inputTaskDescription").value,
    deadline: document.getElementById("inputTaskDeadLine").value,
    category_id: document.getElementById("inputTaskCategoryId").value,
    startdate: document.getElementById("inputTaskStartDate").value,
    creationdate: new Date().toLocaleDateString("tr-TR"),
    firstly:
      (innerHTML = `<input type="checkbox" id="firstlyCheck" name="firstlyCheck" value="firstly">`),

    upcomming: "",
  };
  taskList.push(item);

  localStorage.setItem("todos", JSON.stringify(taskList));
  console.log(taskList);
  allTask();
  document.getElementById("form").reset();
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
}
function deleteCategory(valuecategory) {
  categoryList = JSON.parse(localStorage.getItem("category")) ?? [];
  selectedCategoryId = document.getElementById("categoryList").value;
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
  taskList = taskList.filter(function (value) {
    return value.id != id;
  });
  localStorage.setItem("todos", JSON.stringify(taskList));
  allTask();
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
  allTask();
}
