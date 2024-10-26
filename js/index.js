let state = true;
const inputName = document.getElementById("inputName");
const input = document.querySelector(".contact_us input");
const inputNumber = document.getElementById("inputNumber");
const inputEmail = document.getElementById("inputEmail");
const inputPassword = document.getElementById("inputPassword");
const btn = document.getElementById("myboy");
const nameRegex = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/;
const emailRegex =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const phoneRegex = /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/;
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
let stateNav = false;
let detailProduct;
let container_search = document.querySelector(".search_row");
const container_home = document.querySelector(".home .row");
const section = document.querySelector("section");
const container_catogary = document.querySelector(".catogary .row");
const container_Area = document.querySelector(".area .row");
const container_Ingredients = document.querySelector(".ingrediant .row");
const container_details = document.querySelector(".details .row");
const container_order = document.querySelector(".order .row");

$(".open").on("click", function () {
  if (stateNav == false) {
    $("aside").animate({ left: `0px` }, 1000);
    $(".open i").removeClass("fa-align-justify").addClass("fa-x");
    stateNav = true;
  } else {
    $("aside").animate({ left: `-250px` }, 1000);
    $(".open i").removeClass("fa-x").addClass("fa-align-justify");
    stateNav = false;
  }
});
$(".links ul li").on("click", function () {
  for (let i = 0; i < $(".links ul").length; i++) {
    $("section > div").addClass("d-none");
  }
  let currentLink = $(this).attr("href");
  $(currentLink).removeClass("d-none");
  console.log(currentLink);
});

function validation(regex, input) {
  if (regex.test(input.value)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    input.nextElementSibling.classList.add("d-none");
    return true;
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    input.nextElementSibling.classList.remove("d-none");
    return false;
  }
}
input.addEventListener("change", function () {
  if (
    validation(emailRegex, inputEmail) &&
    validation(passwordRegex, inputPassword) &&
    validation(phoneRegex, inputNumber) &&
    validation(nameRegex, inputName)
  ) {
    btn.disabled = true;
  } else {
    btn.disabled = false;
  }
});

async function getDetails(id) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let detail = await response.json();
  console.log(detail);
  detailsProduct(detail.meals);
}

async function getData() {
  $(".loading").fadeIn();
  if (state) {
    section.classList.add("d-none");
    state = false;
  }
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  let data = await response.json();
  console.log(data.meals);

  setTimeout(() => {
    $(".loading").fadeOut(300, function () {
      displayData(data.meals);
      section.classList.remove("d-none");
      state = true;
    });
  }, 500);
}

async function getDataByLetter(char) {
  $(".loading").fadeIn();
  if (state) {
    section.classList.add("d-none");
    state = false;
  }
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${char}`
  );
  let getByLetter = await response.json();
  console.log(getByLetter);

  setTimeout(() => {
    $(".loading").fadeOut(300, function () {
      getDataBy(getByLetter.meals);
      section.classList.remove("d-none");
      state = true;
    });
  }, 500);
}

async function getDataByName(Name) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${Name}`
  );
  let getByName = await response.json();
  console.log(getByName);
  getDataBy(getByName.meals);
}

async function getIngredients() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=`
  );
  let Ingredients = await response.json();
  console.log(Ingredients.meals.slice(0, 20));
  displayDataIngredients(Ingredients.meals.slice(0, 20));
}

async function getCategories() {
  $(".loading").fadeIn();
  if (state) {
    section.classList.add("d-none");
    state = false;
  }
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let Categories = await response.json();

  setTimeout(() => {
    $(".loading").fadeOut(300, function () {
      console.log(Categories);
      displayDataCategories(Categories.categories);
      section.classList.remove("d-none");
      state = true;
    });
  }, 500);
}

async function getorder(kind, order) {
  $(".loading").fadeIn();
  if (state) {
    section.classList.add("d-none");
    state = false;
  }
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?${kind}=${order}`
  );
  let data = await response.json();
  console.log(data.meals);
  setTimeout(() => {
    $(".loading").fadeOut(300, function () {
      displayDataOrder(data.meals);
      section.classList.remove("d-none");
      state = true;
    });
  }, 500);
}

async function getArea() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let Area = await response.json();
  console.log(Area.meals);
  displayDataArea(Area.meals);
}

function displayData(arr) {
  for (let i = 0; i < arr.length; i++) {
    let homeContent = `
                            <div class="col-sm-12 col-md-6 p-2 col-lg-4 col-xl-3" id="${arr[i].idMeal}">
                        <div class="inner overflow-hidden rounded position-relative h-100 w-100">
                            <img src="${arr[i].strMealThumb}" class="w-100" alt="">
                            <div class="overlay d-flex justify-content-center align-items-center fs-3">${arr[i].strArea}</div>
                        </div>
                    </div>
        `;
    container_home.innerHTML += homeContent;
  }
  $(".home .col-md-6").on("click", function () {
    detailProduct = $(this).attr("id");
    console.log(detailProduct);
    $(".home").addClass("d-none");
    $(".details").removeClass("d-none");
    getDetails(detailProduct);
  });
}

function detailsProduct(meal) {
  console.log(meal[0].strMeal);
  let detailPR = `
        <div class="col-sm-12 col-md-6 col-lg-4 ">
            <img src="${meal[0].strMealThumb}" class="w-100 rounded-1" alt="">
            <h4 class="h2 fw-bold">${meal[0].strMeal}</h4>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-8">
            <h2>Instructions</h2>
            <p>${meal[0].strInstructions}</p>
            <h3><span class="fw-bolder">Area : </span>${meal[0].strArea}</h3>
            <h3><span class="fw-bolder">Category : </span>${
              meal[0].strCategory
            }</h3>
            <h3>Recipes :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${generateRecipeList(meal)}
            </ul>
            <h3>Tags :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                <li class="alert alert-danger m-2 p-1">Soup</li>
            </ul>
            <a target="_blank" href="${
              meal[0].strSource
            }" class="btn btn-success">Source</a>
            <a target="_blank" href="${
              meal[0].strYoutube
            }" class="btn btn-danger">Youtube</a>
        </div>`;
  console.log(detailPR);
  container_details.innerHTML = detailPR;
}

function generateRecipeList(meal) {
  let list = "";
  for (let i = 1; i <= 10; i++) {
    if (meal[0][`strMeasure${i}`]) {
      list += `<li id="${i}" class="alert alert-info m-2 p-1">${
        meal[0][`strMeasure${i}`]
      }</li>`;
    }
  }
  return list;
}

function getDataBy(arr) {
  container_search.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    let searchContent = `
            <div class="col-sm-12 col-md-6 p-2 col-lg-4 col-xl-3" id="${
              arr[i].idMeal
            }">
                <div class="inner overflow-hidden rounded position-relative h-100 w-100">
                    <img src="${arr[i].strMealThumb}" class="w-100" alt="">
                    <div class="overlay d-flex justify-content-center align-items-center flex-column">
                        <h4 class="fw-bold h4">${arr[i].strMeal}</h4>
                        <p class="text-center h6">${arr[i].strInstructions
                          .split(" ")
                          .slice(0, 20)
                          .join(" ")}</p>
                    </div>
                </div>
            </div>
        `;
    container_search.innerHTML += searchContent;
  }
  $(".search_row > div").on("click", function () {
    detailProduct = $(this).attr("id");
    console.log(detailProduct);
    $(".search").addClass("d-none");
    $(".details").removeClass("d-none");
    getDetails(detailProduct);
  });
}

function displayDataCategories(arr) {
  for (let i = 0; i < arr.length; i++) {
    let homeCatogary = `
                    <div class="col-sm-12 col-md-6 p-2 col-lg-4 col-xl-3" id="${
                      arr[i].strCategory
                    }">
                        <div class="inner overflow-hidden rounded position-relative h-100 w-100">
                            <img src="${
                              arr[i].strCategoryThumb
                            }" class="w-100" alt="">
                            <div class="overlay d-flex justify-content-center align-items-center flex-column">
                                <h4 class="fw-bold h4">${
                                  arr[i].strCategory
                                }</h4>
                                <p class="text-center h6 ">${arr[
                                  i
                                ].strCategoryDescription
                                  .split(" ")
                                  .slice(0, 20)
                                  .join(" ")}</p>
                            </div>
                        </div>
                    </div>
        `;
    container_catogary.innerHTML += homeCatogary;
  }
  $(".catogary .col-md-6").on("click", function () {
    let catog = "c";
    detailProduct = $(this).attr("id");
    console.log(detailProduct);
    $(".catogary").addClass("d-none");
    $(".order").removeClass("d-none");
    getorder(catog, detailProduct);
  });
}

function displayDataOrder(arr) {
  container_order.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    let homeOrder = `
                               <div class="col-sm-12 col-md-6 p-2 col-lg-4 col-xl-3" id="${arr[i].idMeal}">
                        <div class="inner overflow-hidden rounded position-relative h-100 w-100">
                            <img src="${arr[i].strMealThumb}" class="w-100" alt="">
                            <div class="overlay d-flex justify-content-center align-items-center fs-3">${arr[i].strMeal}</div>
                        </div>
                    </div>
        `;
    container_order.innerHTML += homeOrder;
  }
  $(".order .col-md-6").on("click", function () {
    detailProduct = $(this).attr("id");
    console.log(detailProduct);
    $(".order").addClass("d-none");
    $(".details").removeClass("d-none");
    getDetails(detailProduct);
  });
}

function displayDataIngredients(arr) {
  for (let i = 0; i < arr.length; i++) {
    let homeIngredients = `
                    <div class="col-sm-12  col-md-6 p-2 col-lg-4 col-xl-3" id="${
                      arr[i].strIngredient
                    }">
                        <div class="text-center text-white flex-column text-center d-flex justify-content-between align-items-center cursor-pointer cursor-pointer">
                            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                            <h3>${arr[i].strIngredient}</h3>
                            <p>${arr[i].strDescription
                              .split(" ")
                              .slice(0, 20)
                              .join(" ")}</p>
                        </div>
                    </div>
        `;
    container_Ingredients.innerHTML += homeIngredients;
  }
  $(".ingrediant .col-md-6").on("click", function () {
    let ingrediant = "i";
    detailProduct = $(this).attr("id");
    console.log(detailProduct);
    $(".ingrediant").addClass("d-none");
    $(".order").removeClass("d-none");
    getorder(ingrediant, detailProduct);
  });
}

function displayDataArea(arr) {
  for (let i = 0; i < arr.length; i++) {
    let homeArea = `
                    <div class="col-sm-12  col-md-6 p-2 col-lg-4  col-xl-3" id="${arr[i].strArea}">
                        <div class="text-center text-white flex-column text-center d-flex justify-content-between align-items-center cursor-pointer cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                            <h3>${arr[i].strArea}</h3>
                        </div>
                    </div>

        `;
    container_Area.innerHTML += homeArea;
  }
  $(".area .col-md-6").on("click", function () {
    let area = "a";
    detailProduct = $(this).attr("id");
    console.log(detailProduct);
    $(".area").addClass("d-none");
    $(".order").removeClass("d-none");
    getorder(area, detailProduct);
  });
}

$(".search_name").on("input", function () {
  let name = $(this).val();
  console.log(name);
  getDataByName(name);
});
$(".search_letter").on("input", function () {
  let char = $(this).val();
  console.log(char);
  getDataByLetter(char);
});

getData();
getCategories();
getArea();
getIngredients();
