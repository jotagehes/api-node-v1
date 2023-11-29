const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const lista_produtos = {
  produtos: [
    { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João" },
    { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans" },
    { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé" },
    { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps" },
    { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé" },
  ]
};

app.get('/produtos', (req, res) => {
  res.json(lista_produtos.produtos);
});

app.get('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const produto = lista_produtos.produtos.find(p => p.id === id);

  if (!produto) {
    res.status(404).json({ mensagem: 'Produto não encontrado' });
  } else {
    res.json(produto);
  }
});

app.post('/produtos', (req, res) => {
  const novoProduto = req.body;
  lista_produtos.produtos.push(novoProduto);
  res.status(201).json(novoProduto);
});

app.put('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = lista_produtos.produtos.findIndex(p => p.id === id);

  if (index === -1) {
    res.status(404).json({ mensagem: 'Produto não encontrado' });
  } else {
    const produtoAtualizado = req.body;
    lista_produtos.produtos[index] = { ...lista_produtos.produtos[index], ...produtoAtualizado };
    res.json(lista_produtos.produtos[index]);
  }
});

app.delete('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = lista_produtos.produtos.findIndex(p => p.id === id);

  if (index === -1) {
    res.status(404).json({ mensagem: 'Produto não encontrado' });
  } else {
    const produtoExcluido = lista_produtos.produtos.splice(index, 1);
    res.json(produtoExcluido[0]);
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`API está rodando em http://0.0.0.0:${port}`);
});