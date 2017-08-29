var mysql = require("mysql");
var inquirer = require("inquirer");
var showtable=require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Brybizzy1992",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
    
    buy();
 
});

function buy(){
	connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
   console.log(results.length);
    console.table(results);
	inquirer
	.prompt([
    {
      name: "action",
      type: "list",
      message: "What item would you like to buy (item_id)?",
      choices: function(){
      	var choiceArray=[];
      	for(var i=0;i<results.length;i++)
      		choiceArray.push(results[i].item_id.toString());
      	return choiceArray;
      }
      
    },
    {
   		name: "quantity",
      	type: "input",
        message: "How many units of the product would you like to buy?",
        validate: function(value) {
          if (isNaN(value) === false) 
            return true;
          
          return false;
        }
    }
        ])
	.then(function(answer) {
      console.log(answer.action);
      console.log(answer.quantity);
      console.log(results[answer.action-1].stock_quantity)
      if(answer.quantity>results[answer.action-1].stock_quantity){
      		console.log("Insufficient quantity available, currently in backorder!");
      		keepbuying();

      }
      else{
      	connection.query("UPDATE products SET ? WHERE ?", 
      		[
      		{
      			stock_quantity:results[answer.action-1].stock_quantity-answer.quantity
      		},
      		{
      			item_id:answer.action
      		}
      		],

      		function(err, res) {
    if (err) throw err;
    console.log(res.affectedRows + " products updated!\n");
    console.log("The total cost of your purchase is: $" + answer.quantity*results[answer.action-1].price)
    keepbuying();
  });
      	

      }
    });
 });
};

function keepbuying(){
	inquirer.prompt([
      {
        name: "confirm",
        type: "confirm",
        message: "Would you like to buy something else?"
      }
    ]).then(function(answer) {
    	if(answer.confirm)
    		buy();
    	else
    		connection.end();

    });
}






