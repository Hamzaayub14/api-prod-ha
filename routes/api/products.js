const express = require("express")
let router = express.Router();
const validateProduct = require("../../middlewares/validateProduct")
var { Product } = require ("../../models/product.js")
router.get("/", async(req,res) =>{
    let page = Number(req.query.page? req.query.page:1);
    let perPage = Number(req.query.perPage ? req.query.perPage : 10);
    let skipRecords = (perPage*(page-1));
    let products = await Product.find().skip(skipRecords).limit(perPage);
    
    return res.send(products);
})
router.get("/:id", async(req,res) =>{
    try{
       
    let product = await Product.findById(req.params.id);
    if(!product) return res.status(400).send("Product not Available");
    return res.send(product);
    }catch (err){
       return res.status(400).send("Invalid ID") 
    }
})

router.put("/:id",validateProduct, async(req,res) =>{
    try{
        
     
    let product = await Product.findById(req.params.id);
    product.name = req.body.name;
    product.price = req.body.price;
    await product.save();
    return res.send(product);
    }catch (err){
       return res.status(400).send("Invalid ID") 
    }
})
router.delete("/:id", async(req,res) =>{
   
    let product = await Product.findByIdAndDelete(req.params.id);
    
    
    return res.send(product);
   
})
router.post("/",validateProduct, async(req,res) =>{
//    let  {error} = validate(req.body);
//    if(error)
//     return res.status(400).send(error.details[0].message);

    let product = new Product();
    
    product.name = req.body.name;
    product.price = req.body.price;
    await product.save();
    return res.send(product);
   
})


module.exports = router;