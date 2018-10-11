# MDN Vietnam Minisite
[![Travis CI build](https://api.travis-ci.org/mdnvietnam/mdnvietnam.github.io.svg?branch=develop)](https://travis-ci.org/mdnvietnam/mdnvietnam.github.io)

Inspired by git-awards.com and commits.top websites, I created this microsite to honor top contributors to [MDN](https://developer.mozilla.org/) for the [Vietnamese locale](https://developer.mozilla.org/en-US/dashboards/revisions?locale=vi), to encourage more Vietnamese language speakers will join the effort to make MDN the best reference and guide for Web development among Vietnamese developers community.

Live site: [https://mdnvietnam.github.io/](https://mdnvietnam.github.io/)

## TODO

- [X] Basic site styles
- [X] Paginate index page with list of authors (sorted by number of articles)
- [X] Add about page
- [X] Rewrite scrape algorithm without lowdb (write json directly)
- [X] Implement incremental scraping (WIP)
- [X] Store ranking to data json (currently calculated from order and page offset)
- [ ] Fully automated with Netlify and trigger
- [ ] i18n with Vietnamese & English
- [ ] Implement new authors page but sorted with latest authors and enclosed entries


## Getting started

```sh
# Make sure that you have the Gatsby CLI program installed:
npm install --global gatsby-cli

#Then you can run it by:
gatsby develop
```

## Colophon

- isomorphic-fetch & cheerio for scraper
- Gatsby
- Bootstrap
- Coffee (with milk)

---
© 2018 [Tran Trong Thanh](https://github.com/trongthanh). Licensed under MIT license.
