```javascript
/**
 * The MultiBadgeButton supports up to 4 different badges. Each badge is customizable with CSS.
 * The default locations are in a counter-clockwise formation as follows:
 *     Badge 1: top-right
 *     Badge 2: top-left
 *	   Badge 3: bottom-left
 *	   Badge 4: bottom-right
 *
 * This button also will take 1 badge and still behave like a normal {@link #Ext.Button}
 * ## Simple MultiBadgeButton
 * 
 * This is how it may look:
 *  @example miniphone preview
 *	Ext.create('Ext.Container', {
 *		fullscreen: true,
 *		padding: '2em',
 *		items: [{
 *			xtype: 'multibadgebutton',
 *			text: '4 Badges',
 *			badgeAmount: 4,
 *			badgeText: '1',
 *			badge2Text: '2',
 *			badge3Text: '3',
 *			badge4Text: '4',
 *			width: 150
 *		}]
 *	});
 *
 * ## Setting Badge Texts
 *
 * Setting the badge text is super easy by using the {@link #setBadgeText} method
 *	@example miniphone preview
 *	var counter = 2;
 *	Ext.create('Ext.Container', {
 *		fullscreen: true,
 *		padding: '2em',
 *		items: [{
 *			xtype: 'multibadgebutton',
 *			itemId: 'multi',
 *			text: '4 Badges',
 *			badgeAmount: 4,
 *			badgeText: '1',
 *			badge2Text: '2',
 *			badge3Text: 'me',
 *			badge4Text: 'F',
 *			width: 200
 *		},
 *		{
 *			xtype: 'button',
 *			ui: 'action',
 *			docked: 'top',
 *			text: 'Change Badge 2!',
 *			handler: function(btn){
 *				btn.up('container').down('#multi').setBadgeText(++counter, 2);   
 *			}
 *		}]
 *	});
 *
 * @class Ext.ux.MultiBadgeButton
 * @version 0.3
 * @author Brian Jerome
 */
Ext.define('Ext.ux.MultiBadgeButton', {
	extend: 'Ext.Button',
	xtype: 'multibadgebutton',
	cachedConfig: {
		/**
		 * @cfg {String} badge2Cls
		 * The CSS class to add to the Button's second badge, if it has one.
		 * @accessor
		 */
		badge2Cls: 'x-badge-2',
		/**
		 * @cfg {String} badge3Cls
		 * The CSS class to add to the Button's third badge, if it has one.
		 * @accessor
		 */
		badge3Cls: 'x-badge-3',
		/**
		 * @cfg {String} badge4Cls
		 * The CSS class to add to the Button's fourth badge, if it has one.
		 * @accessor
		 */
		badge4Cls: 'x-badge-4'
	},
	config: {
		margin: '0.2em',
		/**
		 * @cfg {Number} badgeAmount
		 * The amount of badges the button will display.
		 * There can be no more than 4 badges displayed at one time.
		 * 2 badges will be assumed by default.
		 * @accessor
		 */
		badgeAmount: 2,
		/**
		 * @cfg {String} badge1Text
		 * The second badge text
		 * @accessor
		 */
		badge2Text: null,
		/**
		 * @cfg {String} badge1Text
		 * The third badge text
		 * @accessor
		 */
		badge3Text: null,
		/**
		 * @cfg {String} badge1Text
		 * The fourth badge text
		 * @accessor
		 */
		badge4Text: null
	},
	template: [
        {
            tag: 'span',
            reference: 'badgeElement',
            hidden: true
        },
		{
			tag: 'span',
			reference: 'badge2Element',
			className: 'x-badge-2',
			hidden: true
		},
		{
			tag: 'span',
			reference: 'badge3Element',
			className: 'x-badge-3',
			hidden: true
		},
		{
			tag: 'span',
			reference: 'badge4Element',
			className: 'x-badge-4',
			hidden: true
		},
        {
            tag: 'span',
            className: Ext.baseCSSPrefix + 'button-icon',
            reference: 'iconElement'
        },
        {
            tag: 'span',
            reference: 'textElement',
            hidden: true
        }
    ],
	initialize: function(){
		// Check for incorrect badge amount
		if(this._badgeAmount > 4 || this._badgeAmount < 1){
			this._badgeAmount = 2;
		}

		this.badge2Element.addCls(this._badge2Cls);
		this.updateBadgeText(this._badge2Text, 2);

		this.badge3Element.addCls(this._badge3Cls);
		this.updateBadgeText(this._badge3Text, 3);

		this.badge4Element.addCls(this._badge4Cls);
		this.updateBadgeText(this._badge4Text, 4);

		this.callParent();
	},
	/**
     * @private
	 * @param badgeText The modyfing badge text.
	 * @param id {Optional} Update the text specified by the badge number.
     */
    updateBadgeText: function(badgeText, id) {
		if(id && id > this._badgeAmount){
			Ext.Error.raise({
				msg: 'Invalid badge number. Must be (1 - ' + this._badgeAmount + ').'
			});
			return;
		}

        var element = this.element,
            badgeElement = this['badge' + (!id || id == 1 ? '' : id) + 'Element'];

        if (badgeText) {
            badgeElement.show();
            badgeElement.setText(badgeText);
        }
        else {
            badgeElement.hide();
        }
		var remove = badgeText;
		for(var i = 2; i < this._badgeAmount; i++){
			remove = this['_badge' + i + 'Text'];
		}
        element[(badgeText) ? 'addCls' : 'removeCls'](this.getHasBadgeCls());
    },
	/**
     * @private
	 * @param id {Optional} Update the class specified by the badge number - id.
     */
    updateBadgeCls: function(badgeCls, oldBadgeCls, id) {
		if(id && id > this._badgeAmount){
			Ext.Error.raise({
				msg: 'Invalid badge number. Must be (1 - ' + this._badgeAmount + ').'
			});
			return;
		}
        this['badge' + (!id || id == 1 ? '' : id) + 'Element'].replaceCls(oldBadgeCls, badgeCls);
    },

	/**
	 * Convenience function
	 * Modifies the badge text of which badge is specified.
	 * @method setBadgeText
	 * @param text The modifying badge text
	 * @param id {Optional Number} A number representation of the badge (1-4)
	 */
	setBadgeText: function(text, id){
		this.updateBadgeText(text, id);
	}
});
```
