document.addEventListener("DOMContentLoaded",()=>{

  const expenseForm = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmount = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmountDisplay = document.getElementById("total-amount");
  const clearAll = document.getElementById("clear-all");

   let expenses =JSON.parse(localStorage.getItem("expense")) || [];

   renderExpense();

   expenseForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    let name = expenseNameInput.value.trim();
    let amount = parseFloat(expenseAmount.value);
    if(name != " " && !isNaN(amount) && amount>0){
      let newExpense ={
      id: Date.now(),
      name,
      amount
    }; 
    expenses.push(newExpense);
    saveToLocal();
    renderExpense();
    expenseNameInput.value = "";
    expenseAmount.value = "";
    }
   })

   function saveToLocal(){
    localStorage.setItem("expense", JSON.stringify(expenses));
   };

   function renderExpense(){
    expenseList.innerHTML=" ";
    expenses.forEach(i => {
      let item = document.createElement("li");
      item.innerHTML = `
      <span>${i.name} - ${i.amount}</span>
      <button data-id=${i.id}>Delete</button>`
      expenseList.appendChild(item);
    });
    calculateTotal();
   }

  function calculateTotal(){
    let total = 0;
    if(expenses.length>0){
       expenses.forEach(element =>{
      total += element.amount;
      total.toFixed(2);
    })
    totalAmountDisplay.innerHTML=`${total}`;
    }else{
      totalAmountDisplay.innerHTML=`0.00`;
    }
  }

  expenseList.addEventListener("click",(e)=>{
    if(e.target.tagName == "BUTTON"){
      let expenseId = e.target.getAttribute("data-id");
      console.log(expenseId);
      expenses = expenses.filter((expense)=> expense.id != expenseId);
      console.log(expenses);
      
      saveToLocal();
      renderExpense();
    }
  })
   clearAll.addEventListener("click",()=>{
    localStorage.clear();
    expenseList.innerHTML = "";
    expenses.length = 0;
    console.log(expenses);
   totalAmountDisplay.innerHTML=`0.00`;
   })
   
  }); 