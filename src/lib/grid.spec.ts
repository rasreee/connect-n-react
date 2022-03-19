import {
  getAdjacencyKey,
  getCoordsString,
  getCoordsStrings,
  Grid,
  initializeAdjacencyMatrix,
} from './grid';

/**
 * @group grid
 * @group unit
 */

describe('lib/grid unit tests', () => {
  it('getCoordsStrings()', () => {
    const result = getCoordsStrings(2, 2);

    expect(result).toEqual([
      getCoordsString(0, 0),
      getCoordsString(0, 1),
      getCoordsString(1, 0),
      getCoordsString(1, 1),
    ]);
  });

  it('initializeAdjacencyMatrix()', () => {
    const result = initializeAdjacencyMatrix(2, 2);

    expect(result).toEqual({
      [getAdjacencyKey([0, 0], [0, 1])]: false,
      [getAdjacencyKey([0, 0], [1, 0])]: false,
      [getAdjacencyKey([0, 0], [1, 1])]: false,
      [getAdjacencyKey([0, 1], [0, 0])]: false,
      [getAdjacencyKey([0, 1], [1, 0])]: false,
      [getAdjacencyKey([0, 1], [1, 1])]: false,
      [getAdjacencyKey([1, 0], [0, 0])]: false,
      [getAdjacencyKey([1, 0], [0, 1])]: false,
      [getAdjacencyKey([1, 0], [1, 1])]: false,
      [getAdjacencyKey([1, 1], [0, 0])]: false,
      [getAdjacencyKey([1, 1], [0, 1])]: false,
      [getAdjacencyKey([1, 1], [1, 0])]: false,
    });
  });
});

/**
 * @group lib
 * @group grid
 */
describe('lib/grid', () => {
  it('initializes a grid of given size', () => {
    const result = new Grid(2, 2);

    expect(result.columnCount).toEqual(2);
    expect(result.rowCount).toEqual(2);
    expect(
      result.data
        .map((column) => column.map((point) => point.value))
        .flat()
        .every((value) => value === null)
    ).toBeTruthy();
  });

  it('should set value at (column, row)', () => {
    const grid = new Grid(2, 2);

    grid.setPoint(0, 0, 'foo');
    expect(grid.getPoint(0, 0).value).toEqual('foo');

    grid.setPoint(0, 0, null);
    expect(grid.getPoint(0, 0).value).toEqual(null);
  });

  it('should clear grid', () => {
    const grid = new Grid(2, 2);

    grid.setPoint(0, 0, 'foo');
    grid.setPoint(1, 0, 'foo');
    grid.setPoint(0, 1, 'foo');
    grid.setPoint(1, 1, 'foo');

    grid.clear();

    expect(
      grid.data.every((column) => column.every((point) => point.value === null))
    ).toBeTruthy();
  });
});
