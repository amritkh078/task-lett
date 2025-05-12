const Terms = require('../db/models/Terms');

async function termsRoutes(fastify, options) {
  
  fastify.get('/terms/:lang', async (req, reply) => {
    const { lang } = req.params;
    if (!['en', 'sv'].includes(lang)) {
      return reply.code(400).send({ error: 'Invalid language code' });
    }

    const terms = await Terms.findOne({ where: { language: lang } });

    if (!terms) {
      return reply.code(404).send({ error: 'Terms not found for this language' });
    }

    reply.send({ language: terms.language, content: terms.content });
  });
}

module.exports = termsRoutes;
