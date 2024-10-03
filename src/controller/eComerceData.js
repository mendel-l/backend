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
                    model: Supplier,
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
                         
                        },
                        {
                        model: Supplier,
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

}

module.exports = new eComerceData();
