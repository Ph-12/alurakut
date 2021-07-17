import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(pHroprieda) {
  return (
    <Box>
      <img src={`https://github.com/${pHroprieda.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${pHroprieda.githubUser.png}`}>
          @
          {pHroprieda.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

function ProfileRelationsBox(props) {
     return(
          
          <ProfileRelationsBoxWrapper>
               <h2 className="smallTitle">
                    {props.title} ({props.items.length}
                    )
               </h2>
               <ul>
                    {/* {seguidores.map((itemAtual) => (
                         <li key={itemAtual}>
                         <a href={`https://github.com/${itemAtual}.png`}>
                              <img src={itemAtual.image} />
                              <span>{itemAtual.title}</span>
                         </a>
                         </li>
                    ))} */}
               </ul>
          </ProfileRelationsBoxWrapper>
     )
}


export default function Home() {
  const userName = 'ph-12';
  const pessoasFavoritas = ['juunegreiros', 'omariosouto', 'peas', 'rafaballerini', 'marcobrunodev', 'felipefialho'];

  // *OLD const comunidades = ['Alurakut']

  // const comunidades = comunidades[0]
  // const alteradorDeComunidades/setComuniades = comunidades[1]
  const [comunidades, setComunidades] = React.useState([]);

  console.log(comunidades);

//API GITHUB
     const [seguidores, setSeguidores] = React.useState([]);
     React.useEffect(function(){
          //fetch GET
          fetch('https://api.github.com/users/peas/followers')
          .then(function (respostaDoServidor) {
          if(respostaDoServidor.ok){
               return respostaDoServidor.json()
          }
          throw new Error('Aconteceu algum problema :(' + respostaDoServidor.status)
          })
          .then(function (respostaConvertida) {
               setSeguidores(respostaConvertida)
          })
          .catch(function (erro) {
               console.error(erro)
          })

          //API GraphQL DATOCMS
          fetch('https://graphql.datocms.com/', {
            method: 'POST',
            headers:{
              'Authorization': 'c0271db9c3c5eb931dd20cb1b5be43',
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              "query": 
                `query {
                  allCommunities {
                    title
                    id
                    imageUrl
                    creatorslug
                  }
                }
                `
            }),
          })
          // pega o restorno em json
          .then((response) => response.json()) 
          // pega retorno especifico no return
          .then((respostaCompleta) => {
            const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
            console.log(comunidadesVindasDoDato)
            setComunidades(comunidadesVindasDoDato)
          })
     }, [])

//Base alurakut
  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={userName} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem Vindo(a)
            </h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que voce deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e) {
              /* Previnir o evento de refresh da pagina */
              e.preventDefault();

              const dadosDoForm = new FormData(e.target);
              console.log('Campo: ', dadosDoForm.get('title'));
              console.log('Campo: ', dadosDoForm.get('image'));

              const comunidade = {
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
                creatorslug: userName,
              }

              fetch('/api/comunidades',{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(comunidade)
              })
              .then(async (response) => {
                const dados = await response.json();
                console.log(dados.registroCriado);
                const comunidade = dados.registroCriado
                /* Add comunidades no array */
                // comunidades.push('Alura Stars');
                /* Alteração para pegar e add 1 novo item no array setState */
                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas);
              })
            }}
            >
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>
                Criar comunidade
              </button>

            </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          
          <ProfileRelationsBox title="seguidores" items={seguidores}/>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Melhores do github (
              {pessoasFavoritas.length}
              )
            </h2>
            <ul>
              {pessoasFavoritas.map((itemAtual) => (
                <li key={itemAtual}>
                  <a href={`/user/${itemAtual}`}>
                    <img src={`https://github.com/${itemAtual}.png`} />
                    <span>{itemAtual}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
               <h2 className="smallTitle">
              Minhas comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((itemAtual) => (
                <li key={itemAtual.id}>
                  <a href={`/communities/${itemAtual.id}`}>
                    <img src={itemAtual.imageUrl} />
                    <span>{itemAtual.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>


          
        </div>
      </MainGrid>
    </>
  );
}
