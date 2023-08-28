// import JS files
import {Product} from "../model/product.js"
import {Service} from "../services/phoneService.js"
import { CartItem } from "../model/cartItem.js";

const service = new Service();
let cart = [];

import { fetchPhoneList } from "./controller.js";

fetchPhoneList();
