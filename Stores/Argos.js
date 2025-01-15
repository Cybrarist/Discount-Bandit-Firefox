if (window.location.href.includes('argos.co.uk') ){

    class Argos extends Product {
        constructor() {
            super();
        }

        get_dom_product_details(){
            this.name=  document.querySelectorAll('[data-test="product-title"]')[0].textContent.trim()
            this.price= document.querySelectorAll('[data-test="product-price-primary"]')[0].getAttribute('content')
            this.image= document.querySelectorAll('[data-test="component-media-gallery-thumbnails_thumbnail-0"] img')[0].src
            this.number_of_rates= document.querySelectorAll('[itemProp="ratingCount"]')[0].textContent
        }

        populate_dom_with_charts() {

            document.body.insertAdjacentHTML("afterbegin" , `<div id='gray_layout' 
                onclick="if (event.target === event.currentTarget) this.classList.remove('show_flex')">${get_global_form()}</div>`)



            //add the chart and stores
            setTimeout(() => {
                document.querySelectorAll('[data-test="product-name"]')[0]
                    .insertAdjacentHTML('afterend', `<img id="discount_bandit_show"  
                        src="${browser.runtime.getURL(`resources/images/bandit.png`)}"
                        onclick='document.body.querySelector("#gray_layout").classList.add("show_flex")'>`)


                var main_body=document.getElementById("pdp-description")
                main_body.insertAdjacentHTML("beforebegin" , "<div id='all_stores_cards'></div>")
                main_body.insertAdjacentHTML("beforebegin" , "<div id='chart'></div>")
            }, 2000);


        }

        async get_product_data() {

            super.get_product_data().then(data => {

                if (data){
                    //add highest and lowest prices
                    document.querySelectorAll("[data-test='product-price-primary']")[0]
                        .insertAdjacentHTML("afterbegin" ,
                            `<div class="lowest_price" > Lowest Price ${data.prices[data.current_store_id].lowest_price.toLocaleString()}</div>
                 <div class="highest_price" "> Highest Price ${data.prices[data.current_store_id].highest_price.toLocaleString()}</div>`
                        )


                    //add open in Discount Bandit
                    document.querySelectorAll("[data-test='add-trolley-button-wrapper']")[0]
                        .insertAdjacentHTML("afterend" ,
                            `<a class="discount_bandit_button"
                         target="_blank"
                         href="${this.url}/products/${data.product_id}">
                         <img  src="${browser.runtime.getURL(`resources/images/bandit.png`)}"
                            style="max-width: 20px"
                         >
                         Discount Bandit</a>`
                        )
                    setTimeout(() => {

                        if (!data)
                            return;
                        insert_chart_into_dom(data.series)

                        var stores_elements=document.getElementById("all_stores_cards");
                        for (const [store, value] of Object.entries(data.prices))
                            if (store != data.current_store_id)
                                stores_elements.insertAdjacentHTML("afterbegin", product_per_store_price_template(store,value))

                    }, 3000);

                }




                //add other stores available.
                })
        }

    }

    var product= new Argos()

    product.get_storage_data().then(r => {})
}
