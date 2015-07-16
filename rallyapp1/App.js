var rallyApp;
Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',

    launch: function(){
      console.log("First Rally app");
      console.log("what is this=", this.__proto__.$className)
      rallyApp = this;
      rallyApp._loadData();
    },
    _loadData: function(){
      var myStore1 = Ext.create('Rally.data.wsapi.Store', {
          model: 'User Story',
          autoLoad: true,
          listeners: {
              load: function(myStore, myData, success) {
                console.log('Data read!', myStore, myData, success);
                //rallyApp._loadGrid(myStore);
                this._loadGrid(myStore);
                //sets the scope when the store is created
                //in this case, this refers to RallyApp
                console.log("what is this=", this.__proto__.$className);
              },
              scope: this
          },
          fetch: ['FormattedID', 'Name', 'Description','PlanEstimate', 'ScheduleState']
      });
    },
    _loadGrid: function(store){
      var myGrid = Ext.create('Rally.ui.grid.Grid', {
        store: store,
        enableHierarchy: true,
        columnCfgs: ['FormattedID', 'Name', 'Description', 'PlanEstimate', 'ScheduleState']
      });

      console.log('My Grid', myGrid);
      //This only works in conjunction with the scope: this instruction
      //this.add(myGrid);
      //This is muuuch better
      rallyApp.add(myGrid);
      //Trick: Always add this line so you know the current context object
      console.log('what is this=', this.__proto__.$className);
    }
});
