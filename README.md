<h1>Bem vindo</h1>

Olá pessoal, me chamo Lucas e gostaria de compartilhar com vocês um pouco do meu conhecimento em GraphQL. O objetivo desse artigo é ser um <b><i>quick start</i></b> sobre como construir 'sua primeira api' com GraphQL.

Lembrando que não se trata de uma documentação, caso queira se aprofundar recomendo ler a <a href="https://graphql.org/learn/">documentação oficial</a>

<h1>Pra começar, o que é GraphQL ?</h1>

Resumidamente, o GraphQL é uma linguagem de consulta cuja prioridade é fornecer exatamente os dados que os clientes solicitam e nada além, resolvendo assim muitos problemas como busca excessiva <b>overfetching</b> / insuficiente <b>underfetching</b> e consequêntemente problemas de performance e consumo de dados

<h1>Antes de começar</h1>

Eu vou considerar que você já está familiarizado com o desenvolvimento de *api's* **REST**, já conhece o Typescript e sabe configurar o projeto. Mas não se preocupe, você poderá consultar o código deste artigo.

Caso esteja utilizando o vscode, recomendo que você instale as extensões: 
**GraphQL: Language Feature Support** e **GraphQL: Syntax Highlighting**
Ajudará no desenvolvimento.

<h1>Instalando os pacotes</h1>

Começe seu projeto instalando os pacotes:

<img src="https://i.imgur.com/v0MVq3V.png" /><br />

O pacote **apollo-server-core** não é necessário para rodar o projeto, será útil aqui para utilizarmos o plugin *GraphQLPlayground*.

<h1>Estrutura inicial</h1>

<img src="https://i.imgur.com/i45xZs6.png" /><br />

No index importe os pacotes:
```js
import { gql, ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground as Playground } from "apollo-server-core";
```

<h1>typeDefs</h1>
Basicamente, typeDefs é a definição do schema "tipos" que existirão nas respostas na sua API. Clique <a href="https://graphql.org/learn/schema/">aqui</a> para saber mais sobre os schemas do GraphQL.
<br/>
<img src="https://i.imgur.com/BGUdeTz.png" /><br />

Logo acima estamos declarando um novo tipo de *'endpoint'* na sua api, do tipo **Query** ( consulta ) que obrigatoriamente retorna um dado do tipo *string*

<h1>resolvers</h1>
Simplificadamente, os resolvers "resolvem" suas chamadas da API. É no objeto resolvers que você irá declarar as funções que retornarão os dados solicitados.
<br/>
<img src="https://imgur.com/FAsYkq7.png" /><br />

Logo acima descreve que dentro das chamadas do tipo **Query** temos um resolver de nome **hello** que irá retornar uma *string* **"Olá futuro sênior !"**

Calma! 
Talvez esteja confuso, mas logo fará total sentido. 
Vamos fazer isso rodar e ver o que acontece.

<h1>Instânciando um servidor</h1>

<img src="https://i.imgur.com/E5SWteS.png" /><br />

O ApolloServer usa a porta 4000 por padrão, mas você pode usar outra porta como no exemplo acima. Agora rode o projeto e abra seu navegador na url e veja a mágica acontecer !

<h1>Explicando o ApolloPlayground</h1>

Do lado esquerdo você pode escrever suas querys ou mutations, e do lado direito você verá o output da sua operação:

<img src="https://i.imgur.com/UlsODyH.png" /><br />

Acho que agora tudo faz sentido, né ?

<h1>Melhorando um pouco as coisas</h1>

Pronto, nossa api já está rodando, já somos programadores *experts* em GraphQL, mas agora vamos fazer algumas melhorias no nosso código. 

Pra começar, as definições de tipos em *typeDefs* pode escalar rapidamente caso tenhamos muitos tipos, querys e mutations a serem declaradas.

Então vamos organizar melhor a estrutura do nosso projeto:

<img src="https://i.imgur.com/I1CP7pw.png" /><br />

Dentro de **src** vamos criar a pasta **graphql** , que por sua vez terá três pastas: 
schemas, typedefs e resolvers.

Na pasta schemas, crie o arquivo hello.graphql

<img src="https://i.imgur.com/Sve9P8y.png" /><br />

Dentro da pasta resolvers:

**hello.ts**
<img src="https://i.imgur.com/TOl0vQk.png" /><br />

**index.ts**
<img src="https://i.imgur.com/BanXCmH.png" /><br />

Agora importe e subistitua o resolver no seu projeto:

<img src="https://i.imgur.com/vEGziOn.png" /><br />

Perceba que nada mudou no nosso Playground, ainda conseguimos fazer a mesma query e a mesma continua retornando o mesmo resultado. O que fizemos foi organizar tudo em uma nova estrutura, para manter o código legível, escalável e de fácil manutenção.

<img src="https://i.imgur.com/LqIiKdP.png" /><br />

Lembrando que existem outras formas de organizar as entidades do seu projeto, fique a vontade para implementar da forma que preferir.

Lembra que criamos o *hello.graphql* em **schemas** ?

Agora precisamos implementar ele no nosso sistema. Existem bibliotecas externas que fazem o que irei demonstrar a seguir, mas acho que por enquanto essa é uma boa solução, e vai te ajudar a manter o código bem organizado:

Dentro da pasta typedefs, crie o arquivo index.ts:

<img src="https://i.imgur.com/gwCYw2L.png" /><br />

Mas calma! Antes de sair copiando o código loucamente, vamos tentar entender o que está acontecendo, e qual é o problema que esse código está resolvendo ( afinal somos programadores ou copiadores de código ? )

Na linha **1** estamos importando o pacote *fs*, que tem diversas funcionalidades relacionadas ao *filesystem* ou seja, escrita, leitura e diversas operações com arquivos.

Na linha **2** estamos criando uma variável chamada *path* que irá conter o diretório dos nossos *schemas*.

A função *build*, recebe como parâmetro um array de strings ( desta forma podemos passar vários arquivos *schema.graphql* na função ) e faz a seguinte operação:

Mapeia o array com os nomes dos nossos schemas, e retorna o conteúdo desse arquivo através da função`fs.readFileSync` e no final, concatena tudo.

Por fim, nós declaramos uma variável de nome typeDefs que recebe o retorno dessa função e exportamos ela.

Gostaria de dizer que essa foi a solução que eu desenvolvi, para poder organizar melhor os schemas do meu projeto, e com certeza devem existir soluções melhores que essa. Mas essa também é bem promissora, **e vou explicar-lhes o porque logo mais**.

Agora podemos importar esse typeDefs em nosso projeto e substituir pelo antigo:

<img src="https://i.imgur.com/fLj8xnM.png" /><br />

E assim ficou nosso index.ts em **src**

<h1>O poder do GraphQL</h1>

Até agora você deve ta se perguntando, pra que gastar tempo estudando esse tal de GraphQL ? Qual é o problema que ele resolve, quais são suas vantagens em relação a arquitetura REST. Bom, a partir de agora essas vantagens irão ficar bem claras.

Primeiro, crie a pasta **db** em **src**, o arquivo *db.ts* e popule ela com os seguintes dados:

<img src="https://i.imgur.com/t4QA5xt.png" /><br />

Agora que temos esse "banco de dados" improvisado, como faríamos uma consulta que retorne somente o nome dos usuários ?

Primeiramente, vamos definir nossa nova consulta:
Em **schemas** vamos criar o arquivo *users.graphql* e criar os tipos:

<img src="https://i.imgur.com/l6mcjr0.png" /><br />

Primeiramente criamos o tipo **User**, que possui todos os campos obrigatórios 👉 **!**
Também definimos nossa query *listDevelopers* que retorna obrigatoriamente um array de User.

Agora, precisamos resolver essa query.
Crie um novo arquivo em **resolvers** *users.ts*

<img src="https://i.imgur.com/wNwaQo6.png" /><br />

Aqui está claro, estamos importando nosso "banco de dados", e resolvendo nossa chamada dizendo que o retorno dela é nosso array de usuários.

Importamos nosso novo *resolver* da query **listDevelopers**:
<img src="https://i.imgur.com/bauYKN1.png" />

E adicionamos o nosso schema na nossa função **build** em typedefs:
<img src="https://i.imgur.com/DxS1U2v.png" /><br />

Pronto, agora podemos fazer nossa query e especificar quais campos queremos retornar:
<img src="https://i.imgur.com/NGZpS9j.png" /><br />

Agora se precisarmos de mais informações, basta adicionar na nossa query:
<img src="https://i.imgur.com/XgLGpYb.png" /><br />

Acho que agora ficou claro o poder desta incrível ferramenta, não ?

Ah, e lembra que eu disse que explicaria porque a solução em typeDefs era promissora ?
Acho que você já percebeu! Podemos simplesmente criar arquivos schema.graphql e declarar nossos tipos, mutations e querys de forma organizada, e simplesmente importar no nosso array de schemas que rapidamente estará disponível em nosso sistema. Rápido e fácil. 

<h1>Dificultando as coisas</h1>

Até agora este foi um tutorial delicinha, bem mastigadinho pra você entender e acompanhar sem se perder. Mas a partir de agora vamos acelerar um pouco o rítmo, pois considero que você já tem insumos suficientes para entender o que está acontecendo.

Vamos adicionar um novo array em nosso banco de dados:

<img src="https://i.imgur.com/U7KFi7U.png" /><br />

E agora, como podemos associar essas informações com os nossos usuários ? Bom, existem algumas formas de fazer isso, vamos ver o primeiro exemplo:

Defina o tipo Stack no schema users.graphql :

<img src="https://i.imgur.com/SRtAmTB.png" /><br />

Adicione no tipo User:

<img src="https://i.imgur.com/8R1zuQO.png" /><br />

E por fim, adicionamos a nossa lista nas propriedades dos nossos usuários:

<img src="https://i.imgur.com/9piuQTh.png" /><br />

Agora podemos fazer consultas e trazer os dados do nosso usuário e suas tecnologias:

<img src="https://i.imgur.com/P9T7jWT.png" /><br />

<h1>Arguments</h1>

Arguments são parâmetros que podem ser passados numa consulta, para obter um determinado tipo de dado. Por exemplo, e se quiséssemos obter da lista de usuários somente o que possuí o id **2** ? 

Podemos criar um novo arquivo schema.graphql para definir nossa query, ou colocar no arquivo users.graphql, fique a vontade para organizar seus dados como quiser. 
Só não esqueça de adicionar no array da função build, caso crie um novo arquivo.

<img src="https://i.imgur.com/tEPFaw2.png" /><br />

Já nos resolvers, recebemos alguns parâmetros. Neste exemplo exploraremos somente o parâmetro args. Caso queira entender melhor sobre, veja mais <a href="https://www.apollographql.com/docs/apollo-server/data/resolvers/#handling-arguments">aqui</a>

<img src="https://i.imgur.com/0Odynz7.png" /><br />

Neste exemplo estamos fazendo *destructuring* em args e obtendo o **id** diretamente. 
E claro, como boa prática poderíamos delegar essa responsabilidade de buscar o usuário para outra entidade em **services** e tratar lá suas regras de negócio por exemplo.

<img src="https://i.imgur.com/yOFzZT9.png" /><br />

Não esqueça de importar e adicionar seu novo resolver **getDev** em **resolvers** / index.ts

<h1>O parâmetro parent</h1>

O parâmetro parent é o primeiro parâmetro do *resolver*, e agora vamos ver um exemplo de como podemos utilizá-lo.
Suponha que temos uma tabela de veículos em nosso banco de dados:

<img src="https://i.imgur.com/NsTkXbC.png" /><br />

E agora, como fazemos para relacionar esses veículos com os nossos usuários ?
Primeiro vamos criar o tipo **Vehicle** em **schemas** *vehicles.graphql*

<img src="https://i.imgur.com/1x1fTyK.png" /><br />

Depois vamos adicionar o campo no tipo **User**:

<img src="https://i.imgur.com/s2qeoei.png" /><br />

Não esqueça de adicionar o *vehicles.graphql* no seu array de schemas, caso contrário irá receber um erro, pois o tipo **Vehicle** não está presente ( neste exemplo ) no arquivo *users.graphql*.

Agora, basta adicionar o campo vehicle na nossa lista de usuários:

<img src="https://i.imgur.com/pw5LEvl.png" /><br />

Porém, se tentarmos rodar essa query obtendo os dados do veículo receberemos um erro: **Cannot return null for non-nullable fields ...** Para resolver esse problema, teremos que "resolver" o tipo **User** nos resolvers:

Crie o arquivo *user.ts* em **resolvers**:

<img src="https://imgur.com/APnbZBA.png" /><br />

Perceba que dando um console.log no parâmetro parent, teremos todas as informações de user. Agora fica fácil:

<img src="https://i.imgur.com/0lnOchk.png" /><br />

<img src="https://i.imgur.com/aJZVRV3.png" /><br />

Desta forma, acabamos de relacionar duas tabelas distintas utilizando somente o poder do GraphQL. Também poderiamos fazer isso com o prisma ? Sim, mas esse é um tutorial de GraphQL haha.

<h1>Aliases</h1>

Suponha que precisássemos buscar, na mesma query os dados de dois usuários: 

<img src="https://i.imgur.com/4cn2Di2.png"/><br />

Rode a query acima e veja o que acontece:<br />
Provavelmente você recebeu o erro **Fields \"getDev\" conflict because they have differing arguments.** Como o erro descreve, existe um conflito na busca dos dados. Resolver isso é fácil utilizando Aliases:

<img src="https://i.imgur.com/iKMR9uV.png" /><br />

Perceba que agora estamos separando os resultados da nossa busca usando o aliase **dev1** e **dev2**

<h1>Fragments</h1>

Você já deve ter percebido que pode existir uma grande repetição de propriedades ao fazer grandes consultas no nosso playGround:

<img src="https://i.imgur.com/yxdh2jP.png" /><br />

E isso pode escalar muito rápidamente se fôssemos utilizar muitos dados repetidamente.
Como resolver esse problema ? Utilizando os **Fragments**

<img src="https://imgur.com/ltDJd8l.png" /><br />

Criamos um "fragmento" que possui as propriedades que queremos de **User**
Agora podemos utilizar um <a href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Spread_syntax">spread operator</a> para distribuir essas propriedades na nossa query.

<h1>Enums</h1>

Você pode usar Enums para ajudar na tipagem dos dados da sua aplicação, veja mais <a href="https://graphql.org/learn/schema/#enumeration-types">aqui</a> 

Por exemplo, supondo que nossos usuários possuem o campo **profile** que é uma string, como poderíamos "tipar" essa string para obtermos somente valores válidos ?

<img src="https://i.imgur.com/RqHsKjT.png" /><br />

<img src="https://i.imgur.com/ubo2yHx.png" /><br />

Com isso nós tipamos a propriedade **profile** que só pode ser **USER** ou **ADMIN**
Caso outro valor seja enviado lançará um erro na nossa query: **"Enum \"Profiles\" cannot represent value: ...**

<h1>Variáveis</h1>

Também é possível passar variáveis para as nossas querys da seguinte forma:

<img src="https://i.imgur.com/Xcc5yKt.png" /><br />

Utilizando `($id: Int)` depois de **query** estamos dizendo que nossa consulta recebe uma variável como parâmetro, nesse caso **id** que possuí o tipo *Int*. É uma **boa prática** utilizar variáveis para facilitar as consultas em sua api.

<h1>Operation Name</h1>

É considerada uma **boa prática** dar nomes as nossas querys. Felizmente, isso é bem fácil:

<img src="https://i.imgur.com/ZUJsfiv.png" /><br />

Perceba que nomeamos a nossa *query* para **QueryName**
Com isso podemos facilmente identificar a query que foi feita, num arquivo de log por exemplo.

<h1>Directives</h1>

O GraphQL é tão bacana que podemos usar condicionais em nossas consultas usando diretivas. Observe o exemplo abaixo:

<img src="https://i.imgur.com/e3nJzHz.png" /><br />

Observe que passamos uma variável do tipo **boolean** como parâmetro em nossa query. Observe também que a mesma é obrigatória, pois estamos utilizando 👉 `!`

Isso é necessário pois logo abaixo temos uma <i>condicional</i> que inclui em nossa pesquisa o campo vehicle caso a variável seja **true**

Também existe uma outra diretiva chamada `@skip` que basicamente é a lógica inversa do `@include`. Você pode testar utilizando a query abaixo: 

<img src="https://i.imgur.com/kJRxtiS.png" /><br />

Você pode ver sobre directives com maior profundidade <a href="https://graphql.org/learn/queries/#directives">aqui</a> 

<h1>Mutations</h1>

De forma simplificada, o type Mutation serve para definir as funções que irão manipular dados. A funcionalidade é comparável com POST, PUT e DELETE de APIs REST.

Declarando uma mutation:

Vamos criar uma nova **mutation** em nosso schema que irá adicionar um novo veículo em nossa lista de veículos: ( em **schemas** / vehicles.graphql )

<img src="https://i.imgur.com/IfejaTZ.png" /><br />

Agora iremos "resolver" essa mutation em **resolvers** / createVehicles.ts :

<img src="https://i.imgur.com/wRSKUbw.png" /><br />

Agora, importe sua **Mutation** em **resolvers** / index.ts :

<img src="https://i.imgur.com/Mc87ORt.png" /><br />

Perceba que sua mutation está dentro do objeto **Mutations** !

Execute sua mutation no Playground:

<img src="https://i.imgur.com/NKDfYE8.png" /><br />

Perceba que ele retorna o veículo, e você pode selecionar quais campos deseja obter desse retorno. ( Dê um console.log na sua lista de veículos e veja se o novo veículo foi adicionado na mesma )

O exemplo acima é apenas didático !

Uma boa prática seria delegar a responsabilidade de adicionar um novo veículo na lista à outra entidade, que por sua vez teria a responsabiliade de validar as regras de negócio da nossa implementação, como por exemplo verificar se o veículo já existe na lista etc.

<h1>Criando mutations com variáveis</h1>

De forma similar as querys, podemos usar variáveis nas nossas mutations:

<img src="https://i.imgur.com/1NNONT1.png" /><br />

Veja que no exemplo acima também foi passado um **Operation Name** para a mutation, mas o mesmo não é obrigatório para a mesma funcionar. 

<h1>Que tal fazer alguns testes ?</h1>

Tente passar um tipo diferente como variável e veja o que acontece !
É importante que você faça muitos testes, tentem passar tipos diferentes dos quais estão definidos no schema, ou não passar propriedades que são obrigatórias. É só assim que aprendemos, seja curioso !

<h1>O Type Input</h1>

Podemos agrupar os dados de uma mutation dentro de um tipo especial chamado **input**
Mas qual é o problema que isso resolve ? Suponha que queremos *atualizar* os nossos veículos:

<img src="https://i.imgur.com/R13FPiK.png" /><br />

Perceberam que nas duas mutations estamos repetindo os campos **model** e **year** ?
Neste caso não é um problema, pois a quantidade de dados são pequenos.
Mas isso pode se tornar um grande problema caso a quantidade de dados aumente.

Então como resolvemos isso ?
Criamos um novo tipo **input**:

<img src="https://imgur.com/8rCGJmK.png" /><br />

E agora atualizamos o nosso tipo Mutation em typeDefs:

<img src="https://i.imgur.com/WwKe0Ft.png" /><br />

Desta forma agrupamos todos os dados que precisamos no tipo **input vehicleData**
Mas agora precisamos atualizar nosso resolver:

<img src="https://imgur.com/wFtbwqH.png" /><br />

Agora recebemos um objeto **data** como argumento em nosso resolver
Uma modificação também será nescessária ao escrever nossa mutation:

<img src="https://imgur.com/8XLYO2g.png"/><br />

Percebeu ? Estamos passando o **data** com as nossas variáveis.

<h1>Bônus: Tratamento de erros</h1>

Vamos adicionar uma condicional na nossa mutation **createVehicle** para não aceitar modelos que já existam em nosso "banco de dados": 

Primeiro, vamos delegar essa responsabilidade para a função **registerVehicle**

<img src="https://i.imgur.com/3QuRfzc.png" /><br />

Em **services** / vehicles.ts temos:

<img src="https://i.imgur.com/gBuYMxk.png" /><br />

Agora ao tentar adicionar um modelo que já existe em nosso sistema, um erro será lançado:

<img src="https://i.imgur.com/Bdw4WFx.png" /><br />

Mas existe uma forma melhor de capturar e tratar esse erro, caso seja nescessário:
Em **middlewares** / errorHandler.ts:

<img src="https://i.imgur.com/nhvigbp.png" /><br />

Agora importamos nossa função: 

<img src="https://i.imgur.com/JXwYcp9.png" /><br />

Dessa forma nós "capturamos" o erro, e podemos trata-lo afim de não expormos dados sensíveis/desnecessários:

<img src="https://i.imgur.com/3kIfmDM.png" /><br />

Bom, com isso espero ter te ajudado a iniciar seus estudos em GraphQL.

Ainda existe muito a ser explorado, mas acredito que com essa base você já consegue estudar a documentação oficial e continuar aprendendo e melhorando seus conhecimentos nessa tecnologia incrível.

O código desse artigo pode ser encontrado <a href="https://github.com/i-Lucas/tabnews-graphql" />aqui</a>
Você pode me encontrar <a href="https://www.linkedin.com/in/hilucas/" />aqui</a>

Compartilhe esse artigo com seus amigos, ou melhor, compartilhe o conhecimento !
Quanto mais ensinamos mais aprendemos, e quanto mais compartilhamos mais conteúdos de qualidade teremos, e mais pessoas serão beneficiadas. Não tenha medo de compartilhar !
Até mais! Atenciosamente, Lucas Oliveira.
