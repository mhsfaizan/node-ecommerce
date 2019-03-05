const router = require("express").Router();
const Product = require("../../model/product/product");
const multer = require("multer");
const fs = require("fs");

// config
storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, 'E:/wampinfotech/node-app/e-commerce/my-ecommerce/src/assets/uploads/')
        cb(null, '/public/assets/uploads/')
    },
    filename: function (req, file, cb) {
        let arr = file.originalname.split(".");
        let ext = arr[arr.length-1];
        cb(null, Date.now()+"."+ext);
    }
})
const upload = multer({ storage:storage});

const validate = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.json({ status: false, data: "Logged In Before" })
    }
}
router.post("/product", validate, upload.any(), (req, res) => {
    req.body.attributes = JSON.parse(req.body.attributes);
    let j = 0;
    for(let attribute of req.body.attributes){
        attribute.images = req.files.filter(o=>o.fieldname == j);
        j++;
    }
    req.body.commonImages = req.files.filter(o=>o.fieldname=="cImages");
     let product = {...req.body}
    //  res.json(product);
     let newProduct = new Product(product);
     newProduct.save((err,data)=>{
         if(err) res.json({status:false,err:err});
         else{
             res.json({status:true,data:data});
         }
     })
});

router.get("/product",validate,(req,res)=>{
    Product.find((err,data)=>{
        if(err) res.json({status:false,data:err})
        else{
            res.json({status:true,data:data})
        }
    })
})
router.get("/product/:id",validate,(req,res)=>{
    Product.findById(req.params.id, (err, product)=>{
        if(err){
            res.json({status:false,data:err});
        }else{
            res.json({status:true,data:product});
        }
    });
})

router.delete("/product/:id",validate,(req,res)=>{
    Product.findByIdAndDelete(req.params.id,(err,product)=>{
        if(err) res.json({data:err,status:false});
        else{
            let images = [];
            for(let image of product.commonImages){
                images.push(image.filename);
            }
            for(let attribute of product.attributes){
                for(let image of attribute.images){
                    images.push(image.filename);
                }
            }
            for(let image of images){
                fs.unlinkSync("E:/wampinfotech/node-app/e-commerce/my-ecommerce/src/assets/uploads/"+image);
            }
            res.json({status:true,data:"Succefully Deleted"});
        }
    })
})

router.get("/update-product/:id",validate,(req,res)=>{
    Product.findByIdAndUpdate(req.params.id,{isDisable:true},{new:true},(err,newProd)=>{
        if(err) res.json({data:err,status:false});
        else{
            res.json({status:true,data:newProd});
        }
    })
})
module.exports = router;