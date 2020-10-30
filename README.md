# Informer Bot <img align="right" src="public/logo.png" width="100">
> Bot para o Discord com a função de emitir comunicados.

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com) \
![GitHub repo size](https://img.shields.io/github/repo-size/silviohfc/informerbot?style=for-the-badge) ![GitHub](https://img.shields.io/github/license/silviohfc/informerbot?color=blue&style=for-the-badge)

O Informer é um bot cujo a função é enviar comunicados para um ou mais canais de texto dentro de um servidor do Discord, sendo possível criar grupos de canais dependendo do seu objetivo.

![](https://i.ibb.co/SNDJGQm/informerbot.gif)

## Instalação
Clone o repositório:
``` 
$ git clone https://github.com/silviohfc/informerbot
```
Dentro da pasta instale as dependências:
``` 
$ npm install
```
Crie um arquivo com o nome ```config.json``` dentro da pasta ```app``` com este conteúdo:
```
{
    "prefix": "!", // Prefixo para os comandos
    "token": "insira o token aqui" // Token de autenticação do bot
}
```

## Exemplo de uso
_**Obs: Exclamação (!) representada como o prefix configurado no arquivo** ```config.json```_

#### !groups
Lista através de um _embed_ os grupos criados em conjunto com seus respectivos canais de texto selecionados.

#### !gcreate ```<nome do grupo> <canal 1> <canal 2> <...>```
Cria um grupo contendo um nome e uma lista de canais de texto.

#### !gedit ```<nome do grupo> <canal 1> <canal 2> <...>```
Se existente, edita o grupo com o nome informado sobrepondo os canais.
_É possível editar o nome do grupo através da flag **```-n <novo nome>```**_

#### !gdelete ```<nome do grupo>```
Deleta um grupo de canais através do nome informado.

#### !notify ```<nome do grupo> (<mensagem>)```
Envia a mensagem informada para todos os canais de texto contidos no grupo indicado.

#### !clear
Limpa todas as mensagens do canal de comandos.


## Licença
Distribuído sob a licença MIT. Veja ```LICENSE``` para mais informações.
