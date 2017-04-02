import Ember from 'ember';

export default Ember.Component.extend({

    tagName: 'div',

    classNames: ['app-footer'],

    copyrightYear: function () {
        return new Date().getFullYear();
    }.property(),

});
