require('dotenv').config();

const Fastify = require('fastify');
const sequelize = require('./db');
const priceListRoutes = require('./routes/pricelist.routes');

const fastify = Fastify({ logger: true });

async function startServer() {
  try {
    
    fastify.register(priceListRoutes);

    await sequelize.authenticate();
    console.log('Database connected ✅');

    await sequelize.sync(); 
    console.log('Models synced ✅');

    await fastify.listen({ port: process.env.PORT || 3000 });
    console.log(`Server running at http://localhost:${process.env.PORT || 3000}`);
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
}

startServer();
