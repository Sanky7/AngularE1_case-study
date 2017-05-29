(function (){
  'use strict';
  angular.module('contactManagement',[])
  .controller('CMController',CMController);

CMController.$inject =['$scope','$http'];
  function CMController($scope,$http){
      $scope.data = {};
      $scope.loginIndicator=false;
      $scope.data.isEdit = false;
      $scope.data.allowed = false;
      $scope.data.isLoggedUser = false;

      $scope.checkLogin = function(){
        if(($scope.data.username!= undefined && $scope.data.username.trim() != "") && $scope.data.password != undefined){
          $scope.loginIndicator=true;
              $http.get("data.json")
                  .then(function(response) {
                    $scope.data.contactList = [];
                    $scope.data.treeList = [];
                    $scope.friendObj = {category : null,iconClass:"fa fa-paper-plane",isExpanded:false,catList:[] };
                    $scope.familyObj = {category : null,iconClass:"fa fa-paper-plane",isExpanded:false,catList:[] };
                    $scope.collObj = {category : null,iconClass:"fa fa-paper-plane",isExpanded:false,catList:[] };
                    angular.forEach(response.data.menu.menuitem, function(value, key){

                              //To build tree
                              if(value.category == "Family"){
                                 $scope.familyObj.category = "Family";
                                 $scope.familyObj.catList.push(value);
                                 //To store as local storage
                                 $scope.data.contactList[key] = value;
                              }
                              if(value.category== "Collegues"){
                                 $scope.collObj.category = "Collegues";
                                 $scope.collObj.catList.push(value);
                                 //To store as local storage
                                 $scope.data.contactList[key] = value;
                              }
                              if(value.category== "Friends"){
                                 $scope.friendObj.category = "Friends";
                                 $scope.friendObj.catList.push(value);
                                 //To store as local storage
                                 $scope.data.contactList[key] = value;
                              }

                    });
                    $scope.data.treeList.push($scope.familyObj);
                    $scope.data.treeList.push($scope.friendObj);
                    $scope.data.treeList.push($scope.collObj);
                    return;
              });
        }
      };

      $scope.loadContact = function (selectedObj){
          var index = $scope.data.contactList.indexOf(selectedObj);
          $scope.data.contactList[index];
          $scope.data.selectedContact = $scope.data.contactList[index];
          if($scope.data.selectedContact.name == $scope.data.username){
              $scope.data.isLoggedUser = true;
          }
          return;
      };

      $scope.userLogout = function(){
            $scope.loginIndicator=false;
            $scope.data = {};
            return;
      };

      $scope.toggleExpand = function(contacts){
        var index = $scope.data.treeList.indexOf(contacts);
        if($scope.data.treeList[index].isExpanded){
          $scope.data.treeList[index].isExpanded = false;
          $scope.data.treeList[index].iconClass = "fa fa-paper-plane";
        }
        else{
              $scope.data.treeList[index].isExpanded = true;
              $scope.data.treeList[index].iconClass = "fa fa-bolt";
        }
        return;
      };

      $scope.createContact = function(){
        $scope.data.selectedContact = [];
        $scope.data.allowed = true;
        $scope.data.isEdit = true;
        $scope.data.isLoggedUser = true;
      };

      $scope.editContact = function(){
        $scope.data.allowed = true;
        $scope.data.isEdit = true;
      };

      $scope.saveData = function(savedContact){
        alert("Contact value saved is : \n"+ JSON.stringify(savedContact));
        var index = $scope.data.contactList.indexOf(savedContact);
        if(index == undefined || index <0){
            $scope.data.contactList.push(savedContact);
            return;
        }
        $scope.data.contactList[index] = savedContact;
        $scope.data.allowed = false;
        $scope.data.isEdit = false;
        return;
      };

      $scope.cancelEdit = function(savedContact){
        var index = $scope.data.contactList.indexOf(savedContact);
        $scope.data.selectedContact = $scope.data.contactList[index];
        $scope.data.allowed = false;
        $scope.data.isEdit = false;
        return;
      };
  }
})();
