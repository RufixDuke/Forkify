const inputSpace = document.querySelector('.input-space');
const searchBtn = document.querySelector("#btn1");
const leftPage = document.getElementById('page');
const middlePage = document.querySelector('.middle')
var servingMinutes = document.getElementById('minutes');




searchBtn.addEventListener('click', () => {
    var query = inputSpace.value;
    leftFetch(query);
});




function leftFetch(query) {
    fetch(`https://forkify-api.herokuapp.com/api/search?q=${query}`)
    .then(result => {
        // console.log(result)
        return result.json();
    })
    .then(data => {
        
        leftPage.innerHTML = ''

        var result =  firstPage(data);

        result.map((el) => {
            var singleLeft = `<div class="img">
                            <img src=${el.image_url} alt="logo">
                        </div>
                        <div class="details">
                            <h6>${el.title}</h6>
                            <p>${el.publisher}</p>
                        </div>`

        var text = document.createElement("div");
        text.setAttribute('class', 'menus')
        text.setAttribute('data-id', `${el.recipe_id}`);
        text.setAttribute('onclick', `menuClick(${el.recipe_id})`)
        text.innerHTML = singleLeft;
        leftPage.appendChild(text);
        })
        

        // `<button onclick="${prevPage()}" id="btn_prev">Prev</button>
        // <button onclick="${nextPage()}" id="btn_next">Next</button>`

        
        
    })
    .catch(error => console.log(error));
}



var imgContainer = document.getElementById('img-container');
var servings = document.querySelector('.servings');
var amountOfServing = document.getElementById('serving-time');


function menuClick (id){
    var url = `https://forkify-api.herokuapp.com/api/get?rId=${id}`
    fetch(url)
    .then(result => {
        return result.json();
    })
    .then(data => {
        // data.recipes.map((el) => {
        var middleImg = `<div class="img-container">
                    <img src=${data.recipe.image_url} alt="img"
                    width="100%" height="100%">
                    <h2 id="store-name">${data.recipe.title}
                    </h2>
                    </div>`

        imgContainer.innerHTML = middleImg;




        var servingsDetail = document.getElementById('servings-details');

        var ingredient = data.recipe.ingredients;
        var ilength = ingredient.length

        var lside = ingredient.slice(0, ilength / 2);
        
        
        var rside = ingredient.slice(ilength / 2, ilength);


        // LEFT SIDE

        let text1 = ``;
        for (let i = 0; i < lside.length; i++) {
            // text += data.recipe.ingredients[i];

            new_text = `<div class="detailsss">
                            
                            <i class="fas fa-check-circle"></i>
                            <div class="deta">
                                <span class="increment"></span>
                                <p>${rside[i]}</p>
                            </div>
                        </div>`
            text1 += new_text

        }
        

        // RIGHT SIDE

        let text2 = ``;
        for (let i = 0; i < rside.length; i++) {
            // text += data.recipe.ingredients[i];

            new_text = `<div class="detailsss">
                            <i class="fas fa-check-circle"></i>
                            <div class="deta">
                            <span class="increment"></span>
                            <p>${rside[i]}</p>
                            </div>
                        </div>`
            text2 += new_text
            // console.log(text2);

        }

        // console.log(text1);
        var recipeDetails = `
                            <div class="servings-details" id="servings-details">
                                <div class="left-servings">
                                    ${text1}
                                </div>
                                
                                <div class="right-servings">
                                    ${text2}
                                </div>
                            </div>`

        
        servingsDetail.innerHTML = recipeDetails;





        const favoriteBtn = document.getElementById('addFavorite');
        var displayFavorite = document.getElementById('myDropdown');
        // displayFavorite = "";

        favoriteBtn.addEventListener('click', function() {

            let p_tag = document.createElement('p')

            var dis = `     <div class="dropdown-cont">
                            <div class="img">
                                <img src="${data.recipe.image_url}" alt="logo">
                            </div>
                            <div class="details">
                                <h6>${data.recipe.title}</h6>
                                <p>${data.recipe.publisher}</p>
                            </div>
                            </div>
                        `
            

            // console.log(display.innerHTML)
            // display = dis;
            
            p_tag.innerHTML = dis

            displayFavorite.innerHTML += p_tag.innerHTML;

            // console.log(displayFavorite);
            
        });


        const addCart = document.querySelector('.btn2');
        var inputsOnRight = document.getElementsByClassName('inputs')[0];
        var closeBtn = document.querySelector('.btn3');
        var detail = document.getElementsByClassName('deta');


        let btn = `<button class="btn3" onclick="${closeButton()}><i class="fas fa-times-circle"></i></button>`;
        addCart.addEventListener('click', function(){

            var total_div = document.createElement('div');


            // closeBtn = btn;
            // console.log(closeBtn)

            for(a = 0; a < detail.length; a++){
                let tag = document.createElement('div');
                tag.setAttribute('class', 'shopping');

                // var btn = document.createElement('button');
                // btn.setAttribute('class', 'btn3');

                tag.innerHTML = detail[a].innerHTML + btn;

                total_div.append(tag);
            }

            inputsOnRight.append(total_div)

        })

        
        
        
        
        var footerSide = document.querySelector('.inc');
        var div_tag = document.createElement('div');

        var incSide = `
                        <p>
                            This recipe was carefully designed and tested by ${data.recipe.publisher}.
                            Please check out directions at their website. 

                        </p>

                        <button class="direction" id="directions">
                            <a href="${data.recipe.publisher_url}">
                                directions
                                <i class="fas fa-arrow-right"></i>
                            </a>
                        </button>`

            div_tag.innerHTML = incSide;
            footerSide.innerHTML = div_tag.innerHTML;

            // console.log(footerSide.innerHTML);
        
    })
}

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function closeButton() {
    document.inputsOnRight.style.display = 'none'
};



window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-cont");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// SERVINGS INCREAMENT


var a = 0;
var b = 1;
function addition() {
    var changeNum = document.getElementsByClassName('increment');

    a = parseInt(amountOfServing.textContent) + 1;
    amountOfServing.textContent = a;


    b += 0.25;

    for(let i = 0; i<changeNum.length; i++){
        changeNum[i].textContent = b
    }
    // changeNum.textContent = b;    
}


function subtraction() {
    var changeNum = document.getElementsByClassName('increment');
    
    a = parseInt(amountOfServing.textContent) - 1;
    amountOfServing.textContent = a;

    b -= 0.25;
    // changeNum.textContent = b;

    for (let i = 0; i < changeNum.length; i++) {
        changeNum[i].textContent = b;
    }
}


// ************************************************* 

// ADD TO FAVORITE






// *************************************************


// PAGINATION

function firstPage(data, current_page = 1, records_per_page = 10) {
    const start = (current_page - 1) * records_per_page;
    const end = current_page * records_per_page;

    var res;

    var objJson = data.recipes;
    res = objJson.slice(start, end);
    // console.log(singleLeft)

    return res;
}

// function pagination(data){

//     function prevPage(current_page)
//     {
//         if (current_page > 1) {
//             current_page--;
//             changePage(current_page);
//         }
//     }
    
//     function nextPage()
//     {
//         if (current_page < numPages()) {
//             current_page++;
//             changePage(current_page);
//         }
//     }

//     function changePage(page)
//     {
//         var btn_next = document.getElementById("btn_next");
//         var btn_prev = document.getElementById("btn_prev");
//         var listing_table = document.getElementById("listingTable");
//         var page_span = document.getElementById("page");

//         // Validate page
//         if (page < 1) page = 1;
//         if (page > numPages()) page = numPages();

//         listing_table.innerHTML = "";

//         for (var i = (page-1) * records_per_page; i < (page * records_per_page); i++) {
//             listing_table.innerHTML += data[i] + "<br>";
//         }
//         page_span.innerHTML = page;

//         if (page == 1) {
//             btn_prev.style.visibility = "hidden";
//         } else {
//             btn_prev.style.visibility = "visible";
//         }

//         if (page == numPages()) {
//             btn_next.style.visibility = "hidden";
//         } else {
//             btn_next.style.visibility = "visible";
//         }
//     }

//     function numPages()
//     {
//         return Math.ceil(data.length / records_per_page);
//     }

//     window.onload = function() {
//         changePage(1);
//     };
// }





