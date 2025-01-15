// class Fnac extends Product {
//     constructor() {
//         super();
//     }
//
//     get_dom_product_details(){
//         this.name=  document.querySelector(".f-productHeader__heading").textContent.trim()
//         this.price= get_numbers_only_with_comma(document.querySelector(".userPrice")?.textContent.trim() ?? 0).replace(',' ,'.')
//         this.image= document.querySelector(".f-productMedias__viewItem--main").src
//
//         this.number_of_rates=document.querySelector(".f-star-score")
//             ?.textContent
//     }
//
//     populate_dom_with_charts() {
//
//         document.body.insertAdjacentHTML("afterbegin" , `<div id='gray_layout'
//     onclick="if (event.target === event.currentTarget) this.classList.remove('show_flex')">${get_global_form()}</div>`)
//
//         document.body.querySelector(".f-productHeader-reviewContainer")
//             .insertAdjacentHTML('afterend', `<img id="discount_bandit_show"
//         src="${browser.runtime.getURL(`resources/images/bandit.png`)}"
//         onclick='document.body.querySelector("#gray_layout").classList.add("show_flex")'>`)
//
//         //add the chart and stores
//         var main_body=document.body.querySelector(".f-productLabels")
//         main_body.insertAdjacentHTML("afterend" , "<div id='chart'></div>")
//         main_body.insertAdjacentHTML("afterend" , "<div id='all_stores_cards'></div>")
//     }
//
//     async get_product_data() {
//
//         super.get_product_data().then(data => {
//             if (!data)
//                 return;
//
//             insert_chart_into_dom(data.series)
//
//             //add highest and lowest prices
//             document.getElementById("buybox")
//                 .insertAdjacentHTML("afterbegin" ,
//                 `<div class="lowest_price" > Lowest Price ${data.prices[data.current_store_id].lowest_price.toLocaleString()}</div>
//                       <div class="highest_price" "> Highest Price ${data.prices[data.current_store_id].highest_price.toLocaleString()}</div>`
//                 )
//
//             //add open in Discount Bandit
//             document.getElementById("submit.buy-now").insertAdjacentHTML("afterend" ,
//                 `<a class="discount_bandit_button"
//                          target="_blank"
//                          href="${this.url}/products/${data.product_id}">
//                             <img  src="${browser.runtime.getURL(`resources/images/bandit.png`)}"
//                                   style="max-width: 20px" >
//                             Discount Bandit
//                     </a>`)
//
//             //add other stores available.
//             var stores_elements=document.getElementById("all_stores_cards");
//
//             for (const [store, value] of Object.entries(data.prices))
//                 if (store != data.current_store_id)
//                     stores_elements.insertAdjacentHTML("afterbegin", product_per_store_price_template(store,value))
//         })
//     }
//
// }
//
// //todo make product call class name dynamically
// if ( current_url.host.includes('fnac.')){
//
//     var product= new Fnac()
//     product.get_storage_data().then(r => {})
// }
//
//
