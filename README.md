# Algoritmo do caixeiro-viajante

Trabalho Prático de Algoritmos de Otimização - UNISC 2016/1

### Requisitos

Para rodar o programa, é preciso ter o [node.js](https://nodejs.org/en/) versão 4 ou superior instalado no computador.

### Como executar

1. Instalar as dependências executando `npm install` na pasta do projeto (necessário apenas antes de executar o app pela primeira vez)

2. Executar `node app.js /caminho/para/entrada.txt` -- o arquivo com os elementos de entrada deve ser especificado como argumento

O arquivo `samples/1.txt` é um exemplo de entrada.

### Formato do arquivo de entrada

O arquivo de entrada deve ser de texto simples, cada linha deve informar o nome de um elemento e sua posição (x, y).

`1 11003.611100 42102.500000`

Significa que o elemento 1 está localizado na coordenada (11003.611100, 42102.500000).

Todos os elementos descritos no arquivo de entrada serão conectados a todos os elementos, e a distância entre cada elemento é calculada com a função `D(e1, e2) = sqrt((e1.x - e2.x)² + (e1.y - e2.y)²)`.

### Formato da saída

O programa irá imprimir na saída o caminho percorrido pelo caixeiro-viajante partindo do primeiro elemento, passando por todos os elementos apenas uma vez e voltando ao elemento inicial, junto com a distância total percorrida.