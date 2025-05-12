const PriceList = require('../db/models/Pricelist');

async function priceListRoutes(fastify, options) {

  fastify.post('/pricelist', async (req, reply) => {
    try {
      const item = await PriceList.create(req.body);
      reply.code(201).send(item);
    } catch (err) {
      reply.code(400).send({ error: err.message });
    }
  });

  fastify.get('/pricelist', async (req, reply) => {
    const items = await PriceList.findAll();
    reply.send(items);
  });

  fastify.get('/pricelist/:id', async (req, reply) => {
    const item = await PriceList.findByPk(req.params.id);
    if (!item) return reply.code(404).send({ error: 'Item not found' });
    reply.send(item);
  });

  fastify.put('/pricelist/:id', async (req, reply) => {
    const item = await PriceList.findByPk(req.params.id);
    if (!item) return reply.code(404).send({ error: 'Item not found' });
    await item.update(req.body);
    reply.send(item);
  });

  fastify.delete('/pricelist/:id', async (req, reply) => {
    const item = await PriceList.findByPk(req.params.id);
    if (!item) return reply.code(404).send({ error: 'Item not found' });
    await item.destroy();
    reply.send({ message: 'Item deleted' });
  });
}

module.exports = priceListRoutes;
