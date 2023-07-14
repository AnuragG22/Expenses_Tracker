const balance=document.getElementById('balance');
const money_plus=document.getElementById('money-plus');
const money_minus=document.getElementById('money-minus');
const list=document.getElementById('list');
const form=document.getElementById('form');
const text=document.getElementById('text');
const amount=document.getElementById('amount');

// const dummyTransaction=[
//     {id: 1, text: 'Flower', amount:-20 },
//     {id: 2, text: 'Salary', amount: 300 },
//     {id: 3, text: 'Book', amount: -10 },
//     {id: 4, text: 'Camera', amount: 150 },
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

//let transactions = dummyTransaction;

// Add Transaction
 function addTransaction(e){
    e.preventDefault();
    if(text.value.trim()=== '' || amount.value.trim() === ''){
        alert('Please add a text and amount');

    }
    // bascially we have to built up an object like 'dummyTransaction'
    else{
        const transaction={
            id:generateID(),
            text:text.value,
            amount:+amount.value

        };
      // console.log(transaction);
       transactions.push(transaction);

       addTransactionDOM(transaction);
       updateValues();

       updateLocalStorage();

       text.value='';
       amount.value='';
    }
}
 
 // Generate random ID
 function generateID(){
    return Math.floor(Math.random()*1000000);
 }


// add transaction to DOM list
function addTransactionDOM(transaction){
    // get sign
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    // Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus': 'plus');
    item.innerHTML= `
    ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}
    </span> <button class= "delete-btn" onclick = "removeTracsaction(${transaction.id})">x</button>
    `;
    list.appendChild(item);
} 
// Update the balance , income and expense
function updateValues(){
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc,item) => (acc +=item),0).toFixed(2); // ".tofixed" is for decimal places 
   // console.log(total);
   const income = amounts.filter(item => item > 0).reduce((acc,item) => (acc += item),0).toFixed(2);
   //console.log(income);
   const expense = (amounts.filter(item => item < 0 ).reduce((acc , item) => (acc+= item),0)*-1).toFixed(2);
   console.log(expense);
   balance.innerText=`₹${total}`;
   money_plus.innerText=`₹${income}`;
   money_minus.innerText=`₹${expense}`;


}

// Remove transaction by ID 
function removeTracsaction(id){
    transactions =transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();
    init();
}

// Update local Storage Transactions
function updateLocalStorage(){
    localStorage.setItem('transactions' , JSON.stringify(transactions));
}

// Init app
function init() { 
    list.innerHTML ='';
 
    transactions.forEach(addTransactionDOM);
    updateValues();

}
init();


// Add a new Transacrion part ->

form.addEventListener('submit', addTransaction)
