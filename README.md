<h1 align="center">
  <img src="logos/logo48.png" alt="bingetrendz logo"/> <span style="vertical-align:middle;">BingeTrendz</span>
  <br/>
  <a href="https://goo.gl/ujAfCG" target="_blank">
    <img src="readmeImg/cws.png" alt="chrome web store link" width="150px"/>
  </a>
</h1>

<a class="badge-align" href="https://www.codacy.com/app/Parthipan-Natkunam/bingeTrendz?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Parthipan-Natkunam/bingeTrendz&amp;utm_campaign=Badge_Grade"><img src="https://api.codacy.com/project/badge/Grade/669304481f2f4d898157a59c461c0be8"/></a>

## Description

This is a chrome extension that alters the default tab into a trending leaderboard for TV series; listing the top 20 trending series of that particular day.

## Architecture

<h1 align="center">
  <img src="readmeImg/archi.jpg" alt="architecture illustration"/>
</h1>

-  The proxy is used here to prevent the API key from being exposed on the client side.

## Screenshots

<h1 align="center">
  <img src="readmeImg/sc1.jpg" alt="bingetrendz screenshot 1" width="500px"/>
  <img src="readmeImg/sc2.jpg" alt="bingetrendz screenshot 2" width="500px"/>
</h1>

## Stack

-  Javascript (ES5)
-  HTML / CSS
-  Node.js
-  AWS Lambda

## Data API
The data is provided by the TMDB TV API.


## Build

To build the project from source

- `npm run build`
