import { MOVE_UP, ENTITIES, changeGravityDirection } from '../index';

describe('Block entity', () => {
  it('Should match with other blocks', () => {
    const gameState = [
      [
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR },
          movableEntity: { id: 1, entityId: ENTITIES.BLOCK },
        },
      ],
      [{ staticEntity: { id: 3, entityId: ENTITIES.FLOOR }, movableEntity: null }],
      [
        {
          staticEntity: { id: 5, entityId: ENTITIES.FLOOR },
          movableEntity: { id: 4, entityId: ENTITIES.BLOCK },
        },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_UP);

    expect(gameStates).toMatchSnapshot();
  });

  it('Should wait until all blocks have stopped moving before matching', () => {
    const gameState = [
      [
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR },
          movableEntity: { id: 1, entityId: ENTITIES.BLOCK },
        },
      ],
      [{ staticEntity: { id: 3, entityId: ENTITIES.FLOOR }, movableEntity: null }],
      [
        {
          staticEntity: { id: 5, entityId: ENTITIES.FLOOR },
          movableEntity: { id: 4, entityId: ENTITIES.BLOCK },
        },
      ],
      [{ staticEntity: { id: 6, entityId: ENTITIES.FLOOR }, movableEntity: null }],
      [{ staticEntity: { id: 7, entityId: ENTITIES.FLOOR }, movableEntity: null }],
      [{ staticEntity: { id: 8, entityId: ENTITIES.FLOOR }, movableEntity: null }],
      [{ staticEntity: { id: 9, entityId: ENTITIES.FLOOR }, movableEntity: null }],
      [
        {
          staticEntity: { id: 11, entityId: ENTITIES.FLOOR },
          movableEntity: { id: 10, entityId: ENTITIES.BLOCK },
        },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_UP);

    expect(gameStates).toMatchSnapshot();
  });

  it('Should match more than two blocks', () => {
    const gameState = [
      [
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR },
          movableEntity: { id: 1, entityId: ENTITIES.BLOCK },
        },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 4, entityId: ENTITIES.FLOOR },
          movableEntity: { id: 3, entityId: ENTITIES.BLOCK },
        },
      ],
      [
        { staticEntity: { id: 5, entityId: ENTITIES.FLOOR }, movableEntity: null },
        {
          staticEntity: { id: 7, entityId: ENTITIES.FLOOR },
          movableEntity: { id: 6, entityId: ENTITIES.BLOCK },
        },
        { staticEntity: { id: 8, entityId: ENTITIES.FLOOR }, movableEntity: null },
      ],
      [
        { staticEntity: { id: 9, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 10, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 11, entityId: ENTITIES.FLOOR }, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 13, entityId: ENTITIES.FLOOR },
          movableEntity: { id: 12, entityId: ENTITIES.BLOCK },
        },
        { staticEntity: null, movableEntity: null },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_UP);

    expect(gameStates).toMatchSnapshot();
  });
});
