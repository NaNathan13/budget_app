// Budget Controller
var budgetController = (function() {

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
  // Data Structure
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function(type, des, val) {
            var newItem, ID;

            //Create new ID
            if(data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }


            //Create new item based on 'inc' or 'exp' type
            if(type === "exp") {
                newItem = new Expense(ID, des, val);
            } else if (type === "inc") {
                newItem = new Income(ID, des, val);
            }

            //push it to our data structure
            data.allItems[type].push(newItem);
            
            //return the new elemenet
            return newItem;
        }
    };

})();

// UI Controller
var UIController = (function() {

    var DOMstrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        inputBtn: ".add__btn"
    }

    return {
        getinput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },

        addListItem: function(obj, type) {
            var html, newHtml;
            //Create HTML string with placeholder text
            
            if (type === 'inc') {
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                html = '<div class="item clearfix" id="income-&id&"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            //Replace the placeholder text with actual data
            newHtml = html.replace("%id%", obj.id);
            newHtml = newHtml.replace("%description%", obj.description);
            newHtml = newHtml.value("%value%", obj.value);


            //Insert the HTML into the DOM
        },


        getDOMstrings: function() {
            return DOMstrings;
        }
        }
    }
)();


// Global App Controller
var controller = (function (budgetCtrl, UICtrl) {


    var setupEventListeners = function() {

        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

        document.addEventListener("keypress", function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };



    var ctrlAddItem = function() {
        var input, newItem;

        //1. Get the field input data
        input = UICtrl.getinput();


        //2. Add the item to the budget controller
       newItem =  budgetController.addItem(input.type, input.description, input.value);

        //3. Add the new item to the UI

        //4. Calculate new budget

        //5. Display new budget on UI

    };

    return {
        init: function() {
            console.log("application has started.");
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();







