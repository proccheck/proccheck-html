import analyzer from '../analyzers/search-engine-optimization'

describe('Search engine optimization', () => {
  it('passing case', () => {
    expect(analyzer('./src/fixtures/rolland-garros.com.html')).toEqual({
      tooMuchH1: false,
      tooMuchStrong: false,
      missDescription: false,
      missKeywords: true,
      aWithoutRel: 108,
      missingAlt: 25
    });
  })
})
