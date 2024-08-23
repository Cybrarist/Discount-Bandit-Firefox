if (window.location.href.includes('noon.') ){
    class Noon extends Product {

        constructor() {
            super();
        }

        get_dom_product_details(){

            document.querySelectorAll("[type='application/ld+json']").forEach((elem)=>{
                if(elem.textContent.trim().includes('"@type":"Product"')){
                    var json_string= JSON.parse(elem.textContent);
                    this.price=json_string.offers[0].price;
                    this.image=  json_string.image[0];
                    this.number_of_rates=json_string.aggregateRating.reviewCount;
                }

            })
            this.name= document.querySelector("title").textContent.trim().split('|' )[0]
        }

        populate_dom_with_charts() {

            document.body.insertAdjacentHTML("afterbegin" , `<div id='gray_layout' 
        onclick="if (event.target === event.currentTarget) this.classList.remove('show_flex')">${get_global_form()}</div>`)

            document.body.querySelector("h1")
                .insertAdjacentHTML('afterend', `<img id="discount_bandit_show"  
            src="${browser.runtime.getURL(`resources/images/bandit.png`)}"
            onclick='document.body.querySelector("#gray_layout").classList.add("show_flex")'>`)

            //add the chart and stores
            var main_body=document.body.querySelector(".noGap")
            main_body.insertAdjacentHTML("afterend" , "<div id='chart'></div>")
            main_body.insertAdjacentHTML("afterend" , "<div id='all_stores_cards'></div>")
        }

        async get_product_data() {

            super.get_product_data().then(data => {
             //
                insert_chart_into_dom(data.series)
                //add highest and lowest prices
                document.querySelector(".priceNow[data-qa='div-price-now']").insertAdjacentHTML("beforebegin" ,
                    `<div class="lowest_price" > Lowest Price ${data.prices[data.current_store_id].lowest_price.toLocaleString()}</div>
             <div class="max_price" "> Highest Price ${data.prices[data.current_store_id].highest_price.toLocaleString()}</div>`
                )

                //add open in Discount Bandit
                document.querySelector("[data-qa^='pdp-quantity-']").insertAdjacentHTML("afterend" ,
                    `<a class="discount_bandit_button"
                         target="_blank"
                         href="${this.url}/products/${data.product_id}">
                         <img  src="${browser.runtime.getURL(`resources/images/bandit.png`)}"
                            style="max-width: 20px"
                         >
                         Discount Bandit</a>`
                )
                //add other stores available.
                var stores_elements=document.getElementById("all_stores_cards");
                for (const [store, value] of Object.entries(data.prices))
                    if (store != data.current_store_id)
                        stores_elements.insertAdjacentHTML("afterbegin", product_per_store_price_template(store,value))
            })
        }

    }

    var product= new Noon()

    product.get_storage_data().then(r => {})
}
