// class Emax extends Product {
//
//     constructor() {
//         super();
//     }
//
//     get_dom_product_details(){
//         setTimeout(() => {
//             this.name=document.getElementsByTagName('title')[0].innerText;
//             let meta_elements= document.getElementsByTagName('meta');
//
//             Array.from(meta_elements).forEach((element) => {
//                 switch (element.getAttribute('property')) {
//                     case 'og:title': this.name= element.getAttribute('content'); break;
//                     case 'og:image': this.image= element.getAttribute('content'); break;
//                     case 'product:price:amount': this.price= element.getAttribute('content'); break;
//                     case 'product:availability': this.in_stock = element.getAttribute('content') === 'in stock'; break;
//                 }
//             })
//
//             console.log(this.name)
//         }, 1000);
//     }
//
//     populate_dom_with_charts() {
//
//         setTimeout(() => {
//             document.body.insertAdjacentHTML("afterbegin" , `<div id='gray_layout'
//                 onclick="if (event.target === event.currentTarget) this.classList.remove('show_flex')">${get_global_form()}</div>`)
//
//             document.body.querySelector("h1").parentElement
//                 .insertAdjacentHTML('afterend',
//                     `<div style="width:100%"> <img id="discount_bandit_show" src="${browser.runtime.getURL(`resources/images/bandit.png`)}"
//                             onclick='document.body.querySelector("#gray_layout").classList.add("show_flex")'>
//                            </div>`)
//
//             var main_body=document.body.querySelector("#prod-shppng_QA")
//             main_body.insertAdjacentHTML("afterend" , "<div id='chart'></div>")
//             main_body.insertAdjacentHTML("afterend" , "<div id='all_stores_cards'></div>")
//         }, 1000);
//
//     }
//
//     async get_product_data() {
//
//         super.get_product_data().then(data => {
//          //
//          //    insert_chart_into_dom(data.series)
//             //add highest and lowest prices
//          //    document.querySelector(".priceNow[data-qa='div-price-now']").insertAdjacentHTML("beforebegin" ,
//          //        `<div class="lowest_price" > Lowest Price ${data.prices[data.current_store_id].lowest_price.toLocaleString()}</div>
//          // <div class="highest_price" "> Highest Price ${data.prices[data.current_store_id].highest_price.toLocaleString()}</div>`
//          //    )
//          //
//          //    //add open in Discount Bandit
//          //    document.querySelector("[data-qa^='pdp-quantity-']").insertAdjacentHTML("afterend" ,
//          //        `<a class="discount_bandit_button"
//          //             target="_blank"
//          //             href="${this.url}/products/${data.product_id}">
//          //             <img  src="${browser.runtime.getURL(`resources/images/bandit.png`)}"
//          //                style="max-width: 20px"
//          //             >
//          //             Discount Bandit</a>`
//          //    )
//          //    //add other stores available.
//          //    var stores_elements=document.getElementById("all_stores_cards");
//          //    for (const [store, value] of Object.entries(data.prices))
//          //        if (store != data.current_store_id)
//          //            stores_elements.insertAdjacentHTML("afterbegin", product_per_store_price_template(store,value))
//         })
//     }
//
// }
//
// if ( current_url.host.includes('emaxme.') && current_url.pathname.endsWith(".html")  ){
//     var product= new Emax()
//     product.get_storage_data().then(r => {})
// }
