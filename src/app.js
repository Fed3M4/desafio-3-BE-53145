import express from 'express';
import ProductManager from './desafio.js'

const app = express();
const port = 8080;
const pm = new ProductManager('./data.json');

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.listen(port, () => console.log(`¡Servidor arriba en el puerto ${port}`))

app.get('/bienvenida', (req, res) => {
    res.send('<h1>Bienvenido</h1>');
})

app.get('/products', async (req, res) =>{
    let products = await pm.getProducts();
    const limit = req.query.limit;
    if(!limit) return res.send(products);
    res.send(products.slice(0, limit));
})

app.get('/products/:pid', async(req, res) => {
    const id = parseInt(req.params.pid);
    const productById = await pm.getProductById(id);
    res.send(productById);
})