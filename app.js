
/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}


//===================================================================### Vue ###===================================================================//
 currentShoppingBag = new Array();
 newproductWomen= [];
 newproductMan = [];
 newproductjewelery = [];
 currentQuantitys = [];
 currentId = 21;
      
window.onload = function() {

  for (let index = 0; index <= 20; index++) {
    var obj = 
      {
            "id": index,
            "quantity": 10,
        }
      
    currentQuantitys.push(obj)
    
  }
  console.log(currentQuantitys)
}


//===================================================================¤¤ Component/tamplet Homepage ¤¤===================================================================//

Vue.component('showdata', {
created(){
  this.getData()
},
data: function() {
return {
 shop:[],
  }
},
template: '<div>' +
'<div class="shopping-item-card column" v-for="item in shop"> '+
'<img :src = "item.image" class="shopping-item-image">'+
'<div class="shopping-content">'+
'<h2 class="shopping-item-title">{{ item.title }}</h2>'+
'<p class="shopping-item-price">{{ item.price}}$</p>'+
'<button class="shopping-item-add" @click="addProductToShoppingBag(shop, item.id)">Add to cart</button>'+
'</div></div></div>'
,

methods: {
  getData: function(){
    axios.get('https://fakestoreapi.com/products?limit=3')
    .then(response => {
      for (let index = 0; index < response.data.length; index++) {
        this.shop.push(response.data[index])
      }
    })
  },
  addProductToShoppingBag: function(items, id){
    
    currentShoppingBag.push(items[id-1])
    currentQuantitys[id].quantity -= 1;
    this.$root.$refs.changePageMethod.updateCart();
  },
}

})
//===================================================================¤¤ Component/tamplet Homepage ends here ¤¤===================================================================//

//===================================================================¤¤ Component/tamplet AddProduct starts here ¤¤===================================================================//

Vue.component('showaddnewproduct', {

  created(){
    this.$root.$refs.showaddnewproduct = this;
  },
  updated(){
    this.$root.$refs.showaddnewproduct = this;
  },

  data: function() {
    return {
      id: 0,
      title: "",
      price: 0,
      description: "",
      category: "",
      quantity: 1,
    }

  },
    
  template: 
  
  '<div>'+
  '<div class="container addproduct">'+
  '<form>'+
  '<label for="name">Product name</label>'+
  '<input type="text" id="name" name="name" placeholder="Product name" v-model="title">'+
  '<label for="price">Price</label>'+
  '<input type="text" id="Price" name="price" placeholder="Product price" v-model="price">'+
  '<label for="quantity">Add quantity</label>'+
  '<input type="text" id="quantity" name="quantity" placeholder="quantity" v-model="quantity">'+
  '<label for="country">Category</label>'+
  '<select v-model="category"> '+
  '<option value="Mens clothing">Men&apos;s clothing</option>'+
  '<option value="Womens clothing">Women s clothing</option> '+
  '<option value="Jewelery">Jewelery</option>'+
  '</select>'+
  '<label for="subject">Product information</label>'+
  '<textarea id="subject" name="subject" placeholder="Info . . . " style="height:200px" v-model="description"></textarea>'+
  '<a @click="addproduct()">Add product </a>'+
  '</form>'+     
  '</div>'+
  '</div>',

  methods: {

    //------------------------------------Ny product array!
    addproduct: function(){
      
     var newproduct = [
    {
          "id": currentId,//Automatiskt id som inte finns
          "title": this.title,
          "price": parseInt(this.price),
          "description": this.description,
          "category": this.category,
          "image": "https://picsum.photos/200/300",
          "rating": {
              "rate": 0,
              "count": 0}
      }]

    

      if(this.category === "Mens clothing"){
        newproductMan.push(newproduct);
      }
      else if(this.category === "Womens clothing"){
        newproductWomen.push(newproduct);
      }
      else if(this.category === "Jewelery"){
        newproductjewelery.push(newproduct);
      }
      var obj = 
      {
            "id": currentId,
            "quantity": parseInt(this.quantity),
        }
      currentQuantitys.push(obj)
      currentId ++;

    }}

    
  
  });


//===================================================================¤¤ Component/tamplet AddProduct ends here ¤¤===================================================================//

//===================================================================¤¤ Component/tamplet Products in store ¤¤===================================================================//


Vue.component('showitems', {

created(){
  this.$root.$refs.showitems = this;
},
updated(){
  this.$root.$refs.showitems = this;
},


data: function(){
  return {
    shopitems:[],
  }
},

template: 

'<div>'+
'<div class="column1"  v-for="item in shopitems">'+
'<div :id="item.id" class="card1"> '+
'<a @click="showProduct(shopitems,item.id);">'+
'<img :src = "item.image" class="shopitemImg">'+
'</a>'+
'<h4>{{ item.title }}</h4>'+
'<p >{{ item.price }}$</p>'+
'</div>'+
'</div>'+
'</div>'
,

methods: {
  getItems: function(url, name){
    axios.get(url)
    .then(response => {

      this.shopitems=[];

      for (let index = 0; index < response.data.length; index++) {
        this.shopitems.push(response.data[index]);
        
      }
      if(name === "men's clothing" ){ this.addLocalClothing(newproductMan)}
      else if(name ==="women's clothing"){this.addLocalClothing(newproductWomen)}
      else if(name === "jewelery"){this.addLocalClothing(newproductjewelery)}
    })

  },
  showProduct: function(items,id){
    
    this.$root.$refs.changePageMethod.changePage(5,items,id);
  }, 
  addLocalClothing: function(array){
  
    for (let index = 0; index < array.length; index++) {
        this.shopitems.splice.apply(this.shopitems, [index, 0].concat(array[index]))
    }
  }
}
})
//===================================================================¤¤ Component/tamplet Products in store ends here ¤¤===================================================================//

//===================================================================¤¤ Component/tamplet thx for order ¤¤===================================================================//
Vue.component('showthxfororder', {
  template: 
  
  '<div>'+
  '<div class="wrapper-2">'+
  '<h1>Thanks for your order</h1>'+
  '<p>We have received your order and will be in contact shortly.</p>'+
  '<a href="/"><button class="go-home">go home</button></a>'+
  '</div>'+
  '<div class="footer-like">'+
  '<p>Problem? Contact us by email<a> Info@perwear.io</a></p>'+
  '</div>'+
  '</div>'
  ,
    
    
  })
  //===================================================================¤¤ Component/tamplet thx for order ends ¤¤===================================================================//

//===================================================================¤¤ Component/tamplet specific product and information ¤¤===================================================================//

Vue.component('showproduct', {

  created(){
    this.$root.$refs.showproduct = this;
  },
  updated(){
    this.$root.$refs.showproduct = this;
  },
  
  
  data: function(){
    return {
      productitems:[],
    
      quantity: 0,
    }
  },
  
  template: 
  
  '<div>'+
  '<div class="main" v-for = "item in productitems" >'+
  '<h2>{{ item.title }}</h2> '+
  '<h5>{{ item.description }}</h5>'+
  ' <div class="fakeimg"><img :src = "item.image" ></div>'+
  '<p> items left:  {{ quantity }} </p>'+
  '<div class="recipes_header_summary">'+
  '<div class="flex-horiz-container">'+
  '<div class="selector">'+
  '<h3>Pris {{ item.price}}$</h3>'+
  '<p>Välj storlek</p>'+
  '<select id="select">'+
  '<option value="0">XS</option>'+
  '<option value="1">S</option>'+
  '<option value="2">M</option>'+
  '<option value="3">L</option>'+
  ' <option value="4">XL</option>'+
   '</select>'+     
  ' </div>'+
 '<p><button v-if="quantity > 0" @click="addProductToShoppingBag(productitems, item.id), quantity -= 1">Add to cart</button></p>'+
'</div>'+
'</div>'+
'</div>'+
'</div>',

  methods: {
    getProduct: function(items,id){
   
      this.productitems=[];
      for (let index = 0; index < items.length; index++) {

        if(id === items[index].id){
          this.productitems.push(items[index])
          for (let index = 0; index < currentQuantitys.length; index++) {
            if(currentQuantitys[index].id === id){
              this.quantity = currentQuantitys[index].quantity
            }
          }
        }
      }
      },
      addProductToShoppingBag: function(items, id){
        currentShoppingBag.push(items[0])
        this.$root.$refs.changePageMethod.updateCart();
        currentQuantitys[id].quantity = this.quantity-1

      }
    },

   
  });
//=======================================================¤¤ Component/tamplet specific product and information ends here ¤¤===================================================================//


//===================================================================¤¤ Component/tamplet items in shoppingBag ¤¤===================================================================//
Vue.component('showshoppingbag', {
  created(){
    this.$root.$refs.showshoppingbag = this;
  },
  updated(){
    this.$root.$refs.showshoppingbag = this;
  },
  data: function(){
    return{
      payment: false,
      shoppingBag: [],
       tax: 0.25,
          promotions: [
            {
              code: "SUMMER",
              discount: "50%"
            },
            {
              code: "AUTUMN",
              discount: "40%"
            },
            {
              code: "WINTER",
              discount: "30%"
            }
          ],
          promoCode: "",
          discount: 0,
          shippingCost: 0
        }
    
  },
  computed: {
        itemCount: function() {
          var count = 0;
    
          for (var i = 0; i < this.shoppingBag.length; i++) {
            count += parseInt(this.shoppingBag[i].quantity) || 0;
          }
          return count;
        },
        subTotal: function() {
          var subTotal = 0;
        this.shippingCost;
          for (var i = 0; i < this.shoppingBag.length; i++) {
            subTotal +=  this.shoppingBag[i].price;
          }
          return subTotal = subTotal+parseInt(this.shippingCost) || 0;
        },
        discountPrice: function() {
          return this.subTotal * this.discount / 100;
        },
        totalPrice: function() {
          return this.subTotal - this.discountPrice ;
        }
      },
      filters: {
        currencyFormatted: function(value) {
          return Number(value).toLocaleString("US", {
            style: "currency",
            currency: "usd"
          });
        }
      },
template:
'<div>'+
'<section class="containerCart">'+
'<div v-if="shoppingBag.length > 0">'+
'<ul class="productsCart">'+
'<li class="row" v-for="(product, index) in shoppingBag">'+
'<div class="col left">'+
'<div class="thumbnail">'+
'<a href="#">'+
'<img class="imgCart" :src="product.image" :alt="product.title" />'+
'</a>'+
'</div>'+
'<div class="detail">'+
'<div class="name"><a href="#">{{ product.title }}</a></div>'+
'<div class="price">{{ product.price}}$</div>'+
'</div>'+
'</div>'+
'<div class="col right">'+
'<div class="quantity">'+
'<input type="number" class="quantity" step="1" :value="product.quantity" @input="updateQuantity(index, $event)" @blur="checkQuantity(index, $event)" />'+
'</div>'+
'<div class="removeItem">'+
'<svg @click="removeItem(index, product.id)" version="1.1" class="close" xmlns="//www.w3.org/2000/svg" xmlns:xlink="//www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 60 60" enable-background="new 0 0 60 60" xml:space="preserve"><polygon points="38.936,23.561 36.814,21.439 30.562,27.691 24.311,21.439 22.189,23.561 28.441,29.812 22.189,36.064 24.311,38.186 30.562,31.934 36.814,38.186 38.936,36.064 32.684,29.812"></polygon></svg>'+
'</div>'+
'</div>'+
'</li>'+
'</ul>'+
'</div>'+
'<div v-else class="empty-product">'+
'<h3>There are no products in your shopping cart</h3>'+
'<button  @click="homepage()"><i class="fas fa-arrow-circle-left"></i></button>'+
'</div>'+
'</section>'+
'<section class="containerCart" v-if="shoppingBag.length > 0">'+
'<div class="promotion" v-if="payment">'+
'<label for="promo-code">Discount?</label>'+
'<input placeholder="Discount code" type="text" id="promo-code" v-model="promoCode" /> <button type="button" @click="checkPromoCode"></button>'+
'</div>'+
'<div class="summaryCheckOut">'+
'<ul>'+
'<li>Price: <span>{{ subTotal | currencyFormatted }}</span></li>'+
'<li v-if="discount > 0">Discount: <span>{{ discountPrice | currencyFormatted }}</span></li>'+
'<li v-if="payment">Shipping Cost: <span> {{ shippingCost | currencyFormatted }} </span> </li>'+
'<li>Tax: <span>{{ tax*totalPrice  | currencyFormatted }}</span></li>'+
'<li class="total">Total: <span>{{ totalPrice | currencyFormatted }}</span></li>'+
'</ul>'+
'</div>'+
'<div class="checkout">'+
'<div v-if="!payment">'+
'<button @click="paymentpage" type="button"><i class="fas fa-arrow-circle-right"></i></button>'+
'</div>'+
'<div v-else>'+
'<button @click="paymentsuccess" type="button"><span>Pay <i class="fas fa-arrow-circle-right"></i></span></button>'+
'</div>'+
'</div>'+
'</section>'+
'</div>'
,
methods: {
  getShoppingBag: function(){
    this.shoppingBag= [];
    for (let index = 0; index < currentShoppingBag.length; index++) {
      this.shoppingBag.push(currentShoppingBag[index])
    }
  },
  homepage: function(){
    this.payment = false;
    this.$root.$refs.changePageMethod.changePage(1)
  },
  paymentpage: function(){
    
    this.payment = true;
    this.$root.$refs.changePageMethod.changePage(7)
  },
  paymentsuccess: function(){
    
    this.payment = false;
    this.$root.$refs.changePageMethod.changePage(8)
    
  },
  getShippingPrice: function(value)
  {
    this.shippingCost = value;

  },
  removeItem: function(index, id) {
      
        this.shoppingBag.splice(index, 1);
        currentShoppingBag = this.shoppingBag;
        currentQuantitys[id].quantity  += 1  
        this.$root.$refs.changePageMethod.updateCart();
        
      },
      checkPromoCode: function() {
        for (var i = 0; i < this.promotions.length; i++) {
          if (this.promoCode === this.promotions[i].code) {
            this.discount = parseFloat(
              this.promotions[i].discount.replace("%", "")
            );
            return;
          }
        }
  
        alert("Sorry, the Promotional code you entered is not valid!");
      }
    },
})

//===================================================================¤¤ Component/tamplet items in shoppingBag ends ¤¤===================================================================//


//===================================================================¤¤ Component/tamplet items in payment  ¤¤===================================================================//

Vue.component('showpaymentstyle', {

  created(){
    this.$root.$refs.showpaymentstyle = this;
  },
  updated(){
    this.$root.$refs.showpaymentstyle = this;
  },
  data: function(){
    return{
          shippingValue: "",
        }
    
  },

template:
 '<div>'+
'<div class="step" id="step2">'+
'<div class="title">'+
'<h1>Customer information</h1>'+
'</div>'+
'</div>'+
'<form id="form" class="topBefore">'+
'<input id="fname" type="text" placeholder="Name">'+
'<input id="lname" type="text" placeholder="Lastname">'+
'<input id="phone" type="tel" placeholder="Phone">'+
'<input id="company" type="text" placeholder="Company">'+
' <input id="adres" type="text" placeholder="Adress">'+
' <input id="city" type="text" placeholder="City">'+
'<input id="zipCode" type="text" placeholder="Zipe-code">'+
'<input id="country" type="text" placeholder="Country">'+
'<input id="email" type="email" placeholder="E-MAIL">'+
'</form>'+
'<div class="step" id="step3">'+
' <div class="title">'+
' <h1>Shipping</h1>'+
'</div>'+
'</div>'+
' <div class="container">'+
' <form class="form cf">'+
'<section class="plan cf" >'+
'<input type="radio" name="radio1" id="free" value="0"  checked @change="shippingFunction($event)"><label class="free-label four col" for="free">Pick up ( FREE )</label>'+
' <input type="radio" name="radio1" id="basic" value="5.99" @change="shippingFunction($event)"><label class="basic-label four col" for="basic">Basic ( 5.99$ )</label>'+
'<input type="radio" name="radio1" id="premium" value="9.99" @change="shippingFunction($event)"><label class="premium-label four col" for="premium">Premium ( 9.99$ )</label>'+
' </section>'+
'</form>'+
'    </div>  '+
'<div class="step" id="step4">'+
'<div class="title">'+
'    <h1>Payment</h1>'+
' </div>'+
'  </div>'+
' <div class="checkout-panel">'+
'<div class="panel-body">'+
'<div class="payment-method">'+
'<label for="card" class="method card">'+
' <div class="card-logos">'+
'<img src="https://designmodo.com/demo/checkout-panel/img/visa_logo.png"/>'+
' <img src="https://designmodo.com/demo/checkout-panel/img/mastercard_logo.png"/>'+
' </div>'+
'<div class="radio-input">'+
'<input id="card" type="radio" name="payment">'+
'</div>'+
'</label>'+
'<label for="paypal" class="method paypal">'+
'<img src="https://designmodo.com/demo/checkout-panel/img/paypal_logo.png"/>'+
' <div class="radio-input">'+
'<input id="paypal" type="radio" name="payment">'+
'</div>'+
'</label>'+
' </div>'+
' <div class="input-fields">'+
'<div class="column-1">'+
'<label for="cardholder">Name</label>'+
'<input type="text" id="cardholder" />'+
'<div class="small-inputs">'+
'<div>'+
'<label for="date">Valid date</label>'+
' <input type="text" id="date"/>'+
'</div>'+
'<div>'+
'<label for="verification">CVV / CVC *</label>'+
'<input type="password" id="verification"/>'+
'  </div>'+
' </div>'+
'  </div>'+
' <div class="column-2">'+
'<label for="cardnumber">Card Number</label>'+
' <input type="password" id="cardnumber"/>'+
' </div>'+
'</div>'+
'</div>'+
' </div>'+
' </div>' 
,

methods:{
  shippingFunction: function(event){
    var data = event.target.value;
    this.$root.$refs.showshoppingbag.getShippingPrice(data);
     }
}

})
//===================================================================¤¤ Component/tamplet items in payment ends ¤¤===================================================================//

//===================================================================¤¤ Fuction to show diffrent templet ¤¤===================================================================//


var changePageMethod = new Vue({
  el: '#wrapper',
  data:{
    homepage: true,
    clothpage: false,
    specific:false,
    payment: false,
    shoppingBag: false,
    txnForOrder: false,
    Menu: true,
    admin: false,
    numCartProduct: 0,
  },
  created(){
    this.$root.$refs.changePageMethod = this;
  },
  updated(){
    this.$root.$refs.changePageMethod = this;
  },

  methods:{
    changePage: function(text,items,id){
      
      switch (text) {
        case 1:
          
          this.homepage = true;
          this.clothpage = false;
          this.specific = false;
          this.payment = false;
          this.shoppingBag = false;
          this.txnForOrder = false;
          this.admin = false;
           break;

        case 2:
          this.homepage = false;
          this.clothpage = true;
          this.specific = false;
          this.payment = false;
          this.shoppingBag = false;
          this.txnForOrder = false;
          this.admin = false;
          var url = "jewelery"
          this.$root.$refs.showitems.getItems(`https://fakestoreapi.com/products/category/jewelery`, url)
          break;
          case 3:
            this.homepage = false;
            this.clothpage = true;
            this.specific = false;
            this.payment = false;
            this.shoppingBag = false;
            this.txnForOrder = false;
            this.admin = false;
            var url = "men's clothing"
            this.$root.$refs.showitems.getItems(`https://fakestoreapi.com/products/category/${url}`, url)
            break;
            case 4:
              this.homepage = false;
              this.clothpage = true;
              this.specific = false;
              this.payment = false;
              this.shoppingBag = false;
              this.txnForOrder = false;
              this.admin = false;
              var url = "women's clothing"
              this.$root.$refs.showitems.getItems(`https://fakestoreapi.com/products/category/${url}`,url)
              break;
              case 5:
                this.homepage = false;
                this.clothpage = false;
                this.specific = true;
                this.payment = false;
                this.shoppingBag = false;
                this.txnForOrder = false;
                this.admin = false;
                this.$root.$refs.showproduct.getProduct(items,id)
                break;
                case 6:
                  this.homepage = false;
                  this.clothpage = false;
                  this.specific = false;
                  this.payment = false;
                  this.txnForOrder = false;
                  this.shoppingBag = true;
                  this.admin = false;
                  this.$root.$refs.showshoppingbag.getShoppingBag();
                  break;  
                  case 7:
                  this.homepage = false;
                  this.clothpage = false;
                  this.specific = false;
                  this.payment = true;
                  this.shoppingBag = true;
                  this.txnForOrder = false;
                  this.admin = false;
                  window.scrollTo(0,0);
                  break;  
                  case 8:
                    this.homepage = false;
                    this.clothpage = false;
                    this.specific = false;
                    this.payment = false;
                    this.shoppingBag = false;
                    this.txnForOrder = true;
                    this.Menu = false;
                    this.admin = false;
                    break;  
                    case 9:
                      this.homepage = false;
                      this.clothpage = false;
                      this.specific = false;
                      this.payment = false;
                      this.shoppingBag = false;
                      this.txnForOrder = false;
                      this.Menu = true;
                      this.admin = true;
                      break;  
                   
        default:
          break;
      }
    },
     updateCart: function(){
      this.numCartProduct = currentShoppingBag.length;
      }
  }
})
 
  
//===================================================================¤¤ Fuction to show diffrent templet ends here ¤¤===================================================================//