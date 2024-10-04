const { ProductsPerishable, ProductsNonPerishable, Category, Batch, Supplier } = require('../model/assosiationsModels');
class eComerceData {

    async FindAllProducts(req, res) {
        try {
        
            const productPerishables = await ProductsPerishable.findAll({
                
                attributes: ['name','description','discount','brand','images','price'],
                include: [
                    {
                      model: Category,
                      attributes: ['name'] 
                     
                    },
                    {
                    model: Batch,
                    attributes: ['quantity'] 
                    
                    }
                ],
                where:{
                    state:true
                }

            });  
            const productNonPerishable = await ProductsNonPerishable.findAll(
                {
                
                    attributes: ['name','description','price','discount','stock','brand','images'],
                    include: [
                        {
                          model: Category,
                          attributes: ['name'] 
                         
                        }
                    ],
                    where:{
                        state:true
                    }
    
                }
            );  

            const allProducts=
               [
                ...productPerishables,
                ...productNonPerishable
            ] 
            ;
            res.status(200).json(allProducts);
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      }
      async productItCanInterest(req, res) {
        try {
          const productPerishables = await ProductsPerishable.findAll({
            attributes: ['name', 'description', 'discount', 'brand', 'images', 'price'],
            include: [
              {
                model: Category,
                attributes: ['name'],
              },
              {
                model: Batch,
                attributes: ['quantity'],
              },
            ],
            where: {
              state: true,
            },
          });
      
          const productNonPerishable = await ProductsNonPerishable.findAll({
            attributes: ['name', 'description', 'price', 'discount', 'stock', 'brand', 'images'],
            include: [
              {
                model: Category,
                attributes: ['name'],
              },
            ],
            where: {
              state: true,
            },
          });
      
          // Combinar los productos en un solo array
          const allProducts = [...productPerishables, ...productNonPerishable];
      
          // Función para mezclar el array de forma aleatoria
          function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
          }
      
          // Mezclar los productos
          const shuffledProducts = shuffle(allProducts);
      
          res.status(200).json(shuffledProducts);
        } catch (error) {
          res.status(400).json({ error: error.message });
          console.log(error)
        }
      }
      
}

module.exports = new eComerceData();
