import { MOVE_RIGHT, ENTITIES, changeGravityDirection, levelIsComplete } from '../src/index';

describe('Barrier entity', () => {
  describe('Colorless barrier entity', () => {
    it('Should block all movable entities from passing when powered', () => {
      const gameState = [
        [
          {
            staticEntity: { entityId: ENTITIES.FLOOR, id: 2 },
            movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 1 },
          },
          {
            staticEntity: { entityId: ENTITIES.BARRIER, powered: true, id: 3 },
            movableEntity: null,
          },
          {
            staticEntity: { entityId: ENTITIES.FLOOR, id: 5 },
            movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 4 },
          },
        ],
      ];

      const gameStates = changeGravityDirection(gameState, MOVE_RIGHT);

      expect(gameStates).toMatchSnapshot();
      expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(false);
    });

    it('Should allow movable entities to pass when unpowered', () => {
      const gameState = [
        [
          {
            staticEntity: { entityId: ENTITIES.FLOOR, id: 2 },
            movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 1 },
          },
          {
            staticEntity: { entityId: ENTITIES.BARRIER, powered: false, id: 3 },
            movableEntity: null,
          },
          {
            staticEntity: { entityId: ENTITIES.FLOOR, id: 5 },
            movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 4 },
          },
        ],
      ];

      const gameStates = changeGravityDirection(gameState, MOVE_RIGHT);

      expect(gameStates).toMatchSnapshot();
      expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(true);
    });
  });

  describe('Colorled barrier entity', () => {
    it('Should block all movable entities from passing when powered', () => {
      const gameState = [
        [
          {
            staticEntity: { entityId: ENTITIES.FLOOR, id: 2 },
            movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 1 },
          },
          {
            staticEntity: {
              entityId: ENTITIES.BARRIER,
              powered: true,
              color: '#0000ff',
              id: 3,
            },
            movableEntity: null,
          },
          {
            staticEntity: { entityId: ENTITIES.FLOOR, id: 5 },
            movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 4 },
          },
        ],
      ];

      const gameStates = changeGravityDirection(gameState, MOVE_RIGHT);

      expect(gameStates).toMatchSnapshot();
      expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(false);
    });

    it('Should allow movable entities with a matching color to pass even when powered', () => {
      const gameState = [
        [
          {
            staticEntity: { entityId: ENTITIES.FLOOR, id: 2 },
            movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 1 },
          },
          {
            staticEntity: {
              entityId: ENTITIES.BARRIER,
              powered: true,
              color: '#ff0000',
              id: 3,
            },
            movableEntity: null,
          },
          {
            staticEntity: { entityId: ENTITIES.FLOOR, id: 5 },
            movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 4 },
          },
        ],
      ];

      const gameStates = changeGravityDirection(gameState, MOVE_RIGHT);

      expect(gameStates).toMatchSnapshot();
      expect(levelIsComplete(gameStates[gameStates.length - 1])).toBe(true);
    });
  });
});
