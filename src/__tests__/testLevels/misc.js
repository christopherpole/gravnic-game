import { MOVE_DOWN, MOVE_RIGHT, ENTITIES, changeGravityDirection } from '../../index';

describe('Level 1', () => {
  it('Matches the correct snapshot', () => {
    const gameState = [
      [
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR },
          movableEntity: { id: 1, entityId: ENTITIES.BLOCK },
        },
        { staticEntity: null, movableEntity: null },
      ],
      [
        { staticEntity: { id: 3, entityId: ENTITIES.FLOOR }, movableEntity: null },
        {
          staticEntity: { id: 5, entityId: ENTITIES.FLOOR },
          movableEntity: { id: 4, entityId: ENTITIES.GLASS },
        },
        { staticEntity: null, movableEntity: null },
      ],
      [
        { staticEntity: { id: 6, entityId: ENTITIES.FLOOR }, movableEntity: null },
        {
          staticEntity: { id: 8, entityId: ENTITIES.FLOOR },
          movableEntity: { id: 7, entityId: ENTITIES.GLASS },
        },
        {
          staticEntity: { id: 10, entityId: ENTITIES.FLOOR },
          movableEntity: { id: 9, entityId: ENTITIES.BLOCK },
        },
      ],
      [
        { staticEntity: { id: 11, entityId: ENTITIES.FLOOR }, movableEntity: null },
        {
          staticEntity: { id: 13, entityId: ENTITIES.FLOOR },
          movableEntity: { id: 12, entityId: ENTITIES.BLOCK },
        },
        { staticEntity: null, movableEntity: null },
      ],
      [
        {
          staticEntity: { id: 15, entityId: ENTITIES.FLOOR },
          movableEntity: { id: 14, entityId: ENTITIES.BLOCK },
        },
        { staticEntity: { id: 16, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
    ];

    expect(changeGravityDirection(gameState, MOVE_DOWN)).toMatchSnapshot();
  });
});

describe('Level 2', () => {
  it('Matches the correct snapshot', () => {
    let gameState = [
      [
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR },
          movableEntity: { id: 1, entityId: ENTITIES.BLOCK },
        },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: { id: 3, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 4, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        {
          staticEntity: { id: 6, entityId: ENTITIES.FLOOR },
          movableEntity: { id: 5, entityId: ENTITIES.BLOCK },
        },
        { staticEntity: { id: 7, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 8, entityId: ENTITIES.FLOOR }, movableEntity: null },
        {
          staticEntity: { id: 10, entityId: ENTITIES.FLOOR },
          movableEntity: { id: 9, entityId: ENTITIES.BLOCK },
        },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: { id: 11, entityId: ENTITIES.FLOOR }, movableEntity: null },
        {
          staticEntity: { id: 13, entityId: ENTITIES.FLOOR },
          movableEntity: { id: 12, entityId: ENTITIES.BLOCK },
        },
        { staticEntity: null, movableEntity: null },
      ],
    ];

    gameState = changeGravityDirection(gameState, MOVE_DOWN);
    expect(gameState).toMatchSnapshot();
    expect(changeGravityDirection(gameState[gameState.length - 1], MOVE_RIGHT)).toMatchSnapshot();
  });
});
