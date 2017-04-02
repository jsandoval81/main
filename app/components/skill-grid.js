import Ember from 'ember';

export default Ember.Component.extend({

    tagName: 'div',

    classNames: ['container', 'skill-grid'],

    addMasonry: Ember.on('didInsertElement', function () {

        Ember.run.scheduleOnce('afterRender', this, function () {
            var $grid = Ember.$('.skill-grid');

            $grid.imagesLoaded(function () {
                Ember.$('.skill-grid').masonry({
                    itemSelector: '.skill',
                    columnWidth: 300
                });
            });
        });

    })

});
