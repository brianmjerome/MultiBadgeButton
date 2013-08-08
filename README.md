MultiBadgeButton
================

**Class:** Ext.ux.MultiBadgeButton<br>
**Author:** Brian Jerome<br>
**Version:** 0.3<br>

Ext.Button extension for Sencha Touch 2.x

The MultiBadgeButton supports up to 4 different badges. Each badge is customizable with CSS.
This class is fully customizable and open-source as long as this work is credited.

The default locations are in a counter-clockwise formation as follows:
  - Badge 1: top-right
  - Badge 2: top-left
  - Badge 3: bottom-left
  - Badge 4: bottom-right

The MultiBadgeButton can also just take 1 badge and still behave like a normal Ext.Button, but what is the fun in that?


You can view a **Demo** fiddle at: https://fiddle.sencha.com/#fiddle/6q

Examples
================
### Simple MultiBadgeButton
You can create a simple MultiBadgeButton with this code:
```javascript
Ext.create('Ext.Container', {
  fullscreen: true,
  padding: '2em',
  items: [{
    xtype: 'multibadgebutton',
    text: '4 Badges',
    badgeAmount: 4,
    badgeText: '1',
    badge2Text: '2',
    badge3Text: '3',
    badge4Text: '4',
    width: 150
  }]
});
```
### Setting Badge Texts
Setting the badge text is super easy. Just supply the text with an optional badge number:
```javascript
//sets the text of the second badge on the MultiBadgeButton referenced in 'button'.
button.setBadgeText('Foo', 2);
```

Installation
================
Copy the MultiBadgeButton.js and multibadgebutton.css into your working project directory following your project's architecture.
