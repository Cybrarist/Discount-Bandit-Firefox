class Product {
    name;
    image;
    price;
    rate;
    number_of_rates;
    seller;
    url;
    update_product;
    in_stock=true;
    #token;

    storage_promise;

    constructor() {
        this.storage_promise= this.get_storage_data()
    }

    /**
     * urls on the server api.
     * @returns {string}
     */

    update_url () {
        return `${this.url}/api/products/update`
    };
    get_product () {
        return `${this.url}/api/products/get`
    };
    create_product () {
        return `${this.url}/api/products/create`
    };

    /**
     * get the data saved in the browser
     * @returns {Promise<void>}
     */

    async get_storage_data(){
        var result= await  browser.storage.sync.get()
        this.#token= result.token;
        this.url=result.url;
        this.update_product=result.update_product;
    }



    async  update_server_product(){
        await this.storage_promise

        if (!this.update_product)
            return

         fetch(this.update_url() ,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.#token}`,
            },
            body:JSON.stringify({
                url : window.location.href,
                current_price: self.price
            })
        })
        .catch(error => {
            // Handle errors
            console.log("Error:", error);
        });
    }

    async get_product_data(){
        await this.storage_promise

        return fetch(this.get_product() ,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.#token}`,
            },
            body:JSON.stringify({
                url : window.location.href
            })

        })
            .then((response) => {
                return response.json();
            })
            .catch(error => {
                // product doesn't exist in the system
            });
    }

    submit_form(){
        document.body.querySelector("#gray_layout").classList.add("show_flex")

        fetch(this.create_product(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.#token}`,
            },
            body: JSON.stringify({
                url: window.location.href ,
                name: this.name,
                image: this.image,
                notify_price: document.getElementById("notify_price").value,
                official_seller: document.getElementById("official_seller").checked,
                favourite: document.getElementById("favourite").checked,
                stock_available: document.getElementById("stock_available").checked,
                lowest_within: document.getElementById("lowest_within").value,
                number_of_rates:this.number_of_rates,
                price:this?.price ?? 0,
            })
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.errors)
                    add_notification_to_page('danger' , 'Something wrong Happened')
                else
                    add_notification_to_page('success' ,
                        `<p> ${ data.message}</p>
                                <p>You can check it from the following link   </p>
                                <p>
                                    <a href='${data.link} '> ${data.link} </a>
                                </p>`
                     )

            })
            .catch(error => {
                add_notification_to_page('danger' , 'Something wrong Happened here')
            });
    }

    get_dom_product_details(){}

    populate_dom_with_charts(){}


    refresh_dom_all(){
        product.get_dom_product_details()
        product.update_server_product().then(response => {
            console.log("updated server")
        })
        document
            .querySelectorAll("#gray_layout , #discount_bandit_show, #chart , #all_stores_cards")
            ?.forEach((elem)=>{
                elem.remove()
            })

        product.populate_dom_with_charts()

        setTimeout(() => {
            document.getElementById("submit_discount_form")
                .addEventListener("click" , function (){
                    product.submit_form()
                })
        }, 2000);

        product.get_product_data().then(response => {

        })
    }

}




let previousUrl = null;
const observer = new MutationObserver(function(mutations) {

    current_url=new URL(location.href)

    if (current_url.pathname !== previousUrl?.pathname) {
        previousUrl = new URL(location.href);
        product.refresh_dom_all()
    }
});

const config = {subtree: true, childList: true};
observer.observe(document, config);




//share the url across all classes
var current_url = new URL(window.location.href);
