// const { product } = require ('../index');

// exports.addProduct = async (req, res) => {
//     try{
//         const { name, description, price, cantidad } = req.body;
//         const newProduct = await product.create({
//             name,
//             description,
//             price,
//             cantidad
//         });
//         res.json(newProduct);
//     }catch (error){
//         res.status(400).json({error: error.message});
//     }
// }