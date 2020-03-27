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
    calc = document.querySelector('.count-budget-btn'),
    chooseIncome = document.querySelector('.choose-income'),
    savingsCheckbox = document.querySelector('#savings'),
    sum = document.querySelector('#sum'),
    percent = document.querySelector('#percent'),
    year = document.querySelector('.year-value'),
    month = document.querySelector('.month-value'),
    day = document.querySelector('.day-value');

let money,
    time;

function start() {
    money = +prompt('Ваш бюджет на місяць?', '');
    time = prompt('Введіть дату в форматі YYYY-MM-DD', '');

    while (isNaN(money) || money == null || money == '') {
        money = +prompt('Ваш бюджет на місяць?', '');
    }
}
start();

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: true,
    chooseExpenses() {
        for (let i = 0; i < 2; i++) {

            let a = prompt('Введіть обов\'язкову статтю витрат в цьому місяці', ''),
                b = prompt('В скільки обійдеться?', '');
        
            if ( (typeof(a)) === 'string' && (typeof(a)) != null && (typeof(b)) != null
                && a != '' && b != '' && a.length < 50) {
        
                console.log('done!');
                appData.expenses[a] = b;
        
            } else {
        
                console.log('bad value');
                i--;
            }
        }
    },
    detectDayBudget() {
        appData.moneyPerDay = (appData.budget / 30).toFixed(2);

        alert('Бюджет на один день: ' + appData.moneyPerDay);
    },
    detectLevel() {
        if (appData.moneyPerDay <= 100) {
            console.log('Це мінімальний рівень достатку');
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay <= 2000) {
            console.log('Це середній рівень достатку');
        } else if (appData.moneyPerDay > 2000) {
            console.log('Це високий рівень достатку');
        } else {
            console.log('Виникла помилка!');
        } 
    },
    checkSavings() {
        if (appData.savings == true) {
            let save = +prompt('Яка сума заощаджень?', ''),
                percent = +prompt('Під який відсоток?', '');
    
            appData.monthIncome = save / 100 / 12 * percent;
    
            alert('Дохід в місяць з вашого депозиту: ' + appData.monthIncome);
        } 
    },
    chooseOptExpenses() {
        let i = 1;

        while (i < 4) {
            let optExpenses = prompt('Стаття додаткових витрат', '');
    
            appData.optionalExpenses[i] = optExpenses;
    
            i++;
        }
    },
    chooseIncome() {
        let items;

        do {
            items = prompt('Що принесе додатковий дохід? (Перечисліть через кому)', '');
        } while (items == '' || items === null || +items == items)

        appData.income = items.split(', ');

        appData.income.push( prompt('Можливо ще щось?', '') );

        appData.income.sort();

        let result = '';

        appData.income.forEach(function(item, index) {
            result += `${index + 1}: ${item}, `;
        });

        alert('Варінти додаткового заробіку: ' + result);
    }
};

appData.chooseExpenses();

appData.detectDayBudget();

appData.detectLevel();

appData.checkSavings();

appData.chooseOptExpenses();

appData.chooseIncome();