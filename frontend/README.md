# gouser-front-end

Sistema de Transportes em Geral

```bash
git clone https://github.com/pablomaiden/gouser-front-end.git
```

## Modos de Execução

-   👉 [Subir com Docker](#como-subir-o-front-end-com-docker)
-   👉 [Subir localmente (sem Docker)](#como-subir-o-front-end-localmente-sem-docker)

---

## Como subir o front-end com Docker

Este front-end foi construído com Angular e pode ser facilmente executado usando Docker.

### Pré-requisitos

-   [Docker](https://www.docker.com/)
-   [Docker Compose](https://docs.docker.com/compose/) (opcional, caso deseje subir junto com o back-end)

---

### Passo a passo para subir o front-end

#### 1. **Build da imagem**

Execute o comando abaixo no diretório `gouser-front-end`, onde está o `Dockerfile`:

```bash
docker build --no-cache -t gouser-front-end .
```

```bash
docker run -d -p 4200:80 --name gouser-front-end gouser-front-end
```

## Como subir o front-end localmente (sem Docker)

Este front-end é desenvolvido com Angular e pode ser executado diretamente na sua máquina.

---

### Pré-requisitos

-   [Node.js (v20)](https://nodejs.org/)
-   [Angular CLI](https://angular.io/cli)

---

### Passo a passo para subir o front-end

#### 1. **Clonar o repositório**

```bash
git clone https://github.com/pablomaiden/gouser-front-end.git
```

```bash
cd gouser-front-end
```

```bash
npm install
```

```bash
ng serve
```
