import { Router } from 'express';
import productManage from '../managers/productManage.js';
import { checkProductData } from '../middlewares/checkProductData.middleware.js';

const router = Router();

router.get('/products', async (req, res) => {
  const { limit } = req.query;
  const products = await productManage.getProducts(limit);
  res.send(products);
});

router.get('/products/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManage.getProductById(pid);
    if (!product)
      return res
        .status(404)
        .json({ status: 'error', msg: 'Produto não encontrado' });

    res.status(200).json({ status: 'success', product });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 'error', msg: 'Erro interno do servidor' });
  }
});

router.put('/products/:pid', async (req, res) => {
  const { pid } = req.params;
  const body = req.body;
  const product = await productManage.updateProduct(pid, body);
  res.send(product);
});

router.post('/products', checkProductData, async (req, res) => {
  try { 
    const body = req.body;
    const product = await productManage.addProduct(body);
    res.status(201).json({ status: 'success', product });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 'error', msg: 'Erro interno do servidor' });
  }
});

router.delete('/products/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManage.getProductById(pid);
    if (!product)
      return res
        .status(404)
        .json({ status: 'error', msg: 'Produto não encontrado' });

    await productManage.deleteProduct(pid);
    res
      .status(200)
      .json({
        status: 'success',
        msg: `Produto com ID ${pid} excluido`,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 'error', msg: 'Erro interno do servidor' });
  }
});

export default router;