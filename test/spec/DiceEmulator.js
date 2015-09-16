/*global assert, DiceEmulator*/
(function () {
  'use strict';

  var id = 'test-target';
  var diceEmulator = null;
  var targetElement = null;

  beforeEach(function() {
      diceEmulator = new DiceEmulator(id, {});
      targetElement = document.getElementById(id);
  });

  afterEach(function() {
      diceEmulator = null;
      while (targetElement.firstChild) {
          targetElement.removeChild(targetElement.firstChild);
      }
  });

  describe('Test DiceEmulator.js', function () {

      describe('Test Utility methods', function () {

        describe('Test Extend Method', function () {
          it('Test extends merges two empty object literals', function () {
              var newSettings = diceEmulator.extend({}, {});
              assert.equal(newSettings, newSettings);
          });

          it('Test the method extends merges two object literals correctly', function () {
              var newSettings = diceEmulator.extend({'a': 'this should not appear', 'b': 'this should appear for b'}, {'a': 'this should appear for a', 'c': 'this should appear for c'});
              assert.equal(newSettings.a, 'this should appear for a');
              assert.equal(newSettings.b, 'this should appear for b');
              assert.equal(newSettings.c, 'this should appear for c');
          });
        });

        describe('Test Get element via id method', function () {
            it('Test get element returns target element', function () {
                var element = diceEmulator.getElementViaId(id);
                assert.equal(element, targetElement);
            });

            it('Test get element throws error when target does not exist', function () {
                assert.throw(function () {
                    diceEmulator.getElementViaId('doesNotExist');
                }, Error, /Could not locate target element with id: doesNotExist/);
            });
        });

        describe('Test createCanvas method', function () {
            it('Test get element returns target element with correct settings', function () {
                var canvas = diceEmulator.createCanvas(40, 60);
                assert.isDefined(canvas);
                assert.strictEqual(canvas.getAttribute('class'), 'diceCanvas');
                assert.strictEqual(canvas.width, 40);
                assert.strictEqual(canvas.height, 60);
            });
        });

        describe('Test retrieveContext method', function () {
            it('Test retrieve successful context', function () {
                var diceCanvas = document.createElement('canvas');
                var context = diceEmulator.retrieveContext(diceCanvas);
                assert.isDefined(context);
            });

            it('Test retrieve unsuccessful context', function () {
                assert.throw(function () {
                    var diceCanvas = {'getContext': undefined};
                    diceEmulator.retrieveContext(diceCanvas);
                }, Error, /The canvas context is not supported in this browser/);

            });
        });
    });
  });
})();
