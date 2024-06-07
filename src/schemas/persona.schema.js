const {z} = require('zod');

const personaSchema = z.object({
    nombre: z.string({
        required_error: 'Nombre is required string'
    }),
    apepat: z.string({
        required_error: 'Apepat is required string'
    })
});

module.exports = personaSchema;
