import fs from "fs";


class ProductManager {
    #path = ""

    constructor(path) {
        this.#path = path
    };


    async getProducts() {
        try {
            const products = await fs.promises.readFile(this.#path, "utf-8")
            return JSON.parse(products);
        } catch {
            return []
        }
    };


    async getProductsById(id) {
        let products = await this.getProducts();
        let findID = products.find(e => e.id === id);
        if (findID) {
            return findID
        } else {
            throw new Error("El ID indicado no existe")
        }
    };

    async generadorIDS() {
        let products = await this.getProducts()
        let ids = products.map(prod => prod.id)
        let mayorID = Math.max(...ids)

        if (mayorID === -Infinity) {
            return 0
        } else {
            return mayorID
        }
    }


    async addProduct(tittle, description, price, thumbnail, code, stock) {
        let IdGenerate = await this.generadorIDS()

        const newProduct = {
            id: ++IdGenerate,
            tittle,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        let products = await this.getProducts()
        let sameCode = products.find(prod => prod.code === code);
        let verificar = Object.values(newProduct)

        if (sameCode) {
            throw new Error(`El producto ${newProduct.tittle} NO ha sido cargado ya que la propiedad "code" está repetida, ${sameCode.tittle} tiene el mismo valor.`);
        }
        if (verificar.includes(undefined)) {
            throw new Error(`El producto ${newProduct.tittle} NO ha sido cargado, debe completar todos los datos.`);
        }

        products = [...products, newProduct];
        console.log(`${newProduct.tittle} cargado correctamente`);
        await fs.promises.writeFile(this.#path, JSON.stringify(products))


    };

    async updateProduct(id, propModify) {
        let product = await this.getProducts();
        let searchID = product.find(prod => prod.id === id)
        if (!searchID) {
            throw new Error('No se encontró ningún producto con ese ID.');
        }
        if (Object.keys(propModify).includes('id')) {
            throw new Error('No es posible modificar el ID de un producto.')
        }

        if (Object.keys(propModify).includes("code")) {
            let sameCode = product.some(i => i.code === propModify.code)
            if (sameCode) {
                throw new Error('No es posible modificar la propiedad code por una que ya exista.')
            }
        }

        searchID = { ...searchID, propModify };
        let newArray = product.filter(prods => prods.id !== id)
        newArray = [...newArray, searchID];
        await fs.promises.writeFile(this.#path, JSON.stringify(newArray));
        console.log('Modificación realizada con éxito.')
    }


    async deleteProduct(id) {
        let product = await this.getProducts();
        let searchIdDelete = product.filter(i => i.id !== id)
        await fs.promises.writeFile(this.#path, JSON.stringify(searchIdDelete))
        console.log('Producto eliminado con éxito')
    }


}



export default ProductManager;

