// Declare my columns which will be empty arrays
// that will take a task object

var toDoList = [
  {
    title: 'demo01',
    desc: 'desc01',
    assignee: 'me',
    id: 0,
    type: 'todo'
  }
];
var uniqueIdCounter = 0;
var inProgressList = [
  {
    title: 'demo02',
    desc: 'desc02',
    assignee: 'me2',
    id: 1,
    type: 'inprogress'
  }
];
var completedList = [
  {
    title: 'demo03',
    desc: 'desc03',
    assignee: 'me3',
    id: 2,
    type: 'completed'
  }
];
var acceptedList = [
  {
    title: 'demo04',
    desc: 'desc04',
    assignee: 'me4',
    id: 3,
    type: 'accepted'
  }
];
var archiveList = [
  {
    title: 'demo05',
    desc: 'desc05',
    assignee: 'me5',
    id: 4,
    type: 'archive'
  }
];

var toDoColumn = document.getElementById('todo');
var inProgressColumn = document.getElementById('inprogress');
var completedColumn = document.getElementById('completed');
var acceptedColumn = document.getElementById('accepted');
var archiveColumn = document.getElementById('archive');
var formContainer = document.getElementById('formcontainer');

//gets called every time the columns are redrawn
function renderColumns(){
  toDoColumn.innerHTML = '<h3>To do</h3>';
  inProgressColumn.innerHTML = '<h3>In progress</h3>';
  acceptedColumn.innerHTML = '<h3>Accepted</h3>'
  completedColumn.innerHTML = '<h3>Completed</h3>';
  archiveColumn.innerHTML = '<h3>Archive</h3>';
  
  for(var i = 0; i < toDoList.length; i++){ 
    var newToDoCard = createCardElement(
      toDoList[i].title, 
      toDoList[i].desc, 
      toDoList[i].assignee, 
      toDoList[i].id, 
      toDoList[i].type
    );
    toDoColumn.appendChild(newToDoCard);
  }
  for(var i = 0; i < inProgressList.length; i++){ 
    var newProgressCard = createCardElement(
      inProgressList[i].title, 
      inProgressList[i].desc, 
      inProgressList[i].assignee, 
      inProgressList[i].id, 
      inProgressList[i].type
    );
    inProgressColumn.appendChild(newProgressCard);
  }
  for(var i = 0; i < completedList.length; i++){ 
    var newCompletedCard = createCardElement(
      completedList[i].title, 
      completedList[i].desc, 
      completedList[i].assignee, 
      completedList[i].id, 
      completedList[i].type
    );
    completedColumn.appendChild(newCompletedCard);
  }
  for(var i = 0; i < acceptedList.length; i++){ 
    var newAcceptedCard = createCardElement(
      acceptedList[i].title, 
      acceptedList[i].desc, 
      acceptedList[i].assignee, 
      acceptedList[i].id, 
      acceptedList[i].type
    );
    acceptedColumn.appendChild(newAcceptedCard);
  }
  for(var i = 0; i < archiveList.length; i++){ 
    var newArchiveCard = createCardElement(
      archiveList[i].title, 
      archiveList[i].desc, 
      archiveList[i].assignee, 
      archiveList[i].id, 
      archiveList[i].type
    );
    archiveColumn.appendChild(newArchiveCard);
  }
}

renderColumns();

function createCardElement(title, desc, assignee, id, type){
  var card = document.createElement('div');
  card.className = 'card';

  var cardTitle = document.createElement('p');
  cardTitle.innerHTML = title;

  var cardDesc = document.createElement('p');
  cardDesc.innerHTML = desc;

  var cardAssignee = document.createElement('p');
  cardAssignee.innerHTML = assignee;
  
  var cardId = document.createElement('p');
  cardId.innerHTML = id;
  
  card.id = id;
  
  var deleteTaskForm = document.createElement('form');
  deleteTaskForm.onsubmit = deleteCard;
  
  var deleteTaskIdInput = document.createElement('input');
  deleteTaskIdInput.value = id;
  deleteTaskIdInput.name = 'id';
  deleteTaskIdInput.type = 'hidden';

  var deleteTaskTypeInput = document.createElement('input');
  deleteTaskTypeInput.value = type;
  deleteTaskTypeInput.name = 'type';
  deleteTaskTypeInput.type = 'hidden';

  var deleteTaskButton = document.createElement('button');
  deleteTaskButton.innerHTML = 'x';
  deleteTaskButton.type = 'submit';
  deleteTaskButton.className = 'deleteTaskButton';

  deleteTaskForm.appendChild(deleteTaskIdInput);
  deleteTaskForm.appendChild(deleteTaskTypeInput);
  deleteTaskForm.appendChild(deleteTaskButton);
  
  var moveTaskForm = document.createElement('form');
  moveTaskForm.onsubmit = moveCard;
  
  var moveTaskIdInput = document.createElement('input');
  moveTaskIdInput.value = id;
  moveTaskIdInput.name = 'id';
  moveTaskIdInput.type = 'hidden';
  
  var moveTaskTypeInput = document.createElement('input');
  moveTaskTypeInput.value = type;
  moveTaskTypeInput.name = 'type';
  moveTaskTypeInput.type = 'hidden';
  
  var moveTaskButton = document.createElement('button');
  moveTaskButton.type = 'submit';
  moveTaskButton.style.display = 'inline-block';
  moveTaskButton.innerHTML = '→';
  moveTaskButton.className = 'moveTaskButton';
  
  moveTaskForm.appendChild(moveTaskIdInput);
  moveTaskForm.appendChild(moveTaskTypeInput);
  moveTaskForm.appendChild(moveTaskButton);

  card.appendChild(cardTitle);
  card.appendChild(cardDesc);
  card.appendChild(cardAssignee);
  card.appendChild(cardId);
  card.appendChild(deleteTaskForm);
  if(type != 'archive'){
    card.appendChild(moveTaskForm);
  }
  return card;
}

function moveCard(event){
  event.preventDefault();
  console.log(event.target.id.value);
  console.log(event.target.type.value);
  
  var type = event.target.type.value;
  var id = event.target.id.value;
  var taskToMove = 0;
  switch(type){
    case 'todo':
      taskToMove = toDoList.find(function(task){
        return task.id == id;
      });
      deleteCard(event);
      taskToMove.type = 'inprogress';
      inProgressList.push(taskToMove);
      break;
    case 'inprogress':
      taskToMove = inProgressList.find(function(task){
        return task.id == id;
      });
      deleteCard(event);
      taskToMove.type = 'completed';
      completedList.push(taskToMove);
      break;
    case 'completed':
      taskToMove = completedList.find(function(task){
        return task.id == id;
      });
      deleteCard(event);
      taskToMove.type ='accepted';
      acceptedList.push(taskToMove);
      break;
    case 'accepted':
      taskToMove = acceptedList.find(function(task){
        return task.id == id;
      });
      deleteCard(event);
      taskToMove.type = 'archive';
      archiveList.push(taskToMove);
      break;
    case 'archive':
      return false;
      break;
    default:
      break;
  }
  renderColumns();

}

// create a form function to handle when new
// task is submitted
function handleSubmit(event) {
  event.preventDefault();
  var newTaskObject = {
    title: event.target.title.value,
    desc: event.target.desc.value,
    assignee: event.target.assignee.value,
    id: 'task'+ uniqueIdCounter,
    type: 'todo'
  };
  uniqueIdCounter++;
  uniqueIdCounter = uniqueIdCounter + 1;
  toDoList.push(newTaskObject);
  renderColumns();
}

function deleteCard(event){
  event.preventDefault();
  console.log('deleted this card');
  console.log(event.target.id.value);
  console.log(event.target.type.value);
  type = event.target.type.value;
  switch(type){
    case 'todo':
      toDoList = toDoList.filter(function(task){
        return task.id != event.target.id.value;
      });
      break;
    case 'inprogress':
      inProgressList = inProgressList.filter(function(task){
        return task.id != event.target.id.value;
      });
      break;
    case 'completed':
      completedList = completedList.filter(function(task){
        return task.id != event.target.id.value;
      });
      break;
    case 'accepted':
      acceptedList = acceptedList.filter(function(task){
        return task.id != event.target.id.value;
      });
      break;
    case 'archive':
      archiveList = archiveList.filter(function(task){
        return task.id != event.target.id.value;
      });
      break;
    default:
      break;
  }

  renderColumns();


}

var newTaskForm = document.createElement('form');
newTaskForm.onsubmit = handleSubmit;

var titleInput = document.createElement('input');
titleInput.placeholder = 'title';
titleInput.name = 'title';
titleInput.required = true;

var descInput = document.createElement('input');
descInput.placeholder = 'description';
descInput.name = 'desc';
descInput.required = true;

var assigneeInput = document.createElement('input');
assigneeInput.placeholder = 'assignee';
assigneeInput.name = 'assignee';
assigneeInput.required = true;

var submitButton = document.createElement('button');
submitButton.innerHTML = 'Add task';
submitButton.type = 'submit';
submitButton.className = 'addTaskButton';

newTaskForm.appendChild(titleInput);
newTaskForm.appendChild(descInput);
newTaskForm.appendChild(assigneeInput);
newTaskForm.appendChild(submitButton);
formContainer.appendChild(newTaskForm);
