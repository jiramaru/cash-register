let price = 19.5;
document.getElementById("price").textContent = "$" + price;
let cid = [
    ["PENNY", 1.01], 
    ["NICKEL", 2.05], 
    ["DIME", 3.1], 
    ["QUARTER", 4.25], 
    ["ONE", 90], 
    ["FIVE", 55], 
    ["TEN", 20], 
    ["TWENTY", 60], 
    ["ONE HUNDRED", 100]
];

function displayCID() {

  let pennies = document.getElementById("pennies")
  let nickel = document.getElementById("nickel")
  let dimes = document.getElementById("dimes")
  let quarters = document.getElementById("quarters")
  let ones = document.getElementById("ones")
  let fives = document.getElementById("fives")
  let tens = document.getElementById("tens")
  let twenties = document.getElementById("twenties")
  let hundred = document.getElementById("hundred")

  pennies.textContent = "$" + cid[0][1];
  nickel.textContent = "$" + cid[1][1];
  dimes.textContent = "$" + cid[2][1];
  quarters.textContent = "$" + cid[3][1];
  ones.textContent = "$" + cid[4][1];
  fives.textContent = "$" + cid[5][1];
  tens.textContent = "$" + cid[6][1];
  twenties.textContent = "$" + cid[7][1];
  hundred.textContent = "$" + cid[8][1];

}

document.addEventListener("DOMContentLoaded", displayCID);

document.getElementById("purchase-btn").addEventListener("click", function () {
    let cashGiven = parseFloat(document.getElementById("cash").value);

    if (isNaN(cashGiven) || cashGiven < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    }

    let changeDue = cashGiven - price;
    let changeText = "";
    let totalCID = cid.reduce((sum, denomination) => sum + denomination[1], 0);

    if (changeDue === 0) {
        changeText = "No change due - customer paid with exact cash";
    } 
    else if (totalCID === changeDue) {
        changeText = "Status: CLOSED " + cid
            .filter(item => item[1] > 0)
            .map(item => `${item[0]}: $${item[1].toFixed(2)}`)
            .join(" ");
    } 
    else if (changeDue > totalCID) {
        changeText = "Status: INSUFFICIENT_FUNDS";
    } 
    else {
        let remainingChange = changeDue;
        let changeArray = [];
        let currencyUnits = [
            ["ONE HUNDRED", 100], 
            ["TWENTY", 20], 
            ["TEN", 10], 
            ["FIVE", 5], 
            ["ONE", 1], 
            ["QUARTER", 0.25], 
            ["DIME", 0.1], 
            ["NICKEL", 0.05], 
            ["PENNY", 0.01]
        ];

        for (let [name, value] of currencyUnits) {
            let cidIndex = cid.findIndex(item => item[0] === name);
            let amountInDrawer = cid[cidIndex][1];
            let amountToReturn = 0;

            while (remainingChange >= value && amountInDrawer > 0) {
                remainingChange -= value;
                remainingChange = Math.round(remainingChange * 100) / 100;
                amountInDrawer -= value;
                amountToReturn += value;
            }

            if (amountToReturn > 0) {
                changeArray.push([name, amountToReturn]);
                cid[cidIndex][1] -= amountToReturn;
            }
        }

        if (remainingChange === 0) {
            changeText = "Status: OPEN " + changeArray
                .map(item => `${item[0]}: $${item[1].toFixed(2)}`)
                .join(" ");
        } else {
            changeText = "Status: INSUFFICIENT_FUNDS";
        }
    }

    document.getElementById("change-due").innerText = changeText;
    displayCID();
});
