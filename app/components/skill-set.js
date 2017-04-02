import Ember from 'ember';
import ScrollMagic from 'scrollmagic';
import { TweenLite } from 'gsap';

export default Ember.Component.extend({

    tagName: 'div',

    classNames: ['skill'],

    scrollMagic: Ember.inject.service(),

    createScene: Ember.on('didInsertElement', function () {
        const component = this;
        const scrollController = component.get('scrollMagic').getController();

        let scene = new ScrollMagic.Scene({
            triggerElement: component.get('element'),
            triggerHook: 'onEnter',
            offset: 100
        });

        scene.setTween(TweenLite.fromTo(component.$(), 0.7, { opacity: 0 }, { opacity: 1 }));

        scrollController.addScene(scene);
    })

});
