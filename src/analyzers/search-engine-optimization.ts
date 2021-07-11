/*!
 * Copyright 2019
 */

const seo = require('search-engine-optimization');

/**
 * Seo module methods to get the data.
 */
export const matchingData: any = {

  /**
   * Detect nbr of images without alt attribute.
   */
  detectImgWithoutAlt: (result: string) => {
    const matching: string[] | null = result
      .match(/There are ([0-9]+) <img> tag without alt attribute/);
    const missingAlt: number = matching && matching.length >= 1
      ? parseInt(matching[1], 10)
      : 0;
    return {
      missingAlt,
    };
  },

  /**
   * Detect nbr of <a>> without rel attribute.
   */
  detectAWithoutRel: (result: string) => {
    const matching: string[] | null = result
      .match(/There are ([0-9]+) <a> tag without rel attribute/);
    const aWithoutRel: number = matching && matching.length >= 1
      ? parseInt(matching[1], 10)
      : 0;
    return {
      aWithoutRel,
    };
  },

  /**
   * Detect missing "standard" meta tags(keywords, description).
   */
  detectHead: (result: string) => {
    const matchingKeywords: string[] | null = result
      .match(/This HTML without <meta name=\"keywords\" ... /);
    const missKeywords: boolean = !!(matchingKeywords && matchingKeywords.length >= 1);
    const matchingDesc: string[] | null = result
      .match(/This HTML without <meta name=\"descriptions\" ... /);
    const missDescription: boolean = !!(matchingDesc && matchingDesc.length >= 1);
    return {
      missDescription,
      missKeywords,
    };
  },

  /**
   * Detect over use of <strong> on a page.
   */
  detectStrongMoreThanNum: (result: string) => {
    const matching: string[] | null = result
      .match(/This HTML have more than 15 \<strong\> tag/);
    const strongBalises: boolean = !!(matching && matching.length >= 1);
    return {
      tooMuchStrong: strongBalises,
    };
  },

  /**
   * Detect an over use of <h1>
   */
  detectH1MoreThanOne: (result: string) => {
    const matching: string[] | null = result
      .match(/This HTML have more than one \<h1\>tag/);
    const tooMuchH1: boolean = !!(matching && matching.length >= 1);
    return {
      tooMuchH1,
    };
  },
};

/**
 * Analyze html file through 'search-engine-optimization'.
 *
 * @param htmlFile
 *   html filename to analyze.
 */
export const analyzer = (htmlFile: string) => {
  const output = new seo.readFile(htmlFile);
  const res = Object.keys(matchingData).reduce((acc, seoActionKey) => {
    output.result = '';
    output[seoActionKey]();
    return Object.assign(matchingData[seoActionKey](output.result), acc);
  },                                           {});
  return res;
};

export default analyzer;
