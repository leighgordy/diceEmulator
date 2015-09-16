/*global assert*/
(function () {
  'use strict';

  var id = 'test-target';
  var diceEmulator = null;
  var targetElement = null;


  describe('Test Dice Object', function () {

      describe('Test Utility Methods', function () {

        describe('Test Extend', function () {
          it('Test extends merges two empty object literals', function () {
              var dice = new Dice();
              var newSettings = dice.extend({}, {});
              assert.equal(newSettings, newSettings);
          });

          it('Test the method extends merges two object literals correctly', function () {
              var dice = new Dice();
              var newSettings = dice.extend({'a': 'this should not appear', 'b': 'this should appear for b'}, {'a': 'this should appear for a', 'c': 'this should appear for c'});
              assert.equal(newSettings.a, 'this should appear for a');
              assert.equal(newSettings.b, 'this should appear for b');
              assert.equal(newSettings.c, 'this should appear for c');
          });
        });
    });
    describe('Test Constructor', function () {
        it('Test empty consctructor', function () {
            var dice = new Dice(); // will create a line if no arguements are given
            assert.isNotNull(dice.pattern.nodes, 'There should always be nodes');
            assert.equal(dice.pattern.nodes.length,2);
            assert.equal(dice.pattern.nodes[0].x, -100);
            assert.equal(dice.pattern.nodes[0].y, -100);
            assert.equal(dice.pattern.nodes[0].z, -100);
            
            assert.isNotNull(dice.pattern.edges, 'There should always be edges');
            assert.equal(dice.pattern.edges.length,1);
            assert.equal(dice.pattern.edges[0][0], 0);
            assert.equal(dice.pattern.edges[0][1], 1);
        });
        
        it('Test empty consctructor with only nodes', function () {
            var dice = new Dice({nodes:[{
                x : 1,
                y : 2,
                z : 3
            }, {
                x : 4,
                y : 5,
                z : 6
            }]});
            
            assert.isNotNull(dice.pattern.nodes, 'There should always be nodes');
            assert.equal(dice.pattern.nodes[0].x, 1);
            assert.equal(dice.pattern.nodes[0].y, 2);
            assert.equal(dice.pattern.nodes[0].z, 3);
            assert.equal(dice.pattern.nodes[1].x, 4);
            assert.equal(dice.pattern.nodes[1].y, 5);
            assert.equal(dice.pattern.nodes[1].z, 6);
            
            assert.isNotNull(dice.pattern.edges, 'There should always be edges');
            assert.equal(dice.pattern.edges.length,1);
        });
        
        it('Test empty consctructor with only edges', function () {
            var dice = new Dice({edges:[ [ 0, 1 ], [ 2, 3 ]]});
            
            assert.isNotNull(dice.pattern.nodes, 'There should always be nodes');
            assert.equal(dice.pattern.nodes.length,2);
            
            assert.isNotNull(dice.pattern.edges, 'There should always be edges');
            assert.equal(dice.pattern.edges.length, 2, 'should be two edges');
            assert.equal(dice.pattern.edges[0][0], 0);
            assert.equal(dice.pattern.edges[0][1], 1);
            assert.equal(dice.pattern.edges[1][0], 2);
            assert.equal(dice.pattern.edges[1][1], 3);
        });
      });
  });
})();
