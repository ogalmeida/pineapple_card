<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## Projeto React

Esse projeto é uma simpes aplicação web desenvolvida utilizando React na parte de front-end, consumindo API feita em Laravel. Essa aplicação foi desenvolvida com o objetivo de concluir o teste enviado pela [FreteBras](https://www.fretebras.com.br/).

Para executar essa aplicação em sua máquina local, siga os seguintes passos:

## Iniciando

Primeiro você deve clonar o repositório, usando o comando abaixo (usando https):

```bash
git clone https://github.com/ogalmeida/pineapple_card.git
```

Neste projeto é utilizado o Laravel Sail, que é uma forma de utilizar um ambiente em docker para rodar a aplicação.
Sendo assim, depois de clonar o projeto acesse o repositório e execute o comando abaixo para subir a aplicação em ambiente dockerizado:

```bash
cd pineapple_card
./vendor/bin/sail up
```
Pode ser que ao rodar o comando pela primeira vez, demore um tempo para que o docker suba os containers.
Por fim, podemos acessar a aplicação na url [http://localhost](http://localhost).

## Construído com

* [React](https://reactjs.org/)
* [Laravel](https://laravel.com)

## License

The React and Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
