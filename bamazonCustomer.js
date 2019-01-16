var inquirer = require("inquirer");
var mysql = require("mysql");

let stockQuantity = [];
var connection = mysql.createConnection({
    host: "localhost",

    port:3306,

    user: "root",

    password: "root",
    database: "bamazon_db"
});


connection.connect();
 
connection.query('SELECT * from products', function (error, results, fields) {
  if (error) throw error;

for (i = 0; i < results.length; i++) {
    console.log('The product ID is ' + results[i].item_id);
    console.log('The product name is ' + results[i].product_name);
    console.log('The product price is '+ results[i].price);
    console.log('The quantity is ' + results[i].stock_quantity);
    console.log('-------------------------------\n');
    stockQuantity.push(results[i].stock_quantity);
}
amazonS();

});
 
function amazonS() {
    inquirer.prompt([
    {
      type: "input",
      message: "What item would you like to purchase?",
      name: "purchaseItem"
    },
    {
      type: "input",
      message: "how many would you like?",
      name: "purchaseQuantity"
    }
    
    ]) .then (function(response) {
        console.log(response);
        compareInventory(response.purchaseQuantity, stockQuantity[response.purchaseItem -1]);            
        
    });
    connection.end();
}

function compareInventory(purchase, stock) {
    if (purchase <= stock) {
        console.log("Your item is on its way!");
        updateInventory();
    }
    else {
        console.log("Insufficient quantity!")
    }
}

function updateInventory() {
     connection.query("SELECT * FROM products WHERE item_id=?", userPurchase.inputId, function(err, res) {
            for (var i = 0; i < res.length; i++) {

                if (userPurchase.inputNumber > res[i].stock_quantity) {

                    console.log("===================================================");
                    console.log("Sorry! Not enough in stock. Please try again later.");
                    console.log("===================================================");
                    startPrompt();

                } else {
                    //list item information for user for confirm prompt
                    console.log("===================================");
                    console.log("Awesome! We can fulfull your order.");
                    console.log("===================================");
                    console.log("You've selected:");
                    console.log("----------------");
                    console.log("Item: " + res[i].product_name);
                    console.log("Department: " + res[i].department_name);
                    console.log("Price: " + res[i].price);
                    console.log("Quantity: " + userPurchase.inputNumber);
                    console.log("----------------");
                    console.log("Total: " + res[i].price * userPurchase.inputNumber);
                    console.log("===================================");

                    var newStock = (res[i].stock_quantity - userPurchase.inputNumber);
                    var purchaseId = (userPurchase.inputId);
                    //console.log(newStock);
                    confirmPrompt(newStock, purchaseId);
                }
            }
        });
    });
}

//=================================Confirm Purchase===============================

function confirmPrompt(newStock, purchaseId) {

    inquirer.prompt([{

        type: "confirm",
        name: "confirmPurchase",
        message: "Are you sure you would like to purchase this item and quantity?",
        default: true

    }]).then(function(userConfirm) {
        if (userConfirm.confirmPurchase === true) {

            //if user confirms purchase, update mysql database with new stock quantity by subtracting user quantity purchased.

            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: newStock
            }, {
                item_id: purchaseId
            }], function(err, res) {});

            console.log("=================================");
            console.log("Transaction completed. Thank you.");
            console.log("=================================");
            startPrompt();
        } else {
            console.log("=================================");
            console.log("No worries. Maybe next time!");
            console.log("=================================");
            startPrompt();
        }
    });