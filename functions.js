function  product_per_store_price_template(store_id, data){

    var current_store=stores.data[store_id-1];

    return `
    <a target="_blank" href="${current_store.url.replace('product_id', data.key)}">
          <div class="single_store">
                <div class="card bg-c-${current_store.color} order-card">
                    <div class="card-block">
                        <div>
                            <div style="float: left">
                                <img style="  height: 20px;max-height:20px; object-fit: contain" src="${browser.runtime.getURL(`resources/images/stores/${current_store.image}`)}"alt="">
                            </div>
                            <h6 style="width: 50%; float: left; padding-left: 10px">${current_store.name}</h6>
                        </div>

                        <h2 style="width: 100%; margin-top: "><i class="fa fa-cart-plus f-left"></i><span>${current_store.currency} ${data.current_price.toLocaleString() }</span></h2>
                      
                      <div>
                        <p class="prices">
                            <svg  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="red" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4.5V19a1 1 0 0 0 1 1h15M7 14l4-4 4 4 5-5m0 0h-3.207M20 9v3.207"/>
                            </svg>
                            <span class="f-right highest">${current_store.currency} ${data.highest_price.toLocaleString()}</span>
                        </p>
                         <p class="prices ">
                             <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                               <path stroke="green" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4.5V19a1 1 0 0 0 1 1h15M7 10l4 4 4-4 5 5m0 0h-3.207M20 15v-3.207"/>
                            </svg>
                            <span class="f-right lowest">${current_store.currency} ${data.lowest_price.toLocaleString()}</span>
                        </p>
                      </div>
                        <div class="seller">Seller<span class="f-right">${data.seller}</span></h6>
                    </div>
                </div>
            </div>
        </div>
    </a>
`
}

function add_notification_to_page(type , message){
    document.body.insertAdjacentHTML("beforebegin" , `
        <div onclick="this.remove()" 
        class="notification_message ${type}-message"        >
            ${message}
        </div>
    `)
}


function insert_chart_into_dom(series){
    //Generate the apex chart
    var options = {
        chart: {
            type:'area',
            height:300
        },
        theme:{
            palette: "pallet1"
        },
        series: series,
        xaxis: {
            type:'datetime',
            categories:[
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ],
            labels:{
                style:{
                    fontFamily:'inherit'
                }
            }
        },
        yaxis: {
            labels: {
                formatter: function (val, index) {
                    return val.toLocaleString('en-US');
                }
            }
        },
        stroke : {
            curve:'smooth'
        },

        dataLabels: {
            enabled: false,
        },
        legend: {
            position: 'top'
        }
    }

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

}

function  get_global_form(){

    return` <div class="form_background">
                   <div class="form_field">
                       <label> Product Name </label>
                       <input name="product_name" id="product_name" type="text" value="${product.name}">
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
                    <button  id="submit_discount_form"> Save </button>           
                </div>
`



}



function get_numbers_with_dots(string) {
    return string.replace(/[^0-9.]/g, '');
}