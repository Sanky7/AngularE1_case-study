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
        $scope.loginIndicator=true;
            $http.get("data.json")
                .then(function(response) {
                  $scope.data.contactList = [];
                  angular.forEach(response.data.menu.menuitem, function(value, key){
                            $scope.data.contactList[key] = value;
                            if($scope.data.contactList[key].isExpanded){
                              $scope.data.contactList[key].isExpanded = false;
                              $scope.data.contactList[key].iconClass = "fa fa-paper-plane";
                            }
                            else{
                                  $scope.data.contactList[key].isExpanded = true;
                                  $scope.data.contactList[key].iconClass = "fa fa-bolt";
                            }
                  });
                  return;
            });
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

      $scope.toggleExpand = function(contact){
        var index = $scope.data.contactList.indexOf(contact);
        if($scope.data.contactList[index].isExpanded){
          $scope.data.contactList[index].isExpanded = false;
          $scope.data.contactList[index].iconClass = "fa fa-paper-plane";
        }
        else{
              $scope.data.contactList[index].isExpanded = true;
              $scope.data.contactList[index].iconClass = "fa fa-bolt";
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



        //{"name": "abc", "email": "abc@gmail.com","address": "abc,India", "dob": "05/01/2017", "userName" : "abc", "pass" : "abc","category" :"Family","isExpanded":false,"iconClass":null},
  }
})();
