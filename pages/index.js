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
  const [comunidades, setComunidades] = React.useState([{
    id: '12314253452353543',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
  }]);

  console.log(comunidades);

//API GITHUB
     const [seguidores, setSeguidores] = React.useState([]);
     React.useEffect(function(){
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
                id: new Date().toISOString(),
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image'),
              };

              /* Add comunidades no array */
              // comunidades.push('Alura Stars');
              /* Alteração para pegar e add 1 novo item no array setState */
              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas);
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
              Minhas comunidades (
              {comunidades.length}
              )
            </h2>
            <ul>
              {comunidades.map((itemAtual) => (
                <li key={itemAtual.id}>
                  <a href={`/user/${itemAtual.title}`}>
                    <img src={itemAtual.image} />
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
