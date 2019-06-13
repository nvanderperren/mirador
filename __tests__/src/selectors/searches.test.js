import {
  getSearchResultsForWindow,
  getSearchHitsForCompanionWindow,
  getSearchAnnotationsForWindow,
} from '../../../src/state/selectors';

describe('getSearchResultsForWindow', () => {
  const companionWindowId = 'cwid';

  it('returns flattened results for a manifest', () => {
    const state = {
      searches: {
        a: {
          [companionWindowId]: {
            json: { foo: 'bar' },
          },
        },
        b: {
          [companionWindowId]: {
            json: { foo: 'bar' },
          },
        },
      },
    };
    expect(
      getSearchResultsForWindow(state, { windowId: 'a' }),
    ).toEqual({
      cwid: { json: { foo: 'bar' } },
    });
    expect(
      getSearchResultsForWindow({}, { windowId: 'a' }),
    ).toEqual([]);
  });
});

describe('getSearchHitsForCompanionWindow', () => {
  const companionWindowId = 'cwid';
  it('returns flattened hits for a manifest', () => {
    const state = {
      searches: {
        a: {
          [companionWindowId]: {
            json: { hits: [1, 2, 3] },
          },
        },
        b: {
          [companionWindowId]: {
            json: { foo: 'bar' },
          },
        },
      },
    };
    expect(
      getSearchHitsForCompanionWindow(state, { companionWindowId, windowId: 'a' }),
    ).toEqual([1, 2, 3]);
    expect(
      getSearchHitsForCompanionWindow(state, { companionWindowId, windowId: 'b' }),
    ).toEqual([]);
    expect(
      getSearchHitsForCompanionWindow({}, { companionWindowId, windowId: 'a' }),
    ).toEqual([]);
  });
});

describe('getSearchAnnotationsForWindow', () => {
  const companionWindowId = 'cwid';

  it('returns results for a manifest', () => {
    const state = {
      searches: {
        a: {
          [companionWindowId]: {
            json: { '@id': 'yolo', resources: [{ '@id': 'annoId2' }] },
          },
        },
        b: {
          [companionWindowId]: {
            json: { foo: 'bar' },
          },
        },
      },
    };
    expect(
      getSearchAnnotationsForWindow(state, { companionWindowId, windowId: 'a' }),
    ).toEqual([{
      id: 'yolo',
      resources: [{ resource: { '@id': 'annoId2' } }],
    }]);
    expect(
      getSearchAnnotationsForWindow(state, { companionWindowId, windowId: 'b' }),
    ).toEqual([]);
    expect(
      getSearchAnnotationsForWindow({}, { companionWindowId, windowId: 'a' }),
    ).toEqual([]);
    expect(
      getSearchAnnotationsForWindow({}, { windowId: 'a' }),
    ).toEqual([]);
  });
});