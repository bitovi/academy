const cheerio = require('cheerio')

class AcademyPage {
  constructor(html, fileLocation) {
    this.$ = cheerio.load(html, {decodeEntities: true});
    this.fileLocation = fileLocation;
    if(this.fileLocation.split('/')[1] === 'index.html'){
      this.slug = 'academy/';
    } else {
      this.slug = this.fileLocation;
    }
    this.hubSpotId = null;
  }

  setHtml(html){
    this.$ = cheerio.load(html, {decodeEntities: true});
  }

  getTitle(){
    return this.$('title').html();
  }

  getMetaDescription(){

      return this.$('meta[name=description]').attr("content");
  }

  getPageContents(){
    // const pageContent = this.$('#content-wrapper').html();
    // const pageScripts = this.$('#scripts').html();
    // return updateStaticAssetLinks(pageContent + pageScripts);
    const pageContent = this.$('body').html();
    return updateStaticAssetLinks(pageContent);
  }

  getCSSLinks(){
    const cssLinks = this.$('link')
    .toArray()
    .map(element => `<link rel="stylesheet" type="text/css" href="${element.attribs.href}">`)
    .join();

    return updateStaticAssetLinks(cssLinks);
  }
}

const updateStaticAssetLinks = (html) => {
  const assetBaseUrl = 'https://bitovi.github.io/academy/static';
  return html
    .replace(/src="\.*\/static/g, `src="${assetBaseUrl}`)
    .replace(/src='\.*\/static/g, `src='${assetBaseUrl}`)
    .replace(/href="\.*\/static/g, `href="${assetBaseUrl}`)
    .replace(/href='\.*\/static/g, `href='${assetBaseUrl}`)
    .replace(/url\(&apos;\.*\/static/g, `url(&apos;${assetBaseUrl}`)
    .replace(/url\('\.*\/static/g, `url('${assetBaseUrl}`)
}

module.exports = AcademyPage;
