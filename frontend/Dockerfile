# Usa a imagem oficial do Node.js versão 20 e nomeia esta etapa como "build"
FROM node:20 AS build

# Define o diretório de trabalho dentro do container como /app
WORKDIR /app

# Copia os arquivos de dependência (package.json e package-lock.json) para o container
COPY package*.json ./

# Instala as dependências do projeto Angular
RUN npm install

# Copia todo o código-fonte restante para o container
COPY . .

# Executa o build da aplicação Angular em modo produção
RUN npm run build -- --configuration production

# Usa uma imagem leve do Nginx para servir a aplicação compilada
FROM nginx:alpine

# Remove arquivos HTML padrão da imagem Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos gerados no build Angular para o diretório público do Nginx
COPY --from=build /app/dist/sakai-ng /usr/share/nginx/html

# Ajusta permissões para evitar erro 403 Forbidden
RUN chmod -R 755 /usr/share/nginx/html

# Expõe a porta 80 do container (padrão HTTP)
EXPOSE 80

# Comando para iniciar o Nginx em primeiro plano
CMD ["nginx", "-g", "daemon off;"]
