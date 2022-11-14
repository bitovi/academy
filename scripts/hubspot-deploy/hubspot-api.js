const axios = require('axios');
const Bottleneck = require("bottleneck");

const ACADEMY_CAMPAIGN_ID = '5f0d7917-50ea-4ed4-84c8-85e6965c18db';

var rawStart = "{% raw %}",
    rawEnd = "{% endraw %}";

class HubSpotApi {
  constructor(apiKey){
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.hubapi.com/content/api/v2/pages';
    this.limiter = new Bottleneck({minTime: 150})
  }

  makeRequest(method, url, data){
    return this.limiter.schedule(() => axios({ method, url, data })
      .catch(error => {
        console.error(`Error on page ${data.name}: ${error}`);
      }));
  }

  async getPages(){
    const url = `${this.baseUrl}?hapikey=${this.apiKey}&campaign=${ACADEMY_CAMPAIGN_ID}&limit=1000000`;
    const response = await this.makeRequest('GET', url, {});
    return response.data.objects.map(page => ({
      campaign: page.campaign,
      id: page.id,
      slug: page.slug
    })).filter(page => page.campaign === ACADEMY_CAMPAIGN_ID && page.slug.includes('academy'));
  }

  async createPage( {title, headHtml, bodyHtml, slug, metaDescription } ){
    const url = `${this.baseUrl}?hapikey=${this.apiKey}`;
    const data = {
      name: title,
      template_path: 'Custom/Page/Bitovi_July_2016_Theme/Academy.html',
      slug: `${slug}`,
      html_title: title,
      is_draft: false,
      publish_immediately: true,
      footer_html: rawStart+ bodyHtml + rawEnd,
      head_html: headHtml,
      campaign: ACADEMY_CAMPAIGN_ID,
      subcategory: 'site_page',
      meta_description: metaDescription || ""
    };
    const response = await this.makeRequest('POST', url, data)
    return this.publishPage(response.data.id);
  }

  async updatePage(pageId, {title, headHtml, bodyHtml, metaDescription }){
    const url = `${this.baseUrl}/${pageId}?hapikey=${this.apiKey}`;
    const data = {
      name: title,
      html_title: title,
      footer_html: rawStart+ bodyHtml + rawEnd,
      head_html: headHtml,
      meta_description: metaDescription || ""
    }
    try {
      const response =  await this.makeRequest('PUT', url, data);
      console.log("Success! Updated page:", response.data.name);
      return response;
    } catch(error) {
      console.error(error);
      throw error;
    }
  }

  async publishPage(pageId){
    const url = `${this.baseUrl}/${pageId}/publish-action?hapikey=${this.apiKey}`;
    const data = {
      action: 'schedule-publish'
    }
    const response = await this.makeRequest('POST', url, data);
    console.log("Success! Created and published page:", response.data.name || (" no name - "+pageId));
    return response;
  }

  async deletePage(pageId){
    const url = `${this.baseUrl}/${pageId}?hapikey=${this.apiKey}`;
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
