const fs = require('fs').promises;
const recursive = require("recursive-readdir");
const HubSpotApi = require("./hubspot-api");
const AcademyPage = require("./academy-page");
require('dotenv').config()

class HubSpotPublisher {
  constructor(folder='academy'){
    this.folder = folder;
    this.hubSpotApi = new HubSpotApi(process.env.HUBSPOT_API_KEY);
  }

  async getPagesToUpload() {
    const shouldBeUploaded = file => {
      const fileFolder = file.split('/')[1];
      const fileExtension = file.substr(file.lastIndexOf('.') + 1);
      return fileFolder != 'static' && fileExtension === 'html';
    }
    const filePathsToUpload = (await recursive(this.folder))
      .filter(shouldBeUploaded);
    const pagesToUpload = [];
    for(const filePathToUpload of filePathsToUpload){
      const html = await fs.readFile(filePathToUpload, 'utf8');
      pagesToUpload.push(new AcademyPage(html, filePathToUpload.toLowerCase()));
    }
    return pagesToUpload;
  }

  async uploadPage(academyPage) {
    return fs.readFile(academyPage.fileLocation, 'utf8').then(html => {
      academyPage.setHtml(html);

      if(academyPage.hubSpotId) {
        return this.hubSpotApi.updatePage(
          academyPage.hubSpotId,
          academyPage.getTitle(),
          academyPage.getCSSLinks(),
          academyPage.getPageContents(),
        );
      } 
      else {
        return this.hubSpotApi.createPage(
          academyPage.getTitle(),
          academyPage.getCSSLinks(),
          academyPage.getPageContents(),
          academyPage.slug
        );
      }
    });
  }

  async publish(){
    const pagesCurrentlyOnHubSpot = await this.hubSpotApi.getPages();
    const pagesForHubSpotUpload = (await this.getPagesToUpload());
    const pagesToBeDeleted = pagesCurrentlyOnHubSpot.filter(pageCurrentlyOnHubSpot => 
      !pagesForHubSpotUpload.find(pageForHubSpotUpload => pageCurrentlyOnHubSpot.slug === pageForHubSpotUpload.slug)
    );
    pagesToBeDeleted.forEach(pageToBeDeleted => this.hubSpotApi.deletePage(pageToBeDeleted.id))
    pagesForHubSpotUpload.forEach(page => {
      const localPageOnHubSpot = pagesCurrentlyOnHubSpot.find(pageCurrentlyOnHubSpot => 
        pageCurrentlyOnHubSpot.slug === page.slug
      );
      if(localPageOnHubSpot){
        page.hubSpotId = localPageOnHubSpot.id;
      }
      this.uploadPage(page)
    });
  }
}

module.exports = HubSpotPublisher;
