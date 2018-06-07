import {
  MOVE_DOWN,
  MOVE_RIGHT,
  ENTITIES,
  changeGravityDirection,
  levelIsComplete,
} from '../../index';

describe('Level 1', () => {
  it('Matches the correct snapshot', () => {
    let gameState = [
      [
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 1 },
        },
        { staticEntity: { id: 3, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 4, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 5, entityId: ENTITIES.FLOOR }, movableEntity: null },
        {
          staticEntity: { id: 7, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 6 },
        },
      ],
    ];

    gameState = changeGravityDirection(gameState, MOVE_RIGHT);
    expect(levelIsComplete(gameState[gameState.length - 1])).toBe(true);
  });
});

describe('Level 2', () => {
  it('Matches the correct snapshot', () => {
    let gameState = [
      [
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 1 },
        },
        {
          staticEntity: { id: 4, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.GLASS, id: 3 },
        },
        { staticEntity: { id: 5, entityId: ENTITIES.FLOOR }, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 7, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 6 },
        },
        { staticEntity: { id: 8, entityId: ENTITIES.FLOOR }, movableEntity: null },
      ],
    ];

    gameState = changeGravityDirection(gameState, MOVE_RIGHT);
    expect(gameState).toMatchSnapshot();
    gameState = changeGravityDirection(gameState[gameState.length - 1], MOVE_DOWN);
    expect(gameState).toMatchSnapshot();
    expect(levelIsComplete(gameState[gameState.length - 1])).toBe(true);
  });
});

describe('Level 3', () => {
  it('Matches the correct snapshot', () => {
    let gameState = [
      [
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 1 },
        },
        { staticEntity: { id: 3, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 4, entityId: ENTITIES.FLOOR }, movableEntity: null },
      ],
      [
        { staticEntity: { id: 5, entityId: ENTITIES.FLOOR }, movableEntity: null },
        {
          staticEntity: { id: 7, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 6 },
        },
        { staticEntity: { id: 8, entityId: ENTITIES.FLOOR }, movableEntity: null },
      ],
      [
        { staticEntity: { id: 9, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 10, entityId: ENTITIES.FLOOR }, movableEntity: null },
        {
          staticEntity: { id: 12, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 11 },
        },
      ],
    ];

    gameState = changeGravityDirection(gameState, MOVE_DOWN);
    expect(levelIsComplete(gameState[gameState.length - 1])).toBe(true);
  });
});

describe('Level 4', () => {
  it('Matches the correct snapshot', () => {
    let gameState = [
      [
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#0000ff', id: 1 },
        },
        { staticEntity: { id: 3, entityId: ENTITIES.FLOOR }, movableEntity: null },
        {
          staticEntity: { id: 5, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 4 },
        },
        { staticEntity: { id: 6, entityId: ENTITIES.FLOOR }, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: { id: 7, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 8, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 9, entityId: ENTITIES.FLOOR }, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 11, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#0000ff', id: 10 },
        },
        { staticEntity: { id: 12, entityId: ENTITIES.FLOOR }, movableEntity: null },
        {
          staticEntity: { id: 14, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 13 },
        },
      ],
    ];

    gameState = changeGravityDirection(gameState, MOVE_RIGHT);
    expect(gameState).toMatchSnapshot();
    gameState = changeGravityDirection(gameState[gameState.length - 1], MOVE_DOWN);
    expect(gameState).toMatchSnapshot();
    expect(levelIsComplete(gameState[gameState.length - 1])).toBe(true);
  });
});

describe('Level 5', () => {
  it('Matches the correct snapshot', () => {
    let gameState = [
      [
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 1 },
        },
        {
          staticEntity: { id: 4, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#00ff00', id: 3 },
        },
        {
          staticEntity: { id: 6, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 5 },
        },
        {
          staticEntity: { id: 8, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#00ff00', id: 7 },
        },
        {
          staticEntity: { id: 10, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 9 },
        },
        { staticEntity: null, movableEntity: null },
      ],
      [
        {
          staticEntity: { id: 12, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#0000ff', id: 11 },
        },
        { staticEntity: { id: 13, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 14, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 15, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 16, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 17, entityId: ENTITIES.FLOOR }, movableEntity: null },
        {
          staticEntity: { id: 19, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#0000ff', id: 18 },
        },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 21, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#00ff00', id: 20 },
        },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 23, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#00ff00', id: 22 },
        },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
    ];

    gameState = changeGravityDirection(gameState, MOVE_DOWN);
    expect(gameState).toMatchSnapshot();
    gameState = changeGravityDirection(gameState[gameState.length - 1], MOVE_RIGHT);
    expect(gameState).toMatchSnapshot();
    expect(levelIsComplete(gameState[gameState.length - 1])).toBe(true);
  });
});
