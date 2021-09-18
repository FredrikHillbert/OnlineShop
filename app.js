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

updated(){
  this.$root.$refs.showitems = this;
},


data: function(){
  return {
    url: "",
    shopitems:[],
  }
},

template: 
// '<div>'+
// ' <div class="column1">'+
// '<div class="card1">'+
//   '<img src="byxor.webp" alt="Denim Jeans" style="width:100%">'+
//   '<h1>Tailored Jeans</h1>'+
//   '<p class="price">$19.99</p>'+
//   '<p>Some text about the jeans. Super slim and comfy lorem ipsum lorem jeansum. Lorem jeamsun denim lorem jeansum.</p>'+
//  '<p><button>Add to Cart</button></p>'+
// '</div>'+
// '</div>'+
// '<div class="column1">'+
// '<div class="card1">'+
//   '<img src="byxor.webp" alt="Denim Jeans" style="width:100%">'+
//   '<h1>Tailored Jeans</h1>'+
//   '<p class="price">$19.99</p>'+
//   '<p>Some text about the jeans. Super slim and comfy lorem ipsum lorem jeansum. Lorem jeamsun denim lorem jeansum.</p>'+
//   '<p><button>Add to Cart</button></p>'+
// '</div>'+
// '</div>'+
// '<div class="column1">'+
// '<div class="card1 ">'+
//   '<img src="byxor.webp" alt="Denim Jeans" style="width:100%">'+
//   '<h1>Tailored Jeans</h1>'+
//   '<p class="price ">$19.99</p>'+
//   '<p>Some text about the jeans. Super slim and comfy lorem ipsum lorem jeansum. Lorem jeamsun denim lorem jeansum.</p>'+
//   '<p><button>Add to Cart</button></p>'+
// '</div>'+
// '</div>'+
// '<div class="column1">'+
// '<div class="card1">'+
//   '<img src="byxor.webp" alt="Denim Jeans" style="width:100%">'+
//   '<h1>Tailored Jeans</h1>'+
//   '<p class="price">$19.99</p>'+
//  '<p>Some text about the jeans. Super slim and comfy lorem ipsum lorem jeansum. Lorem jeamsun denim lorem jeansum.</p>'+
//   '<p><button>Add to Cart</button></p>'+
// '</div>'+
// '</div>'+
// '</div>'
// ,
'<div>' +
'<div class="shopping-item-card column" v-for="item in shopitems"> '+
'<img :src = "item.image" class="shopping-item-image">'+
'<div class="shopping-content">'+
'<h2 class="shopping-item-title">{{ item.title }}</h2>'+

'<p class="shopping-item-price">{{ item.price }}kr</p>'+
'<button class="shopping-item-add">Lägg i kundkorg</button>'+
'</div></div></div>'
,

methods: {
  getItems: function(url){
    axios.get(this.url)
    .then(response => {

      for (let index = 0; index < response.data.length; index++) {
        this.shopitems.push(response.data[index])
      }


      console.log(response.data)
    })
  }
}

})

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

new Vue({
  el: '#wrapper',
  data:{
    homepage: true,
    clothpage: false,
    specific:false,
    payment: false,
  },

  methods:{
    changePage: function(text){

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
        default:
          break;
      }


    }
  }
})
 
  
 //============================================= Test att hide and show element slut