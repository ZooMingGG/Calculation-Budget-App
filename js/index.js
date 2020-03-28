'use strict'
let startCalc = document.querySelector('#start'),
    expenses = document.querySelectorAll('.expenses-item'),
    optionalExpenses = document.querySelectorAll('.optionalexpenses-item'),
    expensesConfirm = document.querySelector('.expenses-item-btn'),
    optionalExpensesConfirm = document.querySelector('.optionalexpenses-btn'),
    budgetValue = document.querySelector('.budget-value'),
    daybudgetValue = document.querySelector('.daybudget-value'),
    levelValue = document.querySelector('.level-value'),
    expensesValue = document.querySelector('.expenses-value'),
    optionalExpensesValue = document.querySelector('.optionalexpenses-value'),
    incomeValue = document.querySelector('.income-value'),
    monthsavingsValue = document.querySelector('.monthsavings-value'),
    yearsavingsValue = document.querySelector('.yearsavings-value'),
    dayBudgetCalc = document.querySelector('.count-budget-btn'),
    incomeInput = document.querySelector('.choose-income'),
    savingsCheckbox = document.querySelector('#savings'),
    sumInput = document.querySelector('#sum'),
    percentInput = document.querySelector('#percent'),
    year = document.querySelector('.year-value'),
    month = document.querySelector('.month-value'),
    day = document.querySelector('.day-value');

let money,
    time;

function start() {
    time = prompt('Введіть дату в форматі YYYY-MM-DD', '');
    money = +prompt('Ваш бюджет на місяць?', '');

    while (isNaN(money) || money == null || money == '') {
        money = +prompt('Ваш бюджет на місяць?', '');
    }

    appData.budget = money;
    appData.time = time;

    budgetValue.textContent = money.toFixed();
    year.value = new Date(Date.parse(time)).getFullYear();
    month.value = new Date(Date.parse(time)).getMonth() + 1;
    day.value = new Date(Date.parse(time)).getDate();
}
startCalc.addEventListener('click', start);

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
    chooseExpenses() {
        if (appData.budget != undefined) {
            let sum = 0;

            for (let i = 0; i < expenses.length; i++) {
                let a = expenses[i].value,
                    b = expenses[++i].value;
            
                if ( (typeof(a)) === 'string' && (typeof(a)) != null && (typeof(b)) != null
                    && a != '' && b != '' && a.length < 50) {
            
                    appData.expenses[a] = b;
                    sum += +b;
            
                } else {
            
                    i--;
                }
            }
    
            expensesValue.textContent = sum;
        }
    },
    detectDayBudget() {
        if (appData.budget != undefined) {
            let expenses = 0;

            for (let key in appData.expenses) {
                expenses += +appData.expenses[key];
            }

            appData.moneyPerDay = ((appData.budget - expenses) / 30).toFixed(2);
    
            daybudgetValue.textContent = appData.moneyPerDay;
        } else {
            daybudgetValue.textContent = 'Виникла помилка!';
        }
    },
    detectLevel() {
        if (appData.budget != undefined) {
            if (appData.moneyPerDay <= 100) {
                levelValue.textContent = 'Це мінімальний рівень достатку';
            } else if (appData.moneyPerDay > 100 && appData.moneyPerDay <= 2000) {
                levelValue.textContent = 'Це середній рівень достатку';
            } else if (appData.moneyPerDay > 2000) {
                levelValue.textContent = 'Це високий рівень достатку';
            } else {
                levelValue.textContent = 'Виникла помилка!';
            } 
        }
    },
    checkSavings() {
        if (appData.budget != undefined) {
            if (appData.savings === true) {
                appData.savings = false;
            } else {
                appData.savings = true;
            }
        }
    },
    chooseOptExpenses() {
        if (appData.budget != undefined) {
            for(let i = 0; i < optionalExpenses.length; i++) {
                let optExpenses = optionalExpenses[i].value;
    
                appData.optionalExpenses[i] = optExpenses;
    
                optionalExpensesValue.textContent += optExpenses + ' ';
            } 
        }
    },
    chooseIncome() {
        if (appData.budget != undefined) {
            let items = incomeInput.value;

            appData.income = items.split(', ');
    
            incomeValue.textContent = appData.income;
        }
    },
    calcMonthIncome() {
        if (appData.budget != undefined) {
            if (appData.savings === true) {
                let sum = +sumInput.value,
                    percent = +percentInput.value;
                appData.monthIncome = sum/100/12*percent;
                appData.yearIncome = sum/100*percent;
        
                monthsavingsValue.textContent = appData.monthIncome.toFixed(2);
                yearsavingsValue.textContent = appData.yearIncome.toFixed(2);
            }
        }
    },
    calcYearIncome() {
        if (appData.budget != undefined) {
            if (appData.savings === true) {
                let sum = +sumInput.value,
                    percent = +percentInput.value;
                appData.monthIncome = sum/100/12*percent;
                appData.yearIncome = sum/100*percent;
        
                monthsavingsValue.textContent = appData.monthIncome.toFixed(2);
                yearsavingsValue.textContent = appData.yearIncome.toFixed(2);
            }
        }
    }
};


expensesConfirm.addEventListener('click', appData.chooseExpenses);

optionalExpensesConfirm.addEventListener('click', appData.chooseOptExpenses);

dayBudgetCalc.addEventListener('click', appData.detectDayBudget);

dayBudgetCalc.addEventListener('click', appData.detectLevel);

incomeInput.addEventListener('input', appData.chooseIncome);

savingsCheckbox.addEventListener('click', appData.checkSavings);

sumInput.addEventListener('input', appData.calcMonthIncome);

percentInput.addEventListener('input', appData.calcYearIncome);

