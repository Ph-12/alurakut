import {SiteClient} from 'datocms-client';

export default async function recebedorDeRequests(request, response) {

     if(request.method === 'POST'){

          const TOKEN =  'faa65f71f06c44909c2c718f9c9060'
          const client = new SiteClient(TOKEN)
     
          const registroCriado = await client.items.create({
               itemType: "972269",
               ...request.body,
               // title: "Comunidade de test",
               // imageUrl: "https://github.com/omariosouto.png",
               // creatorslug: "omariosouto"
          })

          console.log(registroCriado)
     
          response.json({
               dados: 'Algum dado qualquer',
               registroCriado: registroCriado,
          })
          return;
     }
     response.status(404).json({
          message: 'Ainda nao temos nada no GET, mas no POST tem!'
     })
}