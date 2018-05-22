//Longest Word
function longest(str)
{
  var array1 = str.match(/\w[a-z]{0,}/gi);
  var result = array1[0];

  for(var x = 1 ; x < array1.length ; x++)
  {
    if(result.length < array1[x].length)
    {
    result = array1[x];
    } 
  }
  return result;
}
//================================================================================================

//shopping cart
class ShoppingCart {
    constructor() {
      this.total = 0;
      this.items = {};
    }
    addItem(itemName, quantity, price) {
      if (!(itemName in this.items)) {
         this.items[itemName] = quantity;
        
      } else{
         this.items[itemName] += quantity;
      }
      this.total += (quantity * price);
    }
    
    removeItem(itemName, quantity, price) {
        if (this.items[itemName] < quantity) {
          this.items[itemName] = quantity;
            delete this.items[itemName];
        }
        if (this.items[itemName] > quantity) {
          this.items[itemName] -= quantity;
        }
        if (this.items[itemName] === 0) {
          delete this.items[itemName];
        }  
      this.total -= (quantity * price);
    }
    checkout(cashPaid) {
      if (cashPaid < this.total) {
        return 'Cash paid not enough';
      } 
      const balance = cashPaid - this.total;
     
      return balance;
    }
  }
   
  class Shop extends ShoppingCart {
    constructor() {
      super();
      this.quantity = 100;
    }
    removeItem() {
      this.quantity -= 1;
    }
  }
  
  
  let aldi = new ShoppingCart()
  aldi.addItem("PawPaw", 500, 3000)
  aldi.removeItem("PawPaw", 400, 3000)
  console.log(aldi.items)

  //==============================================================================================================================

  //Power. Recursive
  let power = (a,b) => { // a function to calculate the power of a raised to b.
    if (b <= 1) { // the base case to check against infinite recursion
        return a;
    } else {
        return a * power(a, b-1); // the recursive call to the function to calculate the power of a raised to b.
    }
};

//========================================================================
// MySort
function mySort(num) { // An algorithm that takes a list of int, returns a new lists sorting them into odd and even number respectively
    let odd = [];
    let even = [];
    let result = [];
    
    if (!Array.isArray(num)) { // check of the argument passed is an array
        return "Please input an array";
    } else { // loops through to check if the values are integers and then sorts them into an odd and even array respectively
        for (let counter = 0; counter < num.length; counter++) {
            if (typeof num[counter] === 'string') {
                num.splice(counter, 0);
            } else if (Math.floor(num[counter]) % 2 === 0) {
                even.push(Math.floor(num[counter]));
            } else {
                odd.push(num[counter]);
            }
        }
    }
    
    let newOdd = odd.sort(function(a,b) {return a-b}); // sorts the contect of the odd array
    let newEven = even.sort(function(a,b) {return a-b}); // sorts the contect of the odd array
    return result = newOdd.concat(newEven); // returns the new array.
  
}
//=====================================================================================================
//remove duplicates
let removeDuplicates = (word) => { // A function to check and remove the duplicated characters in a string and then return the sorted string and the number of duplicated removed.
    let result = {}; 
    let uniq = [];
    let uniques = [];
    let duplicates = [];
    let spChar =[];
    let newStr = word.toLowerCase();
    let strAlph = "abcdefghijklmnopqrstuvwxyz";
    
    for (let i = 0; i < newStr.length; i++) { // A loop to check the special characters and remove them from the string
        if (!strAlph.includes(newStr.charAt(i))) { // checks the presence of special character, if true it pushes the character to a array.
            spChar.push(newStr.charAt(i));
        } else {
            uniq.push(newStr.charAt(i));
        }
    }
    
    let letters = uniq.sort().join('');
    let count = {};
    let letter;
    for (let j = 0; j < letters.length; j++) { // Loop to check if a string is duplicated.
        letter = letters.charAt(j);
        
        if(count[letter]) {
            count[letter] = 1 + count[letter];
        } else {
            uniques.push(letter);
            count[letter] = 1;
        }
        
        if (count[letter] > 1) {
            duplicates.push(letter)
        }
    }
    result['uniques'] = uniques.join('');
    result['duplicates'] = duplicates.length;
    return result;
}
//===========================================================================================
//Isogram

function isIsogram(aWord) {
    if ( typeof aWord != 'string' || typeof aWord === undefined) {
      //console.log(aWord);
     return(aWord, true);
      // return(aWord, false);
    } else if (aWord.length < 1) {
      return(aWord, false);
    } else {
      var newWord = aWord.toLowerCase();
      var counter = {};
      for (var i = 0; i < newWord.length; i++) {
        var letter = newWord.charAt(i);
        
        if (counter[letter]) {
          counter[letter] = 1 + counter[letter];
        } else {
          counter[letter] = 1;
        }
        
        if (counter[letter] > 1) {
          return false;
        }
        //console.log(newWord[i]);
      }
      return(aWord, true);
    }
  }
  
  
  isIsogram("Dermatoglyphics");