  /*-----For Search Bar-----------------------------*/
  $(document).on('click','.search',function(){
    $('.search-bar').addClass('search-bar-active')
});

$(document).on('click','.search-cancel',function(){
    $('.search-bar').removeClass('search-bar-active')
});

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
//---------------------------------------------------------------Vue cart
var listShopItems = new Array();




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

'<p class="shopping-item-price">{{ item.price }}kr</p>'+
'<button class="shopping-item-add">Lägg i kundkorg</button>'+
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
  }
}

})



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
'<p >{{ item.price }} kr</p>'+
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
        listShopItems.push(response.data[index]);
      }

      for (let index = 0; index < listShopItems.length; index++) {
        console.log(listShopItems[index])
      }
      
    })
  },
  showProduct: function(items,id){
    
    this.$root.$refs.changePageMethod.changePage(5,items,id);
  },
  
}

})

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
  '<h3>Pris<h4>{{ item.price}} kr</h4></h3>'+
  '<p>Välj storlek</p>'+
  '<select id="select">'+
  '<option value="0">XS</option>'+
  '<option value="1">S</option>'+
  '<option value="2">M</option>'+
  '<option value="3">L</option>'+
  ' <option value="4">XL</option>'+
   '</select>'+     
  ' </div>'+
 '<p><button>Lägg i kundkorg</button></p>'+
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
  }
  })

 
  //-------Show product slut-----------------------------

var shoppingBag = new Vue({
  el: "#app",
  data: {
    products: [
      {
        image: "https://via.placeholder.com/200x150",
        name: "Produkt",
        description: "Beskrivning produkt",
        price: 299,
        quantity: 2
      },
      {
        image: "https://via.placeholder.com/200x150",
        name: "Produkt",
        description: "Beskrivning produkt",
        price: 446,
        quantity: 1
      },
      {
          image: "https://via.placeholder.com/200x150",
          name: "Produkt",
          description: "Beskrivning produkt",
          price: 169,
          quantity: 1
        }
    ],
    tax: 5,
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
    discount: 0
  },
  computed: {
    itemCount: function() {
      var count = 0;

      for (var i = 0; i < this.products.length; i++) {
        count += parseInt(this.products[i].quantity) || 0;
      }

      return count;
    },
    subTotal: function() {
      var subTotal = 0;

      for (var i = 0; i < this.products.length; i++) {
        subTotal += this.products[i].quantity * this.products[i].price;
      }

      return subTotal;
    },
    discountPrice: function() {
      return this.subTotal * this.discount / 100;
    },
    totalPrice: function() {
      return this.subTotal - this.discountPrice + this.tax;
    }
  },
  filters: {
    currencyFormatted: function(value) {
      return Number(value).toLocaleString("sv", {
        style: "currency",
        currency: "SEK"
      });
    }
  },
  methods: {
    updateQuantity: function(index, event) {
      var product = this.products[index];
      var value = event.target.value;
      var valueInt = parseInt(value);

      // Minimum quantity is 1, maximum quantity is 100, can left blank to input easily
      if (value === "") {
        product.quantity = value;
      } else if (valueInt > 0 && valueInt < 100) {
        product.quantity = valueInt;
      }

      this.$set(this.products, index, product);
    },
    checkQuantity: function(index, event) {
      // Update quantity to 1 if it is empty
      if (event.target.value === "") {
        var product = this.products[index];
        product.quantity = 1;
        this.$set(this.products, index, product);
      }
    },
    removeItem: function(index) {
      this.products.splice(index, 1);
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
  }
});

//============================================= Test att hide and show element!

var changePageMethod = new Vue({
  el: '#wrapper',
  data:{
    homepage: true,
    clothpage: false,
    specific:false,
    payment: false,
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
          this. specific = false;
          this.payment = false;
          break;
        case 2:
          this.homepage = false;
          this.clothpage = true;
          this. specific = false;
          this.payment = false;
          var url = "men's clothing"
          this.$root.$refs.showitems.getItems(`https://fakestoreapi.com/products/category/jewelery`)
          break;
          case 3:
            this.homepage = false;
            this.clothpage = true;
            this. specific = false;
            this.payment = false;
            var url = "men's clothing"
            this.$root.$refs.showitems.getItems(`https://fakestoreapi.com/products/category/${url}`)
            break;
            case 4:
              this.homepage = false;
              this.clothpage = true;
              this. specific = false;
              this.payment = false;
              var url = "women's clothing"
              this.$root.$refs.showitems.getItems(`https://fakestoreapi.com/products/category/${url}`)
              break;
              case 5:
                this.homepage = false;
                this.clothpage = false;
                this. specific = true;
                this.payment = false;
                this.$root.$refs.showproduct.getProduct(items,id)
                break;
        default:
          break;
      }


    }
  }
})
 
  
 //============================================= Test att hide and show element slut