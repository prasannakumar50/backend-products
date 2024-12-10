const express = require("express")
const app = express()

const {initializeDatabase} = require("./db/db.connect")
const Product = require("./models/product.models")

app.use(express.json())
initializeDatabase()



async function createProduct(newProduct){
    try{
       const product = new Product(newProduct)
       const saveProduct = await product.save()
       return saveProduct
    }catch(error){
       console.log(error)
    }
}

app.post("/products", async(req, res)=>{
    try{
       const savedProduct = await createProduct(req.body)
       res.status(201).json({message: 'product added successfully', product: savedProduct})
    }catch(error){
        res.status(500).json({error: 'failed to add product'})
    }
})

async function readProductByTitle(productTitle){
    try{
      const product = await Product.findOne({title: productTitle})
      return product
    }catch(error){
       throw error
    } 
}

app.get("/products/:title", async(req, res)=>{
    try{
        const product = await readProductByTitle(req.params.title)
        //console.log(product)
        if(product){
            res.json(product)
        }else{
            res.status(404).json({error: 'Product Not Found'})
        }
    }catch(error){
        res.status(500).json({error: 'Failed to fetch product'})
    }
})


async function readAllProducts(){
    try{
        const allProducts = await Product.find()
        return allProducts
    }catch(error){
        console.log(error)
    }
}

app.get("/products", async(req, res)=>{
    try{
        const products = await readAllProducts()
        if(products.length!=0){
            res.json(products)
        }else{
           res.status(404).json({error: 'No products Found'})
        }
    }catch(error){
        res.status(500).json({error: 'failed to fetch products'})
    }
})

async function readProductByCategory(productCategory){
    try{
       const productByCategory = await Product.find({category: productCategory})
       return productByCategory
    }catch(error){
       console.log(error)
    }
}

app.get("/products/category/:productCategory", async(req, res)=>{
    try{
       const product = await readProductByCategory(req.params.productCategory)
       if(product.length!=0){
          res.json(product)
       }else{
        res.status(404).json({error: 'No products Found'})
       }
    }catch(error){
        res.status(500).json({error: 'failed to fetch products'})
    }
})

async function updateProduct(productId, dataToUpdate){
    try{
       const updateProduct = await Product.findByIdAndUpdate(productId, dataToUpdate,{new: true})
       return updateProduct
    }catch(error){
       console.log("Error in updating product", error)
    }
}


app.post("/products/:productId", async(req, res)=>{
    try{
        const updatedProduct = await updateProduct(req.params.productId, req.body)
        if(updatedProduct){
            res.status(200).json({message: 'Product updated successfully', updatedProduct: updatedProduct})
        }else{
            res.status(404).json({error: "Product not found"})
        }

    }catch(error){
        res.status(500).json({error: 'Failed to update product'})
    }
})


const PORT =3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})