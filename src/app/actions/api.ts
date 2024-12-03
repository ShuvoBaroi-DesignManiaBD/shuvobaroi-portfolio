"use server";

import envConfig from "@/config";

export async function getPageInfo({ pageName }:{ pageName: string }) {
    // Next.js will cache the result of this server-side fetch request
    const response = await fetch(envConfig.baseApi + `/pages?filters[title][$eq]=${pageName}&populate[0]=section&populate[1]=section.sub_section.icon_or_image&populate[2]=section.sub_section.images&populate[3]=section.buttons&populate[4]=section.experience.experience_item.logo&populate[5]=section.my_approaches`, {
        // set up for on-demand server cache invalidation
        next: { tags: ['page'] },
    })
    const data = await response.json()
    const pageData = data.data

    // console.log("====== pageData =====",pageData);
    
    // Feed the server fetched data into DiscussionList as a prop
    return pageData;
    
}

export async function getArticles({ page, pageSize }:{ page: string, pageSize: string }) {
    // Next.js will cache the result of this server-side fetch request
    const response = await fetch(envConfig.baseApi + `/articles?populate=*&pagination[pageSize]=${pageSize}&pagination[page]=${page}`, {
        // set up for on-demand server cache invalidation
        next: { tags: ['articles'] },
    })
    const data = await response.json()
    const articles = data.data

    // console.log("====== articles =====", articles);
    
    // Feed the server fetched data into DiscussionList as a prop
    return articles;
}

export async function getAArticle({ slug}:{ slug: any }) {
    // Next.js will cache the result of this server-side fetch request
    const response = await fetch(envConfig.baseApi + `/articles?filters[slug][$eq]=${slug}&populate=*`, {
        // set up for on-demand server cache invalidation
        next: { tags: ['singleArticle'] },
    })
    const data = await response.json()
    const articles = data?.data;

    console.log("====== article =====", articles);
    
    // Feed the server fetched data into DiscussionList as a prop
    return articles;
}

export async function getSiteInfo() {
    // Next.js will cache the result of this server-side fetch request
    const response = await fetch(envConfig.baseApi + '/global?populate[0]=global_sections&populate[1]=global_sections.logo&populate[2]=global_sections.menu&populate[3]=global_sections.menu.page&populate[4]=favicon&populate[5]=global_sections.social_media.logo', {
        // set up for on-demand server cache invalidation
        next: { tags: ['siteinfoData'] },
    })
    const data = await response.json()
    const siteInfo = data

    const seoData = {
      title: siteInfo?.siteName || "Shuvo's Portfolio",
      description: siteInfo?.siteDescription || "Modern & Minimal JS Mastery Portfolio",
    }

    // console.log("====== SEOData =====",seoData, data);
    
    // Feed the server fetched data into DiscussionList as a prop
    return {...seoData, ...siteInfo};
    
}