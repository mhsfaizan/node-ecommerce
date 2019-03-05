const router = require("express").Router();
const Product = require("../model/product/product");
const fs = require("fs");


router.get("/product",(req,res)=>{
    Product.find({category:req.query.category,subCategory:req.query.subCategory},(err,products)=>{
        if(err) res.json({status:false,data:err});
        else res.json({status:true,data:products});
    })
});

router.get("/product/:id",(req,res)=>{
    if(req.params.id){
        Product.findById(req.params.id,(err,product)=>{
            if(err) res.json({status:false,data:err});
            else res.json({status:true,data:product});
        })
    }else{
        res.json({status:false,data:"id is not there"});
    }
});

module.exports = router;