import {
  MOVE_UP,
  MOVE_RIGHT,
  MOVE_DOWN,
  MOVE_LEFT,
  ENTITIES,
  changeGravityDirection,
} from '../index';

describe('Movable entity', () => {
  let gameState;

  beforeEach(() => {
    gameState = [
      [
        { staticEntity: { id: 1, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 2, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 3, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 4, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 5, entityId: ENTITIES.FLOOR }, movableEntity: null },
      ],
      [
        { staticEntity: { id: 6, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 7, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 8, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 9, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 10, entityId: ENTITIES.FLOOR }, movableEntity: null },
      ],
      [
        { staticEntity: { id: 11, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 12, entityId: ENTITIES.FLOOR }, movableEntity: null },
        {
          staticEntity: { id: 14, entityId: ENTITIES.FLOOR },
          movableEntity: { id: 13, entityId: ENTITIES.BLOCK },
        },
        { staticEntity: { id: 15, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 16, entityId: ENTITIES.FLOOR }, movableEntity: null },
      ],
      [
        { staticEntity: { id: 17, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 18, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 19, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 20, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 21, entityId: ENTITIES.FLOOR }, movableEntity: null },
      ],
      [
        { staticEntity: { id: 22, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 23, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 24, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 25, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 26, entityId: ENTITIES.FLOOR }, movableEntity: null },
      ],
    ];
  });

  it('Should move up over free tiles', () => {
    const gameStates = changeGravityDirection(gameState, MOVE_UP);

    expect(gameStates).toMatchSnapshot();
  });

  it('Should move right over free tiles', () => {
    const gameStates = changeGravityDirection(gameState, MOVE_RIGHT);

    expect(gameStates).toMatchSnapshot();
  });

  it('Should move down over free tiles', () => {
    const gameStates = changeGravityDirection(gameState, MOVE_DOWN);

    expect(gameStates).toMatchSnapshot();
  });

  it('Should move left over free tiles', () => {
    const gameStates = changeGravityDirection(gameState, MOVE_LEFT);

    expect(gameStates).toMatchSnapshot();
  });

  it('Should block other entities', () => {
    gameState = [
      [{ staticEntity: { id: 1, entityId: ENTITIES.FLOOR }, movableEntity: null }],
      [
        {
          staticEntity: { id: 3, entityId: ENTITIES.FLOOR },
          movableEntity: { id: 2, entityId: ENTITIES.BLOCK },
        },
      ],
      [
        {
          staticEntity: { id: 5, entityId: ENTITIES.FLOOR },
          movableEntity: { id: 4, entityId: ENTITIES.GLASS },
        },
      ],
      [{ staticEntity: { id: 6, entityId: ENTITIES.FLOOR }, movableEntity: null }],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_DOWN);

    expect(gameStates).toMatchSnapshot();
  });
});
