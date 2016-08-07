define([
    'require', 'dojo/_base/declare', "dijit/layout/ContentPane",
    "dojo/on", "dojo/topic", "dojo/dom-construct", "dojo/dom", "dijit/form/Button",
    "dijit/registry"
], function (require, declare, ContentPane, on, topic, domConstruct, dom, Button, Register) {
    return declare(ContentPane, {
        btnPane: null,
        btnCount: 0,
        constructor() {

        },
        render: function () {
            this.addChild(this.createButtonPane());
            this.addEventHandler();
        },
        createButtonPane: function () {
            this.btnPane = new ContentPane({
                style: ""
            });
            var alertButton = new Button({
                label: "Alert the user",
                id: "alertButton"
            });
            var createAlertBtn = new Button({
                label: "Create another alert button",
                id: "createAlert"
            });
            this.btnPane.addChild(alertButton);
            this.btnPane.addChild(createAlertBtn);
            return this.btnPane;
        },
        addEventHandler: function () {
            var alertButton = Register.byId("alertButton");
            var createAlert = Register.byId("createAlert");

            on(alertButton.domNode, "click", function () {
                // When this button is clicked,
                // publish to the "alertUser" topic
                topic.publish("alertUser", "I am alerting you.");
            });

            on(createAlert.domNode, "click", function (evt) {
                console.info(evt);
                // Create another button
                var anotherButton = domConstruct.create("button", {
                    innerHTML: "Another alert button",
                    'data-count': this.btnCount
                }, createAlert, "after");
                this.btnPane.domNode.appendChild(anotherButton);
                // When the other button is clicked,
                // publish to the "alertUser" topic
                this.btnCount++;
                on(anotherButton, "click", function (evt) {
                    console.info(this);
                    var count = this.getAttribute("data-count");
                    topic.publish("alertUser", "I am also alerting you:" + count);
                });
            }.bind(this));

            // Register the alerting routine with the "alertUser" topic.
            topic.subscribe("alertUser", function (text) {
                alert(text);
            });
        }

    });
});