    // create the module and name it myApp
    var mainapp = angular.module('mainapp', ['ngRoute', 'xlsx-model']);



    // configure our routes
    mainapp.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl: 'pages/dashboard.html',
                // controller  : 'mainController'
            })

            // route for the about page
            .when('/stock', {
                templateUrl: 'pages/stock.html',
                controller: 'stockController'
            })
            .when('/stock/email', {
                templateUrl: 'pages/sendStockMail.html',
                controller: 'stockController'
            })


            .when('/batch', {
                templateUrl: 'pages/batch.html',
                // controller  : ''
            })
            .when('/expiredStock', {
                templateUrl: 'pages/expiredStock.html',
                controller: 'expiredStockController'
            })
            .when('/drug', {
                templateUrl: 'pages/drugs.html',
                controller: 'drugController'

            });

    });

    // create the controller and inject Angular's $scope
    mainapp.controller('drugController', function($scope, $http) {

        // $scope.addDrug = function() {
        //      $http.post('http://localhost:3000/api/drug',$scope.formData).
        //      success(function(data) {

        //          return $scope.alertSubmit = true;

        //      }).error(function(data) {
        //          console.error("error in posting");
        //      })
        // }

        $scope.addDrug = function(data) {

            $http({
                method: "POST",
                url: "http://localhost:3000/api/drug",
                data: $scope.formData,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).success(function(data, status, headers, config) {

                return $scope.alertSubmit = true;


            }).error(function(data, status, headers, config) {

                return $scope.alertSubmit = false;

            });

        }

    });

    mainapp.controller('xlsxCtrl', ['$scope', function($scope) {
        // Nothing to do here :)
    }]);


    mainapp.controller('importCtrl', ['$scope', '$http', function($scope, $http) {

        $scope.selectedFile = null;
        $scope.msg = "";


        $scope.loadFile = function(files) {

            $scope.$apply(function() {

                $scope.selectedFile = files[0];
                if ($scope.selectedFile != null && typeof $scope.selectedFile != 'undefined') {
                    $scope.checkFile = true;
                }

            })

        }

        $scope.handleFile = function() {

            var file = $scope.selectedFile;

            if (file) {

                var reader = new FileReader();

                reader.onload = function(e) {

                    var data = e.target.result;

                    var workbook = XLSX.read(data, {
                        type: 'binary'
                    });

                    var first_sheet_name = workbook.SheetNames[0];

                    var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);


                    if (dataObjects.length > 0) {


                        $scope.save(dataObjects);


                    } else {
                        $scope.msg = "Error : Something Wrong !";
                    }

                }

                reader.onerror = function(ex) {

                }

                reader.readAsBinaryString(file);
            }
            angular.element("input[type='file']").val(null);

            $scope.checkFile = false;

        }


        $scope.save = function(data) {

            $http({
                method: "POST",
                url: "http://localhost:3000/api/drug",
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }

            }).success(function(data, status, headers, config) {

                if (data.success == false) {
                    return $scope.alert = false;
                } else {
                    return $scope.alert = true;
                }

            }).error(function(data, status, headers, config) {

                return $scope.alert = false;

            });

        }




    }]);


    //=============================================CHAMINDU CONTROLLER -======================


    mainapp.controller('stockController', function($scope, $http) {
      
         $scope.isMailClicked = false;
        firstGET(secondGET);

           $scope.sendOrderMail = function(selectedRow) {

            $scope.mailDrugCategory = selectedRow.drugCategory;
            $scope.mailDrugName = selectedRow.drugName;
            $scope.mailDrugPrice = selectedRow.drugPrice;
            $scope.mailDrugQuantity = selectedRow.drugQuantity;
            $scope.isMailClicked = true;

            console.log( $scope.mailDrugCategory);
           


        };


         $scope.sendEmailOrder = function(selectedRow) {


 $scope.isMailClicked = false;
         }







        function firstGET(callback) {


            $http.get("http://127.0.0.1:8080/api/pharmacy/stock").then(function(response) {
                $scope.stockTable = response.data;
                 $scope.isMailClicked = false;
                
                callback(updateDangerLevel)

            });



        };


        function secondGET(callback) {


            $http.get("http://192.168.1.108:3000/api/drug").then(function(response) {
                $scope.dangerDetails = response.data;
               
                callback();


            });




        };




        function updateDangerLevel() {

          
            for (var i = 0; i < $scope.stockTable.length; i++) {


                for (var r = 0; r < $scope.dangerDetails.length; r++) {

                    if ($scope.dangerDetails[r].drugName == $scope.stockTable[i].drugName) {

                        if ($scope.dangerDetails[r].dangerLevel >= $scope.stockTable[i].drugQuantity) {

                            $scope.stockTable[i].reorderAlert = "danger";
                            break;
                        }


                        if ($scope.dangerDetails[r].reorderLevel >= $scope.stockTable[i].drugQuantity) {

                            $scope.stockTable[i].reorderAlert = "reorder";
                            break;
                        }
                    }
                }

            }
        }



        // for(var i = 0 ; i < $scope.stockTable.length; i++ ){


        //     for(var r = 0; r <  $scope.dangerDetails.length; r++){

        //         if($scope.dangerDetails[r].drugName == $scope.stockTable[i].drugName){

        //             if($scope.dangerDetails[r].reorderLevel >= $scope.stockTable[i].drugQuantity){

        //                 alert($scope.stockTable[i].drugQuantity +" - "+ $scope.stockTable[i].drugName);
        //             }
        //         }
        //     }

        // }




        //    $scope.newDataSet = 
        //     {

        //         "drugCategory": "Narcotics",
        //         "drugName": "Panadol",
        //         "drugType": "Tablet",
        //         "drugPrice": "5",
        //         "drugQuantity":"10",
        //         "expDate":"2017-08-10"
        //     }

        // ];




        // $http({
        //      'url' : 'http://127.0.0.1:8080/api/pharmacy/stock',
        //      'method' : 'POST',
        //      'headers': {'Content-Type' : 'application/json'},
        //      'data' : $scope.newDataSet
        //      }).then(function (success){
        //      alert('Successfully Added to the system');
        //       $scope.isPaid = true;

        //      },function (error){
        //      alert('Something went wrong, please try again')

        //      });




    });



    mainapp.controller('expiredStockController', function($scope, $http) {
        updateExpireList();

        function updateExpireList() {

            $http.get("http://127.0.0.1:8080/api/pharmacy/stock/expiredStock").then(function(response) {
                $scope.expiredStockTable = response.data;


                for (var i = 0; i < $scope.expiredStockTable.length; i++) {


                    $scope.expiredStockTable[i].expDate = new Date($scope.expiredStockTable[i].expDate).toUTCString().slice(4, 16);
                }

            });
        }


        $scope.deleteFromDB = function(selectedRow) {
            var result = confirm("Are you sure you want to delete this record?");



            $scope.selected = selectedRow._Id;

            if (result) {

                $http.delete("http://127.0.0.1:8080/api/pharmacy/stock/deleteExpiredStock/" + $scope.selected).then(function(response) {
                    $scope.dangerDetails = response.data;
                    

                    if ($scope.dangerDetails == 'true') {

                        updateExpireList();

                    } else {
                        alert('Error');

                    }


                });
            }




        };








    });