import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import {addProduct,products,getproducts,Edit,Delete} from '../controllers/productController.js'
import multer from "multer";


const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);
router.get("/products",products)
router.post("/Edit/:id",Edit)
router.post('/Delete/:id',Delete)
router.post("/addProduct", upload.single("image"),addProduct)
router.get("/getproducts/:id",getproducts)
export default router;
