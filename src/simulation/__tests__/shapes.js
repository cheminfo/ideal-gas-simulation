import Body from '../Body';

describe('test shapes', function () {
    describe('test circle', function () {
        it('should return the correct AABB', function () {
            const body = new Body({
                position: [1, 1]
            });
            expect(body.getAABB()).toEqual([[1,1], [1, 1]]);
            body.setShape('circle', 2);
            expect(body.getAABB()).toEqual([[-1, -1],[3, 3]]);
        });
    });
});