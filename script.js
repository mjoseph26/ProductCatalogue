import { data } from './data.js';
console.log(data);

const searchInput = getElement('#search');
const btnContainer = getElement('#btn-container');
const productContainer = getElement('#productslist-container');
console.log(searchInput);
console.log(btnContainer);
console.log(productContainer);

// Display list of products
// Argument: An array of products
function displayProducts(products) {
    if (!products || products.length === 0) {
        productContainer.innerHTML = "<h2 class='no-results'>No Results</h2>";
    } else 
    {
        const productsList = products.map(product => {
            const { title, price, brand, rating, thumbnail} = product;
            return `
                <div class='product-wrapper'>
                <div class='rating'>
                    <p>Rating: ${rating}</p>
                </div>
                <div class='product-info'>
                    <div class='product-img'>
                    <img src='${thumbnail}' alt='${title}'/>
                    </div>
                    <div class='product-detail'>
                    <h2>${title}</h2>
                    <p>${brand}</p>
                    <p>${price}.00</p>
                    </div>
                </div>
                </div>
            `;
        }).join("");
        productContainer.innerHTML = productsList;
    }
}

// Create a category button
// Argument: The category, represented in string format.
function createBtn(category) {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.textContent = category;
    btn.setAttribute('class','category-btn');
    li.appendChild(btn);
    return li;
}

// Handle input
// Argument: a string representation of a category, used to compare against categories of products
function filterProducts(value) {
    const filteredProducts = data.products.filter((product) => {
      return product.category.includes(value);
    });
  
    displayProducts(filteredProducts);
  }

// Grab element from the DOM
// Argument: a string representation of the element's ID
searchInput.addEventListener('input', (e)=>{
    filterProducts(e.target.value);
});

function getElement(identifier) {
    const el = document.querySelector(identifier);
    if(!el){
        throw new Error('Could not find the element specified');
    }
    else{
        return el;
    }
}

// Display category buttons
// Argument: An array of products
function displayCategories(products) {
    const parsedCategories = parseCategories(products);
    btnContainer.appendChild(createBtn('All'))
    parsedCategories.forEach((category) => {
        btnContainer.appendChild(createBtn(category));
    });
}

// Gather all categories from products data
// Argument: An array of products
function parseCategories(products) {
    let categories = products.reduce((arr, product) => {
      if (!arr.includes(product.category)) {
        arr.push(product.category);
      }
  
      return arr;
    }, []);
  
    categories = categories.map((category) => {
      if (category.includes("-")) {
        const splitCategory = category
          .split("-")
          .map((str) => {
            return str.charAt(0).toUpperCase() + str.substr(1);
          })
          .join(" ");
        return splitCategory;
      }
  
      return category.charAt(0).toUpperCase() + category.substr(1);
    });
  
    console.log(categories);
  }

parseCategories(data.products);

// Display initial products list and category buttons
// No arguments
function init() {
    displayProducts(data.products);
    displayCategories(data.products);
}

init();
