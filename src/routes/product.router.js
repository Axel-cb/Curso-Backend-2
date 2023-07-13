import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const manager = new ProductManager("./products.json")

const router = Router();

router.get("/", async (req, res) => {
    try {
        const products = await manager.getProducts()
        const { limit } = req.query

        if (limit) {
            products.length = limit
            return res.send(products)
        } else {
            res.send(products)
        }
    }
    catch (err) {
        res.status(404)
            .send(`${err}`)
    }
})


router.get("/:pid", async (req, res) => {

    try {
        const { pid } = req.params
        const product = await manager.getProductsById(parseInt(pid))
        res.send(product)
    } catch (err) {
        res.status(404)
            .send(`${err}`)
    }
})

router.post("/", async (req, res) => {
   try{ 
    const { id,
        tittle,
        description,
        price,
        thumbnail,
        code,
        stock,
        category,
        status= true } = req.body

    if (!tittle || !description || !price || !code || !stock || !category) {
        res.status(400).send({ message: "faltan datos" })
    }else{
       await manager.addProduct(tittle, description, parseInt(price), thumbnail, code, parseInt(stock), status, category)
       res.send({status: "succes", payload: req.body})
    }
}catch(err){
res.status(400).send({status: "error", error: `${err}`})
}
})

router.put("/:pid", async (req, res) => {
    try{
        const {pid}= req.params
        const id= parseInt(pid)
        await manager.updateProduct(id, req.body)
        res.send({status: "succes", payload: await manager.getProductsById(id)})
    }catch(err){
        res.status(404).send({status: "error", error: `${err}`})
    }
})

router.delete("/:pid", async (req, res) =>{
    try{
const {pid} = req.params
const id= parseInt(pid)
await manager.deleteProduct(id)
res.send({status: "succes", payload: "Producto eliminado"})
}catch(err){
    res.status(404).send({status: "error", error: `${err}`})
}
})







export default router