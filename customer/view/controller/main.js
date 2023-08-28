// import JS files
import {Product} from "../model/product.js"
import {Service} from "../services/phoneService.js"
import { CartItem } from "../model/cartItem.js";

import { fetchPhoneList } from "./controller.js";
window.onload = function() {
    fetchPhoneList();
  };

// filter theo hãng

document.getElementById('selectList').addEventListener('change', function() {
    const selectedBrand = this.value; 
    fetchPhoneList(selectedBrand);
});
  
