// Functions 3|czqWp37WoxCkdqMXKVbOLM98nbckc94SG1qM2XXI3a62f82f
function  show_form_discount_bandit(){
    document.body.querySelector(".gray_layout").style.display="flex"
}

//Variables
let product_name =  document.getElementById("productTitle").textContent.trim()


//Populate Elements on the page

//Chart
let header = document.createElement("div");
header.setAttribute("id" , "chart")
document.body.querySelector("#ppd").after(header)

//Button To Show Form To Add / Edit
let add_to_system= document.createElement("img")
add_to_system.setAttribute( "src" , "https://raw.githubusercontent.com/Cybrarist/Discount-Bandit/master/storage/app/public/bandit.png")
add_to_system.setAttribute( "id" , "discount_bandit_show")
add_to_system.style.maxWidth= "50px"
add_to_system.addEventListener("click", function (){
    show_form_discount_bandit()
})
document.body.querySelector("#productTitle").after(add_to_system)

//background layout
let gray_layout = document.createElement("div")
gray_layout.setAttribute("class" , "gray_layout")

let messages=`
<div class="success-message">
</div>

<div class="danger-message">
    Error Has Happened, please check the logs
</div>`

document.body.insertAdjacentHTML("beforebegin" , messages)



let form_string=`

<div class="form_background">
           <div class="form_field">
               <label> Product Name </label>
               <input name="product_name" id="product_name" type="text" value="${product_name}">
           </div> 
           <div class="form_field">
                 <label> Notify Price </label>
               <input name="notify_price" id="notify_price" type="number" value=""  min="0" > 
           </div>
           <div class="form_field">
                 <label> Official Seller Only </label>
                  <input name="official_seller"  id="official_seller" type="checkbox" value="">
           </div>
           <div class="form_field">
                 <label> Add To Favourite </label>
               <input name="favourite" id="favourite" type="checkbox" value="">
           </div>
           <div class="form_field">
                 <label> Alert When Stock Available </label>
               <input name="stock_available" id="stock_available" type="checkbox" value="">
           </div>
           <div class="form_field">
                 <label> Alert If Product Is lowest Within  </label>
               <input name="lowest_within" id="lowest_within" type="number" value="" step="1">
           </div>
           <button class="submit_amazon"> Save </button>           
</div>
`
gray_layout.innerHTML = form_string
gray_layout.addEventListener("click" , function (e){
    if (e.target === this)
        this.style.display="none"

})
document.body.prepend(gray_layout)



var currentURL = window.location.href;

//Get the current product pricing chart
browser.storage.sync.get().then(function (result) {
    fetch(`${result.url}/api/products/get-product` ,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${result.token}`,
        },
        body:JSON.stringify({
            url : currentURL
        })
    })
        .then(response => {
            return response.json();
        })
        .then(data => {

            var options = {
                chart:data.chart,
                series: data.series,
                xaxis: data.xaxis,
                stroke : data.stroke,
                dataLabels: data.dataLabels,
                legend: {
                    position: 'top'
                }
            }

            var chart = new ApexCharts(document.querySelector("#chart"), options);
            chart.render();

            document.getElementById("corePrice_feature_div").insertAdjacentHTML("afterbegin" ,
                `
                        <div class="lowest_price" > Lowest Price ${data.prices.price_min / 100}</div>
                        <div class="max_price" "> Lowest Price ${data.prices.price_max / 100}</div>

`
            )

        })
        .catch(error => {
            // Handle errors
            console.log("Error:", error);
        });


}, function (error){
    console.log(`Error: ${error}`);
})




//events
document.querySelector(".submit_amazon").addEventListener("click" , function (){
    browser.storage.sync.get().then(function (result) {
        document.getElementsByClassName("success-message")[0].style.display="none"
        document.getElementsByClassName("danger-message")[0].style.display="none"
        document.getElementsByClassName("gray_layout")[0].style.display="none"
        fetch(`${result.url}/api/products/create/amazon`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${result.token}`,
            },
            body: JSON.stringify({
                url: currentURL ,
                product_name: document.getElementById("product_name").value,
                product_image: document.getElementById("landingImage").src,
                notify_price: document.getElementById("notify_price").value,
                official_seller: document.getElementById("official_seller").checked,
                favourite: document.getElementById("favourite").checked,
                stock_available: document.getElementById("stock_available").checked,
                lowest_within: document.getElementById("lowest_within").value,
                number_of_rates: document.getElementById("acrCustomerReviewText")
                    .textContent.split(" ")[0]
                    .replaceAll(",","")
                    .replaceAll("." , ""),
            })
        })
            .then(response => {
                return response.json();
            })
            .then(data => {

                if (data.errors)
                    document.getElementsByClassName("danger-message")[0].style.display="flex"
                else{

                    document.getElementsByClassName("success-message")[0].innerHTML=
                        `<p> ${ data.message} </p> <p>You can check it from the following link   </p> <p><a href='${data.link} '> ${data.link} </a></p>`
                    document.getElementsByClassName("success-message")[0].style.display="flex"
                }

            })
            .catch(error => {
                document.getElementsByClassName("danger-message")[0].style.display="flex"
            });
    })

})


