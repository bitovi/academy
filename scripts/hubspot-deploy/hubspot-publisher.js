const fs = require('fs').promises;
const path = require('path');
const recursive = require("recursive-readdir");
const HubSpotApi = require("./hubspot-api");
const AcademyPage = require("./academy-page");

require('dotenv').config()

class HubSpotPublisher {
  constructor(folder = 'academy'){
    if (!process.env.HUBSPOT_TOKEN) {
      throw new Error("You must provide the environment variable HUBSPOT_TOKEN.")
    }

    if (!process.env.HUBSPOT_CAMPAIGN_ID) {
      throw new Error("You must provide the environment variable HUBSPOT_CAMPAIGN_ID.")
    }

    this.folder = folder;
    this.hubSpotApi = new HubSpotApi(process.env.HUBSPOT_TOKEN, process.env.HUBSPOT_CAMPAIGN_ID);
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
    const { title, headHtml, bodyHtml, slug, metaDescription } = academyPage.getPageData();

    if(academyPage.hubSpotId) {
      return this.hubSpotApi.updatePage(
        academyPage.hubSpotId,
        {
          title,
          headHtml,
          bodyHtml,
          metaDescription
        }
      );
    }
    else {
      return this.hubSpotApi.createPage({
        title,
        headHtml,
        bodyHtml,
        metaDescription,
        slug
      });
    }
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

    console.log(`\n🏁 Uploaded ${pagesForHubSpotUpload.length} pages to HubSpot.\n`);

    const pagesToBeDeleted = pagesCurrentlyOnHubSpot.filter(pageCurrentlyOnHubSpot =>
      !pagesForHubSpotUpload.find(pageForHubSpotUpload => pageCurrentlyOnHubSpot.slug === pageForHubSpotUpload.slug)
    );

    if (pagesToBeDeleted.length) {
      // TODO: uncomment the below line to delete pages
      // await this.deletePages(pagesToBeDeleted);
      console.log(`Note: The following ${pagesToBeDeleted.length} pages were removed from Bitovi.com since they did not exist in the local project.`);
      pagesToBeDeleted.forEach(page => console.log(`  - ${page.slug}`));
    }
  }

  async deletePages(pagesToBeDeleted) {
    await Promise.all(pagesToBeDeleted.map(page => this.hubSpotApi.deletePage(page.id)));
  }
}

module.exports = HubSpotPublisher;