const seedTerms = require('./scripts/seedTerms');
require('dotenv').config();

const Fastify = require('fastify');
const sequelize = require('./db');
const priceListRoutes = require('./routes/pricelist.routes');
const termsRoutes = require('./routes/terms.routes');

const fastify = Fastify({ logger: true });
const cors = require('@fastify/cors');

fastify.register(cors, {
  origin: ['*'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

async function startServer() {
  try {

    fastify.register(priceListRoutes);
    fastify.register(termsRoutes);

    await sequelize.authenticate();
    console.log('Database connected');

    await sequelize.sync();
    console.log('Models synced');

    await seedTerms();

    await fastify.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' }, () => {
      console.log(`Server running at http://0.0.0.0:${process.env.PORT || 3000}`);
    });

  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
}

startServer();
