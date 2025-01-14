class Amazon extends Product {
    constructor() {


        super();
    }

    get_dom_product_details(){
        this.name=  document.getElementById("productTitle").textContent.trim()
        this.price= document.getElementById("twister-plus-price-data-price")?.value ?? 0
        this.image= document.querySelector(".imgTagWrapper img").src
        this.number_of_rates=document.getElementById("acrCustomerReviewText")
            ?.textContent.split(" ")[0]
            .replaceAll(",","")
            .replaceAll("." , "")
            .replaceAll("(" , "")
            .replaceAll(")" , "")

        console.log(this.number_of_rates)

    }

    populate_dom_with_charts() {

        document.body.insertAdjacentHTML("afterbegin" , `<div id='gray_layout' 
    onclick="if (event.target === event.currentTarget) this.classList.remove('show_flex')">${get_global_form()}</div>`)

        document.body.querySelector("#title_feature_div")
            .insertAdjacentHTML('afterend', `<img id="discount_bandit_show"  
        src="${browser.runtime.getURL(`resources/images/bandit.png`)}"
        onclick='document.body.querySelector("#gray_layout").classList.add("show_flex")'>`)

        //add the chart and stores
        var main_body=document.body.querySelector("#ppd")
        main_body.insertAdjacentHTML("afterend" , "<div id='chart'></div>")
        main_body.insertAdjacentHTML("afterend" , "<div id='all_stores_cards'></div>")
    }

    async get_product_data() {

        super.get_product_data().then(data => {
            if (!data)
                return;
            
            insert_chart_into_dom(data.series)

            //add highest and lowest prices
            document.getElementById("buybox")
                .insertAdjacentHTML("afterbegin" ,
                `<div class="lowest_price" > Lowest Price ${data.prices[data.current_store_id].lowest_price.toLocaleString()}</div>
                      <div class="highest_price" "> Highest Price ${data.prices[data.current_store_id].highest_price.toLocaleString()}</div>`
                )

            //add open in Discount Bandit
            document.getElementById("submit.buy-now").insertAdjacentHTML("afterend" ,
                `<a class="discount_bandit_button"
                         target="_blank"
                         href="${this.url}/products/${data.product_id}">
                            <img  src="${browser.runtime.getURL(`resources/images/bandit.png`)}"
                                  style="max-width: 20px" >
                            Discount Bandit
                    </a>`)

            //add other stores available.
            var stores_elements=document.getElementById("all_stores_cards");

            for (const [store, value] of Object.entries(data.prices))
                if (store != data.current_store_id)
                    stores_elements.insertAdjacentHTML("afterbegin", product_per_store_price_template(store,value))
        })
    }

}

//todo make product call class name dynamically
if ( current_url.host.includes('amazon.') && (current_url.pathname.includes("/dp/") || current_url.pathname.includes("/gp/product") ) ){
    var product= new Amazon()
    product.get_storage_data().then(r => {})
}


