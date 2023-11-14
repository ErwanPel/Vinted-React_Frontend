<h1 align="center">
VINTED fronted

</h1>

</br>

<p align="center">
	<img alt="Last Commit" src="https://img.shields.io/github/last-commit/ErwanPel/Vinted-Backend.svg?style=flat-square">
	<img alt="Licence" src="https://img.shields.io/github/license/ErwanPel/Vinted-Backend.svg?style=flat-square">
	<img alt="Star" src="https://img.shields.io/badge/you%20like%20%3F-STAR%20ME-blue.svg?style=flat-square">
</p>



## Tech Stack

**Client:** React

[**Server:**](https://github.com/ErwanPel/Vinted-Backend) Node, Express


## Overview

This replica of Vinted is the guiding thread project carried out during the "Le Réacteur" bootcamp. It allows you to understand the basic structure of an e-commerce site, from the creation of a user to the presentation of offers and payment.

This client-side Vinted project uses 8 pages:

1) HomePage: Displays a list of offers limited to 20 products per page. A pagination system allows you to change pages.
2) OfferPage: Displays an offer page with all the information and associated photos. If the offer belongs to the logged-in user who published it, he can delete or modify it.
3) SignPage: Displays the registration form.
4) LoginPage: Displays the login form.
5) PublishPage: Displays a form for entering information and at least one photo to publish an offer. The number of photos is limited to 6 per offer. Access to this page requires a valid login.
6) PaymentPage: Displays product information and credit card details. Access to this page requires a valid login.
7) BuyPage: Displays the user's purchases. Access to this page requires a valid login.
8) SoldPage: Displays the user's sales. Access to this page requires a valid login.

</br>
The header allows users to filter their search by product name, ascending or descending price, or price range.

## Installation and usage

Be sure, you have installed Node.js : [Node.js](https://nodejs.org/en). You have to install the "LTS" version.

### Running the project

Clone this repository :

```
git clone https://github.com/ErwanPel/Vinted-Backend.git
cd Vinted-Backend
```

Install packages :

```
npm install

```

When installation is complete, you have to launch  :

```
npx nodemon index.js

```

You can test different server routes with software such as [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/).

You can see the client side for this Vinted Project [here](https://github.com/ErwanPel/Vinted-frontend).

## Star, Fork, Clone & Contribute

Feel free to contribute on this repository. If my work helps you, please give me back with a star. This means a lot to me and keeps me going!
