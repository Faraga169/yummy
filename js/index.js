/// <reference types="../@types/jquery" />

// sidebar

$(document).ready(function(){
    $('.layer .loader').hide(2000,function(){
        $('.layer').slideUp(2000);
    })
    let innerwidthsidebar1=$('.innersidebar1').outerWidth();
    let innerwidthsidebar2=$('.innersidebar2').outerWidth();
    // console.log(innerwidthsidebar1)
    // console.log(innerwidthsidebar2)
    $('.innersidebar1').animate({marginLeft:`${-innerwidthsidebar1}px`},1000);
    $('.closebtn i').removeClass('fa-x').addClass('fa-list')
    $('.closebtn i').on('click',function(){
        let innersidebarmargin1=$('.innersidebar1').css('marginLeft');
        console.log(innersidebarmargin1)
       if(innersidebarmargin1==='0px'){
     
        // $('.innersidebar1 .links').animate({'marginBottom':'-20px'},1000);
        $('.innersidebar1').animate({marginLeft:`${-innerwidthsidebar1}px`},1000)
          
       
        $('.closebtn i').removeClass('fa-x').addClass('fa-list')
       }
    
       else{
        // $('.innersidebar1 .links').animate({'marginTop':'20px'},1000);
        $('.innersidebar1').animate({marginLeft:`0px`},1000)
          
      
        $('.closebtn i').removeClass('fa-list').addClass('fa-x')
       }
    })
    
})

const name = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const age = document.getElementById('age');
const password = document.getElementById('password');
const repassword = document.getElementById('repassword');
const submitbtn = document.getElementById('btnsubmit');
const input=document.querySelectorAll('input');
console.log(input)
const inputs = document.querySelectorAll('.form-control');
  const  nameregex= /([a-zA-Z0-9_\s]+)/;
   const emailregex= /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const phoneregex= /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    const ageregex= /^([3-9]|[1-6][0-9])$/;
   const passwordregex= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  const  repasswordregex= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  const searchname=document.getElementById('searchname');
  function validation(regex, input) {
    if (regex.test(input.value)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        
        return false;
    }
}

$('input').on("input", function () {
    validation(nameregex, name);
    validation(emailregex, email);
    validation(phoneregex, phone);
    validation(ageregex, age);
    validation(passwordregex, password);
    validation(repasswordregex, repassword);

    if (
        validation(nameregex, name) &&
        validation(emailregex, email) &&
        validation(phoneregex, phone) &&
        validation(ageregex, age) &&
        validation(passwordregex, password) &&
        validation(repasswordregex, repassword) &&
        password.value === repassword.value
    ) {
        submitbtn.disabled = false; 
    } else {
        submitbtn.disabled = true; 
    }
});


let state=true;

async function getdefaultFood() {
    
    try {
        var request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s');
        var response = await request.json();
        var data = response.meals;
                displaydefaultfood(data);
    }
      
    catch (error) {
        console.error('Error fetching the food data:', error);
    }
}




async function getdetails(id){
    $('.layer .loader').show(1000,function(){
        $('.layer').fadeIn(1000);
    })
    if(state){
        $('.layer').removeClass('d-none');
        state=false;
    }
    var request=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    var response=await request.json();
    console.log(response.meals);
    // displayfoodinformation(response.meals);
    
    setTimeout(()=>{
        $('.layer .loader').hide(1000,function(){
            $('.layer').fadeOut(1000);
            displayfoodinformation(response.meals);
            $('.layer').addClass('d-none');
           
            state=true;
        })
       
    },500)
  
    
}


async function getcategory(){
        var request=await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        var response=await request.json();
        console.log(response);
        displaycategories(response.categories);
    }

getcategory();


async function getcategorybyname(kind){
    var request=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${kind}`);
    var response=await request.json();
    console.log('Ali');
    console.log(response.meals);
    displayDataorder(response.meals);
}



async function getfoodbyName(name){
    try {
        var request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
        var response = await request.json();
        console.log(response);
        displayfoodbyName(response.meals);
    } catch (error) {
        console.error('Error fetching the food data:', error);
    }
}

async function getfoodbyLetter(letter){
    var request=await fetch(`https:www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    var response= await request.json();
    console.log(response);
    displayfoodbyLetter(response.meals);
 }





async function getArea(){
    var request=await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    var response= await request.json();
    console.log(response);
   displayArea(response.meals);
 }
getArea();
 async function getAreabycountry(country){
    var request=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`);
    var response= await request.json();
    console.log(response.meals);
   displayDataorder(response.meals);
 }

 

async function getingredient(){
    var request=await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    var response= await request.json();
    console.log(response.meals);
    displayingredient(response.meals.slice(0,20));
    
}
getingredient();

async function getingredientname(ingredientname){
    var request=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientname}`);
    var response= await request.json();
    console.log(response.meals);
    displayDataorder(response.meals);
    
}


 function displaydefaultfood(list) {
    var container = '';
    for (let i = 0; i < list.length; i++) {
        container += `<div class="col-md-4 col-lg-3 mt-5 ">
                <div class="items" id="${list[i].idMeal}" >
                    <img src="${list[i].strMealThumb}" class="w-100"  alt="">
                    <div class="itemslayer">
                        <h2 class="text-center">${list[i].strMeal}</h2>
                    </div>
                </div>
            </div>`;
    }

    document.querySelector('.defaultfood').innerHTML = container;
    

    $('.col-md-4 .items').on('click',function(){
        let detailsproduct=$(this).attr('id');
        console.log(detailsproduct);
        // console.log('Ahmed')
        $('.defaultfood').addClass('d-none');
        $('.detailsdefaultfood').removeClass('d-none');
        getdetails(detailsproduct);
    })
    
}




function displayfoodinformation(list){
    var container = '';
    for (let i = 0; i<list.length; i++) {
        container += `<div class="col-md-4 mt-5">
            <div class="food-image">
                <img src="${list[i].strMealThumb}" class="w-100" alt="">
                <h2 class="text-center">${list[i].strMeal}</h2>
            </div>
        </div>
        <div class="col-md-8  mt-5 ">
            <div class="instructions text-light">
                <h2>Instructions</h2>
                <p>${list[i].strInstructions}</p>
                <h3>Area : <span class="special">${list[i].strArea}</span></h3>
                <h3>Category :<span class="special"> ${list[i].strCategory}</span></h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    <li class="alert alert-info p-1 m-2">${list[i]. strMeasure1}</li>
                    <li class="alert alert-info p-1 m-2">${list[i]. strMeasure2}</li>
                    <li class="alert alert-info p-1 m-2">${list[i]. strMeasure3}</li>
                    <li class="alert alert-info p-1 m-2">${list[i]. strMeasure4}</li>
                    <li class="alert alert-info p-1 m-2">${list[i]. strMeasure5}</li>
                    <li class="alert alert-info p-1 m-2">${list[i]. strMeasure6}</li>
                </ul>
                 <h3>Tags :</h3>
                 <div class="list-unstyled d-flex g-3 flex-wrap">
                  <li class="alert alert-danger p-1 m-2">${list[i].strTags}</li>
                 </div>
                 <div class="food-links mt-2 mb-5">
                  <a href="${list[i].strSource}" target="_blank" class="btn btn-success">source</a>
                  <a href="${list[i].strYoutube}" target="_blank" class="btn btn-danger">youtube</a>
                 </div>
            </div>
        </div>`;
    }
     document.querySelector('.detailsdefaultfood').innerHTML=container;
    


    
}


 function displaycategories(list){
    var container = '';
    for (let i = 0; i < list.length; i++) {
        container += `<div class="col-md-4 col-lg-3 mt-5 ">
                <div class="items" id="${list[i].strCategory}" >
                    <img src="${list[i].strCategoryThumb}" class="w-100"  alt="">
                    <div class="itemslayer">
                        <h2 class="text-center">${list[i].strCategory}</h2>
                          <p class="text-center h6">${list[i].strCategoryDescription.split(' ').slice(0,20).join(' ')}</p>
                    </div>
                </div>
            </div>`;
    }

    document.querySelector('.foodcategory').innerHTML = container;


    
   $('.col-md-4 .items').on('click',function(){
    let categoryname=$(this).attr('id');
    console.log(categoryname);
    console.log("Ahmed")
    $('.foodcategory').addClass('d-none');
    $('.categorydetail').removeClass('d-none');
    getcategorybyname(categoryname);
   })

    

   

 }



 function displayDataorder(list){
    var container = '';
    for (let i = 0; i < list.length; i++) {
        container += `<div class="col-md-4 col-lg-3  mt-5 ">
                <div class="items" id="${list[i].idMeal}" >
                    <img src="${list[i].strMealThumb}" class="w-100"  alt="">
                    <div class="itemslayer">
                        <h2 class="text-center">${list[i].strMeal}</h2>
                    </div>
                </div>
            </div>`;
    }

    document.querySelector('.categorydetail').innerHTML = container;


    
    
    $('.col-md-4 .items').on('click',function(){
              let categoryname=$(this).attr("id");
              console.log(categoryname);
            $('.categorydetail').addClass('d-none');
            $('.detailsdefaultfood').removeClass('d-none');
            getdetails(categoryname);
        })

    


   

 }




function displayfoodbyName(list){
    var container = '';
    for (let i = 0; i < list.length; i++) {
        container += `<div class="col-md-3 mt-5 ">
                <div class="items" id="${list[i].idMeal}" >
                    <img src="${list[i].strMealThumb}" class="w-100" alt="">
                    <div class="itemslayer">
                        <h2 class="text-center">${list[i].strMeal}</h2>
                        <p class="text-center h6">${list[i].strInstructions.split(' ').slice(0,20).join(' ')}</p>
                    </div>
                </div>
            </div>`;
    }

    document.querySelector('.searchbyname').innerHTML = container;

    $('.items').on('click', function(){
        let detailsproduct = $(this).attr('id');
        console.log(searchname);
        $('#search .row').addClass('d-none');
        $('.detailsdefaultfood').removeClass('d-none');
        getdetails(detailsproduct);
    });
}

function displayfoodbyLetter(list){
    var container = '';
    for (let i = 0; i < list.length; i++) {
        container += `<div class="col-md-3 mt-5 ">
                <div class="items" id="${list[i].idMeal}" >
                    <img src="${list[i].strMealThumb}" class="w-100" alt="">
                    <div class="itemslayer">
                        <h2 class="text-center">${list[i].strMeal}</h2>
                    </div>
                </div>
            </div>`;
    }

    document.querySelector('.searchbyname').innerHTML = container;

    $('.items').on('click', function(){
        let detailsproduct = $(this).attr('id');
        console.log(detailsproduct);
        $('#search .row').addClass('d-none')
        $('.detailsdefaultfood').removeClass('d-none');
        getdetails(detailsproduct);
    });
}



function displayArea(list){
    var container = '';
    for (let i = 0; i < list.length; i++) {
        container += `<div id='${list[i].strArea}' class="col-md-3 areaitems d-flex flex-column justify-content-between align-items-center text-center text-light cursor-pointer">
               
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                    <h3 >${list[i].strArea}</h3>
                </div>`;
    }

    document.querySelector('.Areadetail ').innerHTML = container;

    $('.areaitems').on('click',function(){
        let detailsarea=$(this).attr('id');
        console.log(detailsarea);
        $('.Areadetail').addClass('d-none');
        $('.categorydetail').removeClass('d-none')
        getAreabycountry(detailsarea);
    })
}



function displayingredient(list){

    var container = '';
    for (let i = 0; i < list.length; i++) {
        container += `<div class="col-md-3 p-2 mt-5">
                <div id='${list[i].strIngredient}' class="ingredientitem d-flex text-center flex-column justify-content-between align-item-center ">
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h3>${list[i].strIngredient}</h3>
                    <p>${list[i].strDescription.split(' ').slice(0,20).join(' ')}</p>
                </div>
            </div>`;
    }

    document.querySelector('.ingredientdetail').innerHTML = container;

    $('.ingredientitem').on('click',function(){
        let ingredientdetails=$(this).attr('id');
        console.log(ingredientdetails);
         $('.ingredientdetail').addClass('d-none');
         $('.categorydetail').removeClass('d-none');
         getingredientname(ingredientdetails);

    })
}



$('#searchname').on('input', function(){
    let name = $(this).val();
    console.log(name);
    getfoodbyName(name);
});


$('a[href="#search"]').on('click',function(){
    $('#search .row').removeClass('d-none');
    $('.defaultfood').addClass('d-none');
    $('.detailsdefaultfood').addClass('d-none');
    $('.foodcategory ').addClass('d-none');
    $('.categorydetail').addClass('d-none');
    $('.Areadetail').addClass('d-none');
    $('.ingredientdetail').addClass('d-none');
    $('.contactdetails').addClass('d-none');
})


$('a[href="#categories"]').on('click',function(){
    $('.foodcategory ').removeClass('d-none');
    $('.defaultfood').addClass('d-none');
    $('.detailsdefaultfood').addClass('d-none');
    $('#search .row').addClass('d-none');
    $('.categorydetail').addClass('d-none');
    $('.Areadetail').addClass('d-none');
    $('.ingredientdetail').addClass('d-none');
    $('.contactdetails').addClass('d-none');
})



$('#searchletter').on('input',function(){
    let letter=$(this).val();
    console.log(letter);
    getfoodbyLetter(letter);
})


$('a[href="#Area"]').on('click',function(){
    $('.defaultfood').addClass('d-none');
    $('.detailsdefaultfood').addClass('d-none');
    $('#search .row').addClass('d-none');
    $('.categorydetail').addClass('d-none');
    $('.Areadetail').removeClass('d-none');
    $('.ingredientdetail').addClass('d-none');
    $('.foodcategory').addClass('d-none');
    $('.contactdetails').addClass('d-none');
})


$('a[href="#ingredients"]').on('click',function(){
    $('.defaultfood').addClass('d-none');
    $('.detailsdefaultfood').addClass('d-none');
    $('#search .row').addClass('d-none');
    $('.categorydetail').addClass('d-none');
    $('.Areadetail').addClass('d-none');
    $('.ingredientdetail').removeClass('d-none');
    $('.foodcategory').addClass('d-none');
    $('.contactdetails').addClass('d-none');
})


$('a[href="#contact"]').on('click',function(){
    $('.contactdetails').removeClass('d-none');
    $('.defaultfood').addClass('d-none');
    $('.detailsdefaultfood').addClass('d-none');
    $('#search .row').addClass('d-none');
    $('.categorydetail').addClass('d-none');
    $('.Areadetail').addClass('d-none');
    $('.ingredientdetail').addClass('d-none');
    $('.foodcategory').addClass('d-none');
})
getdefaultFood();

