if (window.location.href.includes('ebay.') ){

    class Ebay extends Product {
        constructor() {
            super();
        }

        get_dom_product_details(){
            this.name = document.querySelector('[data-testid="x-item-title"]').textContent.trim()
            this.price= document.querySelector(".x-price-primary span").textContent.trim().replace(/US|\$/g,"").trim()
            this.image= document.querySelector(".ux-image-carousel-item.image-treatment.active.image img").src
            this.number_of_rates=0
        }

        populate_dom_with_charts() {

            document.body.insertAdjacentHTML("afterbegin" , `<div id='gray_layout' 
        onclick="if (event.target === event.currentTarget) this.classList.remove('show_flex')">${get_global_form()}</div>`)

            document.querySelector('[data-testid="x-item-title"]')
                .insertAdjacentHTML('afterend', `<img id="discount_bandit_show"  
            src="${browser.runtime.getURL(`resources/images/bandit.png`)}"
            onclick='document.body.querySelector("#gray_layout").classList.add("show_flex")'>`)

            //add the chart and stores
            var main_body=document.body.querySelector("[data-testid='x-evo-atf-left-river']")
            main_body.insertAdjacentHTML("afterend" , "<div id='chart'></div>")
            main_body.insertAdjacentHTML("afterend" , "<div id='all_stores_cards'></div>")
        }

        async get_product_data() {

            super.get_product_data().then(data => {
                if (!data)
                    return;

                insert_chart_into_dom(data.series)
                //add highest and lowest prices
                document.querySelector('[data-testid="x-price-primary"]')
                    .insertAdjacentHTML("afterbegin" ,
                    `<div class="lowest_price" > Lowest Price ${data.prices[data.current_store_id]?.lowest_price.toLocaleString()}</div>
             <div class="highest_price" "> Highest Price ${data.prices[data.current_store_id]?.highest_price.toLocaleString()}</div>`
                )

                //add open in Discount Bandit
                document.querySelector("[data-testid='x-buybox-cta']")
                    .insertAdjacentHTML("afterend" ,
                    `<a class="discount_bandit_button"
                           style="margin-top: 3vh"
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

    var product= new Ebay()

    product.get_storage_data().then(r => {})
}
