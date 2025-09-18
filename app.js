const category= [
    {
        id : 1,
        name:"Ev İşleri"
    },
    {
        id : 2,
        name:"Şirket İşleri"
    },
    {
        id : 3,
        name:"Bahçe İşleri"
    }
]
const todos = [
    {
        id:1,
        cetagory_id: 1,
        name:"Bulaşık",
        description:"bulaşıkları yıkayıp yerlerine kaldırmalıyım",
        deadline:"17.09.2025",
        creationdate:"25.10.2024",
        firstly:"0",
        upcomming:"",
    },
    {
        id:2,
        cetagory_id: 1,
        name:"Temizlik",
        description:"Ev süpür paspas at",
        deadline:"17.09.2025",
        creationdate:"25.10.2024",
        firstly:"0",
        upcomming:"",
    },
    {
        id:3,
        cetagory_id: 1,
        name:"Kıyafet",
        description:"kıyafetleri yıka ve ütüle",
        deadline:"17.09.2025",
        creationdate:"25.10.2024",
        firstly:"0",
        upcomming:"",
    },
    
]

localStorage.setItem("todos",JSON.stringify(todos))
localStorage.getItem("todos")

function allTask(){var table = document.getElementById('table')
    table.innerHTML = ""
    taskList = JSON.parse(localStorage.getItem("todos")) ?? []
    taskList.forEach(function(value,i){
        
        table.innerHTML += `
        <tr>
        <td>${i+1}</td>
                <td>${value.name}</td>
                <td>${value.description}</td>
                <td>${value.deadline}</td>
                <td>${value.creationdate}</td>
                <td>${value.firstly}</td>
                <td>${value.upcomming}</td>
                <td>
                <button onclick = "deleteTask(${value.id})">Sil
                </button>
                </td>
                <td>
                <button id= "updatePageBtn" onclick = "getUpdatePage()">Güncelle
                </button>
                </td>
                
        </tr>
        `
    })
}
function addTask(){
    taskList = JSON.parse(localStorage.getItem("todos")) ?? []
    var id 
    taskList.length != 0 ? taskList.findLast((item)=>id = item.id):id =0 
    
        var item = {
                id: id+1,
                name : document.getElementById("inputTaskName").value,
                description : document.getElementById("inputTaskDescription").value,
                deadline : document.getElementById("inputTaskDeadLine").value

        }
        taskList.push(item)
    
    localStorage.setItem('todos',JSON.stringify(taskList))
        console.log(taskList)
    allTask()
    document.getElementById('form').reset()

}

function deleteTask(id){
    taskList = JSON.parse(localStorage.getItem("todos")) ?? []
    taskList = taskList.filter(function(value){
        return value.id != id;
    })
    localStorage.setItem('todos',JSON.stringify(taskList))
    allTask()
}


function getUpdatePage(){

    var modal = document.getElementById("myModal");
    var btn = document.getElementById("updatePageBtn");
    var span = document.getElementsByClassName("close")[0];
    btn.onclick = function() {
            modal.style.display = "block";
        }
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    
}
function updateTask(){
    
    /* taskList = JSON.parse(localStorage.getItem("todos")) ?? []
    taskList[id].name = document.getElementById("updateName").value
    localStorage.setItem("todos",JSON.stringify(taskList)) */
}