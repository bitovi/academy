const fs = require('fs').promises;
const recursive = require("recursive-readdir");
const HubSpotApi = require("./hubspot-api");
const AcademyPage = require("./academy-page");
const { confirmDeleteFile, promptDeleteFiles } = require("./user-prompts");
require('dotenv').config()

class HubSpotPublisher {
  constructor(folder = 'academy'){
    if (!process.env.HUBSPOT_API_KEY) {
      throw new Error("You must provide the environment variable HUBSPOT_API_KEY.")
    }

    if (!process.env.HUBSPOT_CAMPAIGN_ID) {
      throw new Error("You must provide the environment variable HUBSPOT_CAMPAIGN_ID.")
    }

    this.folder = folder;
    this.hubSpotApi = new HubSpotApi(process.env.HUBSPOT_API_KEY, process.env.HUBSPOT_CAMPAIGN_ID);
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
          {
              title: academyPage.getTitle(),
              headHtml: academyPage.getCSSLinks(),
              bodyHtml: academyPage.getPageContents(),
              metaDescription: academyPage.getMetaDescription()
          }
        );
      }
      else {
        return this.hubSpotApi.createPage({
            title: academyPage.getTitle(),
            headHtml: academyPage.getCSSLinks(),
            bodyHtml: academyPage.getPageContents(),
            slug: academyPage.slug,
            metaDescription: academyPage.getMetaDescription()
        });
      }
    });
  }

  async publish(){
    const pagesCurrentlyOnHubSpot = await this.hubSpotApi.getPages();
    const pagesForHubSpotUpload = (await this.getPagesToUpload());

    await Promise.all(pagesForHubSpotUpload.map(page => {
      const localPageOnHubSpot = pagesCurrentlyOnHubSpot.find(pageCurrentlyOnHubSpot =>
        pageCurrentlyOnHubSpot.slug === page.slug
      );

      if(localPageOnHubSpot){
        page.hubSpotId = localPageOnHubSpot.id;
      }

      return this.uploadPage(page)
    }));

    const pagesToBeDeleted = pagesCurrentlyOnHubSpot.filter(pageCurrentlyOnHubSpot =>
      !pagesForHubSpotUpload.find(pageForHubSpotUpload => pageCurrentlyOnHubSpot.slug === pageForHubSpotUpload.slug)
    );

    if (process.env.CI === 'true') {
      console.warn(`Note: There were ${pagesToBeDeleted.length} pages on Bitovi.com that are not in the local project that were left in place.`);
    } else {
      promptDeleteFiles(pagesToBeDeleted,
        () => {
          // delete all
          pagesToBeDeleted.forEach(pageToBeDeleted => this.hubSpotApi.deletePage(pageToBeDeleted.id))
        },
        async () => {
          // choose which to delete
          for(let pageToBeDeleted of pagesToBeDeleted){
            await confirmDeleteFile(pageToBeDeleted.slug, () => this.hubSpotApi.deletePage(pageToBeDeleted.id))
          }
        }
      )
    }
  }
}

module.exports = HubSpotPublisher;
