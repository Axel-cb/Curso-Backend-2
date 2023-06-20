class ProductManager{
    products;

    constructor(){
        this.products= []
    };
        
  
 addProduct(tittle, description, price, thumbnail, code, stock) {
   
    const newProduct= {
        id: this.products.length,
        tittle,
        description,
        price,
        thumbnail,
        code,
        stock
    }

    let sameCode= this.products.find(prod =>prod.code === code);
    let verificar = Object.values(this.products)
    if (sameCode){
        throw new Error(`El producto ${newProduct.tittle} NO ha sido cargado ya que la propiedad "code" está repetida, ${sameCode.tittle} tiene el mismo valor.`);
    }
    if(verificar.includes(undefined)){
        throw new Error(`El producto ${newProduct.tittle} NO ha sido cargado, debe completar todos los datos.`);
    }

this.products.push(newProduct);
 };


 getProducts(){
    return this.products;
 };

 getProductsById(id){
let searchId= this.products.find(prod => prod.id === id);
if(searchId){
    return searchId;
}else{
    throw new Error(`El producto con el ID indicado no existe`);
}
 };

};



const manager= new ProductManager();
manager.addProduct("Mate giroscopio", "Mate de plástico anti-vuelco", 2.680, "Thumbnail", "50", 3)
manager.addProduct("Florero", "Florero Nórdico minimaalista", 2500, "thumbnail", "51", 5)

//  console.log(manager.getProductsById(1));
 console.log(manager.getProducts());
