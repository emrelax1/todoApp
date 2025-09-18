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
];
const todos = [
  {
    id: 1,
    category_id: 1,
    name: "Bulaşık",
    description: "bulaşıkları yıkayıp yerlerine kaldırmalıyım",
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
    deadline: "17.09.2025",
    creationdate: "25.10.2024",
    firstly: "0",
    upcomming: "",
  },
];

localStorage.setItem("todos", JSON.stringify(todos));
localStorage.getItem("todos");
localStorage.setItem("category", JSON.stringify(category));
localStorage.getItem("category");

function allTask() {
  var table = document.getElementById("table");
  table.innerHTML = "";
  taskList = JSON.parse(localStorage.getItem("todos")) ?? [];
  taskList.forEach(function (value, i) {
    table.innerHTML += `
        <tr>
        <td>${i + 1}</td>
        
        <td> 
        <div class="parent-element">
                
            <input
            type="text"
            disabled="disable"
            style="border: 0"
            placeholder="${value.name}"
            />
            <div class="hidden-element">
                <button>✏️
                </button>
            </div>
        </div> 
        </td>
        
                <td>
                <div class="tooltip">${value.description}
    <span class="tooltiptext">${value.description}</span>
</div>
    </td>


                <td>${value.deadline}</td>
                <td>${value.creationdate}</td>
                <td>${value.firstly}</td>
                <td>${value.upcomming}</td>
                <td>
                <button onclick = "deleteTask(${value.id})">Sil
                </button>
                </td>
                <td>
                <button id= "${
                  "updatePageBtn_" + value.id
                }" onclick = "getUpdatePage(${value.id})">Güncelle
                </button>
                </td>
                
        </tr>
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
  document.getElementById("category").reset();
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
                  <span class="close">×</span>
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
  span.onclick = function () {
    modal.style.display = "none";
  };
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

  allTask();
}
