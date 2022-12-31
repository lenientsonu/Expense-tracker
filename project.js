

document.addEventListener('DOMContentLoaded', (e) => {
    Object.keys(localStorage).forEach((key)=>{
        stringifiedExpenseDetail = localStorage.getItem(key);
        expenseDetail = JSON.parse(stringifiedExpenseDetail);
        printHistory(expenseDetail);
        // console.log(stringifiedExpenseDetail);
        //  console.log(expenseDetail);
        //  console.log(stringifiedExpenseDetail);
        // console.log('loaded');
    });
});

function onbuttonclick(e){

    //preventing the default behaviour of form submit
    e.preventDefault();
    //getting all the values of form on submit
    const amount = document.getElementById('amount').value;
    const desc = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    //console.log(amount,desc,category);

    //creating a object of expense details
    let expenseDetails = {
        'amount' : amount,
        'desc' : desc,
        'category' : category
    };
    console.log(expenseDetails);
    //storing the object in local storage
    let expenseDetails_serealized = JSON.stringify(expenseDetails);
    localStorage.setItem(expenseDetails.amount,expenseDetails_serealized);
    //printing the expense details in the form of expense history list (ul)
    printHistory(expenseDetails);
    
}

function printHistory(obj){
    //getting expense history list and creating a new list item child in it
    const ul = document.getElementById('expense-list');
    const li = document.createElement('li');
    //modifying newly created list item
    li.appendChild(document.createTextNode(`${obj.amount} - ${obj.category} - ${obj.desc}`));
    li.id = obj.amount;
    li.className = 'list-group-item';
    //creating edit and delete button and adding them to list item
    const delBtn = document.createElement('button');
    delBtn.className = 'btn btn-danger btn-sm float-right delete';
    delBtn.appendChild(document.createTextNode('Delete'));
    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-info btn-sm float-right edit';
    editBtn.appendChild(document.createTextNode('Edit'));
    li.appendChild(delBtn);
    li.appendChild(editBtn);
    
    //when edit button is clicked
    editBtn.addEventListener('click', (e)=>{
        document.getElementById('amount').value = obj.amount;
        document.getElementById('description').value = obj.desc;
        document.getElementById('category').value = obj.category;
        li.remove();
    });
    //when delete button is clicked
    delBtn.addEventListener('click', (e)=>{
        localStorage.removeItem(obj.amount);
        li.remove();
    });
    ul.appendChild(li);
}