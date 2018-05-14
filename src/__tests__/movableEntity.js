import { MOVE_UP, MOVE_RIGHT, MOVE_DOWN, MOVE_LEFT, changeGravityDirection } from '../index';

describe('Movable entity', () => {
  let gameState;

  beforeEach(() => {
    gameState = [
      [
        { staticEntity: { id: 1, entityId: 'ENTITY_FLOOR' }, movableEntity: null },
        { staticEntity: { id: 2, entityId: 'ENTITY_FLOOR' }, movableEntity: null },
        { staticEntity: { id: 3, entityId: 'ENTITY_FLOOR' }, movableEntity: null },
        { staticEntity: { id: 4, entityId: 'ENTITY_FLOOR' }, movableEntity: null },
        { staticEntity: { id: 5, entityId: 'ENTITY_FLOOR' }, movableEntity: null },
      ],
      [
        { staticEntity: { id: 6, entityId: 'ENTITY_FLOOR' }, movableEntity: null },
        { staticEntity: { id: 7, entityId: 'ENTITY_FLOOR' }, movableEntity: null },
        { staticEntity: { id: 8, entityId: 'ENTITY_FLOOR' }, movableEntity: null },
        { staticEntity: { id: 9, entityId: 'ENTITY_FLOOR' }, movableEntity: null },
        { staticEntity: { id: 10, entityId: 'ENTITY_FLOOR' }, movableEntity: null },
      ],
      [
        { staticEntity: { id: 11, entityId: 'ENTITY_FLOOR' }, movableEntity: null },
        { staticEntity: { id: 12, entityId: 'ENTITY_FLOOR' }, movableEntity: null },
        {
          staticEntity: { id: 14, entityId: 'ENTITY_FLOOR' },
          movableEntity: { id: 13, entityId: 'ENTITY_BLOCK' },
        },
        { staticEntity: { id: 15, entityId: 'ENTITY_FLOOR' }, movableEntity: null },
        { staticEntity: { id: 16, entityId: 'ENTITY_FLOOR' }, movableEntity: null },
      ],
      [
        { staticEntity: { id: 17, entityId: 'ENTITY_FLOOR' }, movableEntity: null },
        { staticEntity: { id: 18, entityId: 'ENTITY_FLOOR' }, movableEntity: null },
        { staticEntity: { id: 19, entityId: 'ENTITY_FLOOR' }, movableEntity: null },
        { staticEntity: { id: 20, entityId: 'ENTITY_FLOOR' }, movableEntity: null },
        { staticEntity: { id: 21, entityId: 'ENTITY_FLOOR' }, movableEntity: null },
      ],
      [
        { staticEntity: { id: 22, entityId: 'ENTITY_FLOOR' }, movableEntity: null },
        { staticEntity: { id: 23, entityId: 'ENTITY_FLOOR' }, movableEntity: null },
        { staticEntity: { id: 24, entityId: 'ENTITY_FLOOR' }, movableEntity: null },
        { staticEntity: { id: 25, entityId: 'ENTITY_FLOOR' }, movableEntity: null },
        { staticEntity: { id: 26, entityId: 'ENTITY_FLOOR' }, movableEntity: null },
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

  it('Should be blocked by other movable entities', () => {
    gameState = [
      [
        {
          staticEntity: { id: 2, entityId: 'ENTITY_FLOOR' },
          movableEntity: { id: 1, entityId: 'ENTITY_BLOCK' },
        },
      ],
      [{ staticEntity: { id: 3, entityId: 'ENTITY_FLOOR' }, movableEntity: null }],
      [
        {
          staticEntity: { id: 5, entityId: 'ENTITY_FLOOR' },
          movableEntity: { id: 4, entityId: 'ENTITY_BLOCK' },
        },
      ],
    ];

    const gameStates = changeGravityDirection(gameState, MOVE_UP);

    expect(gameStates).toMatchSnapshot();
  });
});
