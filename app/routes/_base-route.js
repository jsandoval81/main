import Ember from 'ember';

export default Ember.Route.extend({

    activate: function () {
        this._super.apply(this, arguments);

        // Set each page to scroll to the top
        window.scrollTo(0, 0);
    },

});
