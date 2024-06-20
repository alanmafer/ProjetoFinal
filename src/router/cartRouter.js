import { Router } from 'express';
import cartManager from '../managers/cartManager.js';
import productManager from '../managers/productManage.js';

const router = Router();

router.post('/carts', async (req, res) => {
  try {
    const cart = await cartManager.createCart();
    res.status(201).json({ status: 'success', cart });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 'error', msg: 'Erro interno do servidor' });
  }
});

router.get('/carts/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartManager.getCartById(cid);
    if (!cart)
      return res
        .status(404)
        .json({ status: 'error', msg: 'Carrinho não encontrado' });

    res.status(201).json({ status: 'success', cart });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 'error', msg: 'Erro interno do servidor' });
  }
});

router.post('/carts/:cid/product/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cartExists = await cartManager.getCartById(cid);
    if (cartExists == undefined)
      return res
        .status(404)
        .json({ status: 'error', msg: 'Carrinho não encontrado' });
    

    const productExists = await productManager.getProductById(pid);

    if (productExists == undefined)
      return res
        .status(404)
        .json({ status: 'error', msg: 'O produto não existe.' });
    const cart = await cartManager.addProductToCart(cid, pid);


    res.status(201).json({ status: 'success', cart });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 'error', msg: 'Erro interno do servidor' });
  }
});

export default router;