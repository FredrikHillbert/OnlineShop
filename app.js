
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
'<button class="shopping-item-add" @click="addProductToShoppingBag(shop, item.id)">Lägg i kundkorg</button>'+
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
    this.$root.$refs.changePageMethod.updateCart();
  },
}

})
//===================================================================¤¤ Component/tamplet Homepage ends here ¤¤===================================================================//

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
  getItems: function(url){
    axios.get(url)
    .then(response => {

      this.shopitems=[];

      for (let index = 0; index < response.data.length; index++) {
        this.shopitems.push(response.data[index]);
        
      }
    })
  },
  showProduct: function(items,id){
    
    this.$root.$refs.changePageMethod.changePage(5,items,id);
  }, 
}
})
//===================================================================¤¤ Component/tamplet Products in store ends here ¤¤===================================================================//


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
    
    }
  },
  
  template: 
  
  '<div>'+
  '<div class="main" v-for = "item in productitems" >'+
  '<h2>{{ item.title }}</h2> '+
  '<h5>{{ item.description }}</h5>'+
  ' <div class="fakeimg"><img :src = "item.image" ></div>'+
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
 '<p><button @click="addProductToShoppingBag(productitems, item.id)">Lägg i kundkorg</button></p>'+
'</div>'+
'</div>'+
'</div>'+
'</div>',

  methods: {
    getProduct: function(items,id){
      
      this.productitems=[];
      for (let index = 0; index < items.length; index++) {

        if(id === items[index].id)
        this.productitems.push(items[index])
      
      }
      },

      addProductToShoppingBag: function(items, id){
        currentShoppingBag.push(items[0])
        this.$root.$refs.changePageMethod.updateCart();
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
        subTotal: function(value) {
          var subTotal = 0;
          shippingCost = value;
          subTotal += shippingCost;
         
          for (var i = 0; i < this.shoppingBag.length; i++) {
            subTotal +=  this.shoppingBag[i].price;
          }
    
          return subTotal;
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
'<svg @click="removeItem(index)" version="1.1" class="close" xmlns="//www.w3.org/2000/svg" xmlns:xlink="//www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 60 60" enable-background="new 0 0 60 60" xml:space="preserve"><polygon points="38.936,23.561 36.814,21.439 30.562,27.691 24.311,21.439 22.189,23.561 28.441,29.812 22.189,36.064 24.311,38.186 30.562,31.934 36.814,38.186 38.936,36.064 32.684,29.812"></polygon></svg>'+
'</div>'+
'</div>'+
'</li>'+
'</ul>'+
'</div>'+
'<div v-else class="empty-product">'+
'<h3>Det finns inga produkter i din kundkorg.</h3>'+
'<button  @click="homepage()">Tillbaka till butik</button>'+
'</div>'+
'</section>'+
'<section class="containerCart" v-if="shoppingBag.length > 0">'+
'<div class="promotion" v-if="payment">'+
'<label for="promo-code">Rabattkod?</label>'+
'<input placeholder="ange din rabbatkod" type="text" id="promo-code" v-model="promoCode" /> <button type="button" @click="checkPromoCode"></button>'+
'</div>'+
'<div class="summaryCheckOut">'+
'<ul>'+
'<li>Pris: <span>{{ subTotal | currencyFormatted }}</span></li>'+
'<li v-if="discount > 0">Discount: <span>{{ discountPrice | currencyFormatted }}</span></li>'+
'<li v-if="payment">Shipping Cost: <span> {{ shippingCost | currencyFormatted }} </span> </li>'+
'<li>Momskostnad: <span>{{ tax*totalPrice  | currencyFormatted }}</span></li>'+
'<li class="total">Total: <span>{{ totalPrice | currencyFormatted }}</span></li>'+
'</ul>'+
'</div>'+
'<div class="checkout">'+
'<div v-if="!payment">'+
    '<button @click="paymentpage" type="button">Vidare till betalning</button>'+
'</div>'+
'<div v-else>'+
'<button @click="paymentsuccess" type="button">Betala</button>'+
'</div>'+
'</div>'+
'</section>'+
'</div>'
,
methods: {
  getShoppingBag: function(){
    this.shoppingBag= [];
    for (let index = 0; index < currentShoppingBag.length; index++) {
     //Inte lägga till dubbel
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
    alert("Din beställning är lagd!") /// FIXA SIDA FÖR DETTA!
  },

updateQuantity: function(index, event) {
        var product = this.shoppingBag[index];
        var value = event.target.value;
        var valueInt = parseInt(value);
  
        
        if (value === "") {
          product.quantity = value;
        } else if (valueInt > 0 && valueInt < 100) {
          product.quantity = valueInt;
        }
  
        this.$set(this.shoppingBag, index, product);
      },
      checkQuantity: function(index, event) {
        // Update quantity to 1 if it is empty
        if (event.target.value === "") {
          var product = this.shoppingBag[index];
          product.quantity = 1;
          this.$set(this.shoppingBag, index, product);
        }
      },
      removeItem: function(index) {
      
        this.shoppingBag.splice(index, 1);
        currentShoppingBag = this.shoppingBag;
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

//===================================================================¤¤ Fuction to show diffrent templet ¤¤===================================================================//

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
'<h1>Kund information</h1>'+
'</div>'+
'</div>'+
'<form id="form" class="topBefore">'+
'<input id="fname" type="text" placeholder="Förnamn">'+
'<input id="lname" type="text" placeholder="Efternamn">'+
'<input id="phone" type="tel" placeholder="Telefon">'+
'<input id="company" type="text" placeholder="Företag">'+
' <input id="adres" type="text" placeholder="Adress">'+
' <input id="city" type="text" placeholder="Stad">'+
'<input id="zipCode" type="text" placeholder="Postnummer">'+
'<input id="country" type="text" placeholder="Land">'+
'<input id="email" type="email" placeholder="E-MAIL">'+
'<input id="submit" type="submit" value="Nästa">'+
'</form>'+
'<div class="step" id="step3">'+
' <div class="title">'+
' <h1>Leveransalernativ</h1>'+
'</div>'+
'</div>'+
' <div class="container">'+
' <form class="form cf">'+
'<section class="plan cf" >'+
'<input type="radio" name="radio1" id="free" value="0" v-model="shippingValue" @change="shippingFunction"><label class="free-label four col" for="free">Hämta i butik ( FREE )</label>'+
' <input type="radio" name="radio1" id="basic" value="5.99" checked><label class="basic-label four col" for="basic">Hemleverans ( 5.99$ )</label>'+
'<input type="radio" name="radio1" id="premium" value="9.99"><label class="premium-label four col" for="premium">Expressleverans ( 9.99$ )</label>'+
' </section>'+
'</form>'+
'    </div>  '+
'<div class="step" id="step4">'+
'<div class="title">'+
'    <h1>Betalning</h1>'+
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
  shippingFunction: function(){
    
    this.$root.$refs.showshoppingbag.subTotal(shippingValue)

     }

}

 
})












var changePageMethod = new Vue({
  el: '#wrapper',
  data:{
    homepage: true,
    clothpage: false,
    specific:false,
    payment: false,
    shoppingBag: false,
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
          
           break;
        case 2:
          this.homepage = false;
          this.clothpage = true;
          this.specific = false;
          this.payment = false;
          this.shoppingBag = false;
          var url = "men's clothing"
          this.$root.$refs.showitems.getItems(`https://fakestoreapi.com/products/category/jewelery`)
          break;
          case 3:
            this.homepage = false;
            this.clothpage = true;
            this.specific = false;
            this.payment = false;
            this.shoppingBag = false;
            var url = "men's clothing"
            this.$root.$refs.showitems.getItems(`https://fakestoreapi.com/products/category/${url}`)
            break;
            case 4:
              this.homepage = false;
              this.clothpage = true;
              this.specific = false;
              this.payment = false;
              this.shoppingBag = false;
              var url = "women's clothing"
              this.$root.$refs.showitems.getItems(`https://fakestoreapi.com/products/category/${url}`)
              break;
              case 5:
                this.homepage = false;
                this.clothpage = false;
                this.specific = true;
                this.payment = false;
                this.shoppingBag = false;
                this.$root.$refs.showproduct.getProduct(items,id)
                break;
                case 6:
                  this.homepage = false;
                  this.clothpage = false;
                  this.specific = false;
                  this.payment = false;
                  this.shoppingBag = true;
                  this.$root.$refs.showshoppingbag.getShoppingBag();
                  break;  
                  case 7:
                  this.homepage = false;
                  this.clothpage = false;
                  this.specific = false;
                  this.payment = true;
                  this.shoppingBag = true;
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