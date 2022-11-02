var textTransaction = document.querySelector('#text')
var amountTransaction = document.querySelector('#amount')
var buttonAddTransaction = document.querySelector('.btn')
var transactionsElement = document.querySelector('.transactions')
var balanceDisplay = document.querySelector('#balance')
var incomeDisplay = document.querySelector('#money-plus')
var expenseDisplay = document.querySelector('#money-minus')


var transactionsDB = []

function cleanInputs() {
    textTransaction.value = ''
    amountTransaction.value = ''
}

buttonAddTransaction.addEventListener('click', (event) => {
    event.preventDefault()

    if (textTransaction.value.trim() == '' || amountTransaction.value.trim() == '') {
        alert('Por favor, preencha todos os campos')
        return
    }

    addTransaction()
    updateBalanceValues()
    renderListTransactions()
    cleanInputs()
})

function generateID() {
    return Math.floor(Math.random() * 9999)
}

function addTransaction() {

    var newTransaction = {
        id: generateID(),
        textTransaction: textTransaction.value,
        amount: Number(amountTransaction.value),
    }

    transactionsDB = [newTransaction, ...transactionsDB]
}

function removeTransaction(id) {
    transactionsDB = transactionsDB.filter(transaction => transaction.id != id)
    updateBalanceValues()
    renderListTransactions()
}


function renderListTransactions() {
    transactionsElement.innerHTML = ''

    transactionsDB.forEach(({ id, textTransaction, amount }) => {
        var cssClass = amount >= 0 ? 'plus' : 'minus'
        var operator = amount >= 0 ? '+' : '-'

        var transactionElement = document.createElement('li')
        transactionElement.classList.add(cssClass)

        transactionElement.innerHTML = `
            ${textTransaction} <span>${operator} $${Math.abs(amount)}</span>
            <button class="delete-btn" onClick="removeTransaction(${id})">
                x
            </button>
        `
        transactionsElement.append(transactionElement)
    })

}


function getTotal(transactionsAmount) {
    return transactionsAmount
        .reduce((acc, sum) => acc + sum, 0)
        .toFixed(2)
}
function getTIncome(transactionsAmount) {
    return transactionsAmount
        .filter(value => value > 0)
        .reduce((acc, sum) => acc + sum, 0)
        .toFixed(2)
}
function getExpenses(transactionsAmount) {
    return transactionsAmount
        .filter(value => value < 0)
        .reduce((acc, sum) => acc + sum, 0)
        .toFixed(2)
}


function updateBalanceValues() {
    var transactionsAmount = transactionsDB.map(({ amount }) => amount)
    var total = getTotal(transactionsAmount)
    var income = getTIncome(transactionsAmount)
    var expense = getExpenses(transactionsAmount)

    balanceDisplay.textContent = `R$${total}`
    incomeDisplay.textContent = `R$${income}`
    expenseDisplay.textContent = `R$${expense}`
}