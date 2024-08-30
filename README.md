# Simulador de Escalonamento de Algoritmos

Simulador de escalonamento de algoritmos baseado em React. Permite que os usuários insiram vários parâmetros de processo e observem como diferentes algoritmos de escalonamento gerenciam a ordem de execução.

## Integrantes do grupo
Integrantes do Grupo

Este projeto foi desenvolvido por:

    Elias Francisco da Silva Neto
    Jonas Oliveira Pereira
    Roberio Gomes de Oliveira
    Yuri Freitas Rios

## Funcionalidades

- Entrada de parâmetros para cada processo, incluindo:
  - Tempo de Chegada
  - Tempo de Execução
  - Deadline
  - Prioridade
  - Quantum do Sistema
  - Sobrecarga do Sistema
- Simulação dos seguintes algoritmos de escalonamento:
  - First-In-First-Out (FIFO)
  - Shortest Job First (SJF)
  - Round Robin (RR)
  - Earliest Deadline First (EDF)
- Representação visual da ordem de execução dos processos e temporização.

## Requisitos

Considere um sistema operacional que implementa escalonamento de processos. O funcionamento esperado é que esse ambiente tenha N processos que podem chegar em tempos distintos para execução. Para cada processo, deve ser informado manualmente:

- Tempo de chegada
- Tempo de execução
- Deadline
- Prioridade
- Quantum do sistema
- Sobrecarga do sistema

Esse sistema deve implementar os algoritmos de escalonamento:

- FIFO
- SJF
- Round Robin
- EDF

## Como começar

Para executar este projeto localmente, siga estes passos:

### Pré-requisitos

Certifique-se de ter o seguinte instalado:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seuusuario/algorithm-scheduler-simulator.git```
2. Vá para o diretório do projeto
```bash
cd algorithm-scheduler-simulator
```
3. Instale as dependências
```bash
    npm i
```
ou
```bash
    yarn install
```
4. Execute a aplicação:
```bash
    npm i
```
O aplicativo estará disponível em **http://localhost:5173/**