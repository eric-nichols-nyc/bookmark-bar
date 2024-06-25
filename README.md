	apify/crawlee
=============

Folders and files
-----------------

Latest commit
-------------

History
-------

Repository files navigation
---------------------------

[Crawlee](https://crawlee.dev)

 A web scraping and browser automation library
==============================================================================

![Crawlee](https://raw.githubusercontent.com/apify/crawlee/master/website/static/img/crawlee-light.svg?sanitize=true)
[![NPM latest version](https://camo.githubusercontent.com/90fa5d42d378ca32b704ab0148483ae4705c98f4f922a9fc199e3d362e527c35/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f40637261776c65652f636f72652e737667)](https://www.npmjs.com/package/@crawlee/core)
[![Downloads](https://camo.githubusercontent.com/b15c953f0baf15aa9390fdc4924d13412c678cbc380d775c50a316c9a4a3704a/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f646d2f40637261776c65652f636f72652e737667)](https://www.npmjs.com/package/@crawlee/core)
[![Chat on discord](https://camo.githubusercontent.com/5c0002c2347a6ba7bca9f6351bf9dfeb4481cb0e05e5f94b0fbbc55856901daa/68747470733a2f2f696d672e736869656c64732e696f2f646973636f72642f3830313136333731373931353537343332333f6c6162656c3d646973636f7264)](https://discord.gg/jyEM2PRvMU)
[![Build Status](https://github.com/apify/crawlee/actions/workflows/test-ci.yml/badge.svg?branch=master)](https://github.com/apify/crawlee/actions/workflows/test-ci.yml)


![NPM latest version](https://camo.githubusercontent.com/90fa5d42d378ca32b704ab0148483ae4705c98f4f922a9fc199e3d362e527c35/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f40637261776c65652f636f72652e737667)![Downloads](https://camo.githubusercontent.com/b15c953f0baf15aa9390fdc4924d13412c678cbc380d775c50a316c9a4a3704a/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f646d2f40637261776c65652f636f72652e737667)![Chat on discord](https://camo.githubusercontent.com/5c0002c2347a6ba7bca9f6351bf9dfeb4481cb0e05e5f94b0fbbc55856901daa/68747470733a2f2f696d672e736869656c64732e696f2f646973636f72642f3830313136333731373931353537343332333f6c6162656c3d646973636f7264)![Build Status](https://github.com/apify/crawlee/actions/workflows/test-ci.yml/badge.svg?branch=master)Crawlee covers your crawling and scraping end-to-end and **helps you build reliable scrapers. Fast.**

Your crawlers will appear human-like and fly under the radar of modern bot protections even with the default configuration. Crawlee gives you the tools to crawl the web for links, scrape data, and store it to disk or cloud while staying configurable to suit your project's needs.

Crawlee is available as the [`crawlee`](https://www.npmjs.com/package/crawlee) NPM package.

`crawlee`👉 **View full documentation, guides and examples on the [Crawlee project website](https://crawlee.dev)** 👈

Installation
------------

We recommend visiting the [Introduction tutorial](https://crawlee.dev/docs/introduction) in Crawlee documentation for more information.

Crawlee requires **Node.js 16 or higher**.

### With Crawlee CLI

The fastest way to try Crawlee out is to use the **Crawlee CLI** and choose the **Getting started example**. The CLI will install all the necessary dependencies and add boilerplate code for you to play with.

### Manual installation

If you prefer adding Crawlee **into your own project**, try the example below. Because it uses `PlaywrightCrawler` we also need to install [Playwright](https://playwright.dev). It's not bundled with Crawlee to reduce install size.

`PlaywrightCrawler`By default, Crawlee stores data to `./storage` in the current working directory. You can override this directory via Crawlee configuration. For details, see [Configuration guide](https://crawlee.dev/docs/guides/configuration), [Request storage](https://crawlee.dev/docs/guides/request-storage) and [Result storage](https://crawlee.dev/docs/guides/result-storage).

`./storage`🛠 Features
----------

* Single interface for **HTTP and headless browser** crawling
* Persistent **queue** for URLs to crawl (breadth & depth first)
* Pluggable **storage** of both tabular data and files
* Automatic **scaling** with available system resources
* Integrated **proxy rotation** and session management
* Lifecycles customizable with **hooks**
* **CLI** to bootstrap your projects
* Configurable **routing**, **error handling** and **retries**
* **Dockerfiles** ready to deploy
* Written in **TypeScript** with generics

### 👾 HTTP crawling

* Zero config **HTTP2 support**, even for proxies
* Automatic generation of **browser-like headers**
* Replication of browser **TLS fingerprints**
* Integrated fast **HTML parsers**. Cheerio and JSDOM
* Yes, you can scrape **JSON APIs** as well

### 💻 Real browser crawling

* JavaScript **rendering** and **screenshots**
* **Headless** and **headful** support
* Zero-config generation of **human-like fingerprints**
* Automatic **browser management**
* Use **Playwright** and **Puppeteer** with the same interface
* **Chrome**, **Firefox**, **Webkit** and many others

Usage on the Apify platform
---------------------------

Crawlee is open-source and runs anywhere, but since it's developed by [Apify](https://apify.com), it's easy to set up on the Apify platform and run in the cloud. Visit the [Apify SDK website](https://sdk.apify.com) to learn more about deploying Crawlee to the Apify platform.

Support
-------

If you find any bug or issue with Crawlee, please [submit an issue on GitHub](https://github.com/apify/crawlee/issues). For questions, you can ask on [Stack Overflow](https://stackoverflow.com/questions/tagged/apify), in GitHub Discussions or you can join our [Discord server](https://discord.com/invite/jyEM2PRvMU).

Contributing
------------

Your code contributions are welcome, and you'll be praised to eternity! If you have any ideas for improvements, either submit an issue or create a pull request. For contribution guidelines and the code of conduct, see [CONTRIBUTING.md](https://github.com/apify/crawlee/blob/master/CONTRIBUTING.md).

License
-------

This project is licensed under the Apache License 2.0 - see the [LICENSE.md](https://github.com/apify/crawlee/blob/master/LICENSE.md) file for details.



