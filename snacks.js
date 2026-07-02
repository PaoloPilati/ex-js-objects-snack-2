//🏆 Code Question 1
const hamburger = { name: "Cheese Burger", weight: 250 };
const secondBurger = hamburger;
secondBurger.name = 'Double Cheese Burger';
secondBurger.weight = 500;

console.log(hamburger.name); // Double Cheese Burger
console.log(secondBurger.name ); // Double Cheese Burger

//Senza lanciare il codice, riesci a prevedere cosa viene stampato in console? ---> Double Cheese Burger x2
//Quanti oggetti sono stati creati in memoria durante l'esecuzione di questo codice? ---> 1


//🏆 Code Question 2
const hamburger = { 
    name: "Cheese Burger", 
    weight: 250,
    ingredients: ["Cheese", "Meat", "Bread", "Tomato"]
};

const secondBurger = {...hamburger};
secondBurger.ingredients[0] = "Salad";

console.log(hamburger.ingredients[0]); // 1
console.log(secondBurger.ingredients[0]); // 1

//P.S.: Ricordati che gli Array, come gli oggetti, sono dei Reference Type (Tipi di Riferimento)!

//Senza lanciare il codice, riesci a prevedere cosa viene stampato in console? ---> 1 (Salad)
//Quanti oggetti sono stati creati in memoria durante l'esecuzione di questo codice? ---> 2 oggetti (oggetto originale + oggetto shallow copy con l'array ingredients condiviso)

//🏆 Code Question 3
const hamburger = { 
    name: "Cheese Burger", 
    weight: 250,
    maker: {
        name: "Anonymous Chef",
        restaurant: {
            name: "Hyur's Burgers",
            address: "Main Street, 123",
            isOpen: true,
        },
        age: 29
    }
};

const secondBurger = structuredClone(hamburger);
const thirdBurger = structuredClone(hamburger);

//Quanti oggetti sono stati creati in memoria durante l'esecuzione di questo codice? ---> 3 oggetti (1 iniziale [hamburger] e 2 deep copy [second/thirdBurger]) x 3 ( 2 oggetti annidati [hamburger > maker > restaurant])


//🏆 Code Question 4
const chef = {
    name: "Chef Hyur",
    age: 29,
    makeBurger: (num = 1) => {
        console.log(`Ecco ${num} hamburger per te!`);
    },
}

const restaurant = {
    name: "Hyur's Burgers",
    address: {
        street: 'Main Street',
        number: 123,
    },
    openingDate: new Date(2025, 3, 11),
    isOpen: false,
};
//Qual è il metodo migliore per clonare l’oggetto chef, e perché? ---> Uno spread, per copiare la funzione contenuta nella proprietà makeBurger.
//Qual è il metodo migliore per clonare l’oggetto restaurant, e perché? ---> structuredClone() perché contiene dati annidati e mantiene new Date come oggetto di tipo "Date", mentre stringify la trasforma in stringa.


//🎯 Code Question 5 (Bonus)
const hamburger = { 
    name: "Cheese Burger", 
    weight: 250,
    maker: {
        name: "Anonymous Chef",
        restaurant: {
            name: "Hyur's Burgers",
            address: "Main Street, 123",
            isOpen: true,
        },
        age: 29
    }
};

const newRestaurant = {...hamburger.maker.restaurant};
newRestaurant.name = "Hyur's II";
newRestaurant.address = "Second Street, 12";
const secondBurger = {...hamburger};
secondBurger.maker.restaurant = newRestaurant;
secondBurger.maker.name = "Chef Hyur";

console.log(hamburger.maker.name); // Chef Hyur
console.log(secondBurger.maker.name); // Chef Hyur
console.log(hamburger.maker.restaurant.name); // Hyur's Burgers (?)
console.log(secondBurger.maker.restaurant.name); // Hyur's II

//Senza lanciare il codice, riesci a prevedere cosa viene stampato in console?
//Quanti oggetti sono stati creati in memoria durante l'esecuzione di questo codice? ---> 3 (ogg hamburger più 2 oggetti annidati maker > restaurant) + 1 newRestaurant (shallow copy dell'ogg restaurant) + 1 shallow copy di hamburger con oggetti annidati  condivisi


//🎯 Code Question 6 (Bonus)
const chef = {
    name: "Chef Hyur",
    age: 29,
    makeBurger: (num = 1) => {
        console.log(`Ecco ${num} hamburger per te!`);
    },
    restaurant: {
        name: "Hyur's Burgers",
        welcomeClient: () => {
            console.log("Benvenuto!");
        },
        address: {
            street: 'Main Street',
            number: 123,
            showAddress: () => {
                console.log("Main Street 123");
            }
        },
        isOpen: true,
    }
}

//Qual è il metodo migliore per clonare l’oggetto chef, e perché?
// ---> In questo caso per mantenere funzioni e dati annidati occorre una copia manuale con spread dei singoli oggetti annidati nel "macro-oggetto".

const chefCopy = {...chef,
    restaurant: {
        ...chef.restaurant,
        address: {
            ...chef.restaurant.address
        }
    }
};


//🎯 Snack 7  (Bonus)
//Crea una funzione che permette la copia profonda (deep copy) di un oggetto, che copia anche i suoi metodi (proprietà che contengono funzioni). Usa l’oggetto di Code Question 6 come test.

//⚠️ Serve usare una funzione ricorsiva! (fai un po’ di ricerca).

function deepClone(value) {
  // Base case: if value is not an object, return it as is
  if (!value || typeof value !== "object") {
    return value;
  }
  
  // If it's an array, map over it and deep clone each item
  if (Array.isArray(value)) {
    return value.map(item => deepClone(item));
  }
  
  // If it's an object, iterate over its keys and deep clone each value
  return Object.keys(value).reduce((acc, key) => {
    acc[key] = deepClone(value[key]);
    return acc;
  }, {});  //https://medium.com/@ayogesh1214/deep-cloning-objects-in-javascript-without-json-methods-object-assign-ca3aba5e60f6

  //ALTERNATIVA PIU LEGGIBILE AL REDUCE
    //const clone = {};

    //Object.keys(value).forEach((key) => {
    //clone[key] = deepClone(value[key]);
    //});

    //return clone;

}


const chef2 = deepClone(chef);
console.log(chef2)

chef2.makeBurger(2);
chef2.restaurant.welcomeClient();
chef2.restaurant.address.showAddress();