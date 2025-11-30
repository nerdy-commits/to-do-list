document.addEventListener('DOMContentLoaded',() =>{
 const taskinput =document.getElementById('task-input');
 const taskbutton =document.getElementById('add-task');
 const tasklist = document.getElementById('task-list');
 const emptyimage=document.querySelector('.empty-image');
 const todocontainer=document.querySelector('.to-do-container');
 const progressbar =document.getElementById('progress');
 const progressnumbers=document.getElementById('number');
 const toggleEmptyState=()=>{
    emptyimage.style.display=tasklist.children.length===0 ?'block':'none';
    todocontainer.style.width=tasklist.children.length >0 ?'100%':'50%';
 };
const updateprogress = (checkcompletion = true) => {
   const totaltask = tasklist.children.length;
   const completedtask = tasklist.querySelectorAll('.checkbox:checked').length;

   progressbar.style.width = totaltask
      ? `${(completedtask / totaltask) * 100}%`
      : `0%`;

   progressnumbers.textContent = `${completedtask} / ${totaltask}`;

   // run confetti when all tasks are completed
   if (checkcompletion && totaltask > 0 && completedtask === totaltask) {
      confetti();
   }
};
const savetasklocalstorage=()=>{
   const tasks=Array.from(tasklist.querySelectorAll('li')).map(li=>({
      text: li.querySelector('span').textContent,
      completed: li.querySelector('.checkbox').checked
   }));
localStorage.setItem('tasks',JSON.stringify(tasks));
};
const loadtaskfromlocalstorage=()=>{
   const savedtasks=JSON.parse(localStorage.getItem('tasks'))||[];
   savedtasks.forEach(({text,completed})=>addtask(text,completed,false))
      toggleEmptyState();
      updateprogress();
   };


 
 const addtask = (text,completed = false,checkcompletion = true) => {
    const tasktext = text || taskinput.value.trim();
    if (!tasktext) {
        return;
    }
    const li = document.createElement('li');
    li.innerHTML = `
 <input type="checkbox" class="checkbox" ${completed ?'checked':''}/> 
 <span>${tasktext}</span>
 <div class="task-button">
 <button class="edit-button"><i
 class="fa-solid fa-pen"></i></button>
 <button class="delete-button"><i
 class="fa-solid fa-trash"></i></button>
 </div>
 `;
 const checkbox=li.querySelector('.checkbox');
 const editbin =li.querySelector('.edit-button');
 if(completed){
    li.classList.add('completed');
    editbin.disabled =true;
    editbin.style.opacity='0.5';
    editbin.style.pointerEvents ='none'
 }
 checkbox.addEventListener('change',()=>{
    const ischecked=checkbox.checked;
    li.classList.toggle('completed',ischecked);
    editbin.disabled=ischecked ;
    editbin.style.opacity =ischecked ? '0.5':'1';
    editbin.style.pointerEvents=ischecked ?'none':'auto';
    updateprogress();
    savetasklocalstorage();
 }
 );
const confetti=()=>{
   const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}

 editbin.addEventListener('click',()=>{
if(!checkbox.checked){
   taskinput.value=li.querySelector
   ('span').textContent;
   li.remove();
   toggleEmptyState();
   updateprogress();
   savetasklocalstorage();
}
 });
 
 li.querySelector('.delete-button').addEventListener('click',()=>
 {
    li.remove();
 toggleEmptyState();
 updateprogress();
 savetasklocalstorage();
 });
    tasklist.appendChild(li);
    taskinput.value = '';
    toggleEmptyState();
    updateprogress(checkcompletion);
    savetasklocalstorage();
 };
 loadtaskfromlocalstorage();
 taskbutton.addEventListener('click',()=>addtask());
 taskinput.addEventListener('keypress',(e)=>{
    if(e.key=='Enter')
        { e.preventDefault();
        addtask();
       }
   });
});
