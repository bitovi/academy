const axios = require('axios');
const Bottleneck = require("bottleneck");

var rawStart = "{% raw %}",
    rawEnd = "{% endraw %}";

class HubSpotApi {
  constructor(accessToken, campaignId){
    this.accessToken = accessToken;
    this.campaignId = campaignId;
    this.baseUrl = 'https://api.hubapi.com/cms/v3/pages/site-pages';
    this.limiter = new Bottleneck({minTime: 150}),
    this.axios = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${this.accessToken}`,
      },
    });
  }

  makeRequest(method, url, data){
      return this.limiter.schedule(() => this.axios({ method, url, data })
      .catch(error => {
        if (data.name) {
          console.error(`Error on page ${data.name}`);
        }

        console.error(`Error ${error.response.status}: ${error.response.statusText}`);
        console.error(error.response.data);

        throw error;
      }));  
  }

  async getAllPaginatedResults(method, url, results = []) {
    try {
      const { data } = await this.makeRequest(method, url, {});
      results = results.concat(data.results)
      if (data.paging && data.paging.next) {
        return this.getAllPaginatedResults(method, data.paging.next.link, results)
      }
      return results
    } catch (error) {
      throw new Error('There was an error while fetching all paginated results. See `getAllPaginatedResults` in `hubspot-api.js` for more details.')
    }
  }

  async getPages(){
    const url = `?campaign=${this.campaignId}&limit=100`;
    const results = await this.getAllPaginatedResults('GET', url, []);

    const pageData = results.map(page => ({
      campaign: page.campaign,
      id: page.id,
      slug: page.slug
    }))
    const pages = pageData.filter(page => page.campaign === this.campaignId && page.slug.includes('academy'));

    return pages;
  }

  async createPage( {title, headHtml, bodyHtml, slug, metaDescription } ){
    const data = {
      name: title,
      templatePath: 'Custom/Page/Bitovi_July_2016_Theme/Academy.hubl.html',
      slug: `${slug}`,
      htmlTitle: title,
      currentState: 'PUBLISHED',
      publishImmediately: true,
      academyContent: rawStart + bodyHtml + rawEnd,
      headHtml,
      campaign: this.campaignId,
      subcategory: 'site_page',
      metaDescription: metaDescription || ""
    };
    const response = await this.makeRequest('POST', '', data)
    return this.publishPage(response.data.id);
  }

  async updatePage(pageId, {title, headHtml, bodyHtml, metaDescription }){
    const url = `/${pageId}`;
    const data = {
      name: title,
      htmlTitle: title,
      academyContent: rawStart + bodyHtml + rawEnd,
      headHtml,
      currentState: 'PUBLISHED',
      metaDescription: metaDescription || "",
      campaign: this.campaignId
    }
    try {
      const response =  await this.makeRequest('PATCH', url, data);
      console.log("✅ Updated", response.data.slug);
      return response;
    } catch(error) {
      console.error('error during `updatePage` in `hubspot-api.js`');
      throw error;
    }
  }

  async publishPage(pageId){
    const url = `/${pageId}/publish-action`;
    const data = {
      action: 'schedule-publish'
    }
    const response = await this.makeRequest('POST', url, data);
    console.log("Success! Created and published page:", response.data.name || (" no name - "+pageId));
    return response;
  }

  async deletePage(pageId){
    const url = `/${pageId}`;
    const response = await this.makeRequest('DELETE', url, {})
    console.log("Success! Deleted page:", response.id);
    return response;
  }

  async deleteAllPages(){
    const pageIds = (await this.getPages()).map(page => page.id);
    pageIds.forEach(pageId => this.deletePage(pageId));
  }
}

module.exports = HubSpotApi;

/*
Get Pages
  docs: https://developers.hubspot.com/docs/methods/pages/get_pages
  endpoint: GET https://api.hubapi.com/content/api/v2/pages?hapikey=mykey
Create Page
  docs: https://developers.hubspot.com/docs/methods/pages/post_pages
  endpoint: POST https://api.hubapi.com/content/api/v2/pages?hapikey=mykey
    body: {
      "name": "Internal HubSpot Page Name",
      "template_path": "Custom/Academy/academy-template.html",
      "slug": "academy/custom/slug",
      "html_title": "title in the <title /> tags",
      "is_draft": false,
      "publish_immediately": true,
      "footer_html": "put all html for the file in here",
      "head_html": "put any custom meta tags or asset links"
    }
    manage/site/domain/all/listing/all
Publish Page
  docs: https://developers.hubspot.com/docs/methods/pages/post_pages_page_id_publish_action
  endpoint: POST https://api.hubapi.com/content/api/v2/pages/:page_id/publish-action?hapikey=mykey
    body: {
      "action": "schedule-publish"
    }
*/
