   var springURL = "http://127.0.0.1:8080";
    var nodeDarkzURL = "http://192.168.1.108:3000";	
// create the module and name it myApp
	var mainapp = angular.module('mainapp', ['ngRoute','xlsx-model']);

	// configure our routes
	mainapp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'pages/dashboard.html',
				// controller  : 'mainController'
			})

			// route for the stock page
			.when('/stock', {
                templateUrl: 'pages/stock.html',
                controller: 'stockController'
            })
			.when('/expiredStock', {
                templateUrl: 'pages/expiredStock.html',
                controller: 'expiredStockController'
            })

			// route for the contact page
			.when('/batch', {
				templateUrl : 'pages/batch.html',
				controller  : 'batchController'
			})
			.when('/drug', {
				templateUrl : 'pages/drugs.html',
				controller  : 'drugController'

			})
			.when('/viewdrug', {
				templateUrl : 'pages/drugview.html',
				controller  : 'drugController'

			})

        //..............................................umani............................................................
        // route for the add patient page
        .when('/addPatients', {
            templateUrl: 'pages/new-patient.html',
            controller: 'patientController-2'
        })
        // route for the view patient page
        .when('/patients', {
            templateUrl: 'pages/patients.html',
            // controller:'patientController'
        });
			
	});
//.....................................................................................umani...............................
mainapp.controller('patientController-1', function ($scope, $http) {

//.............................................................read patient................................................
//................................................ change suitable port....
    $http.get("http://127.0.0.1:3000/api/patient/get-patients").then(function (response) {
        $scope.patientTable = response.data;
    });

});

// create the controller and inject Angular's $scope
mainapp.controller('patientController-2', function ($scope, $http) {

//...............................................................add patient..............................................
    // $scope.formData.date=new Date().toDateInputValue();
    $scope.addPatient = function (data) {
        //console.log("CAME TO ADD PATIENT PPPPPPPPPPPPPPp");
        console.log($scope.formData);
        console.log(localStorage.getItem('id_token'));
        $scope.formData.date="12/12/2017";
        $http({
            method: "POST",
            url: "http://127.0.0.1:3000/api/patient/create-patient-test",
            data: $scope.formData,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                //for authanticaion
                'Authorization':localStorage.getItem('id_token')
            }
        }).success(function (data, status, headers, config) {

            return $scope.alertSubmit = true;


        }).error(function (data, status, headers, config) {

            return $scope.alertSubmit = false;

        });

    }

    });

// //...................................................................


	// create the controller and inject Angular's $scope
	mainapp.controller('drugController', function($scope, $http) {

	  $http.get("http://localhost:3000/api/drug").then(function (response) {
	  $scope.myDrug = response.data;
 
  
	 
	  });
	  $scope.updateDrug = function(data){

	  	var drugPrice=angular.element(document.getElementById())
		console.log(data);

	  };

	$scope.addDrug = function (data) {  
  
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


  mainapp.controller('importCtrl', ['$scope', '$http', function ($scope, $http) {  
  
    $scope.selectedFile = null;  
    $scope.msg = "";  
  
  
    $scope.loadFile = function (files) {  
  
        $scope.$apply(function () {  
  
            $scope.selectedFile = files[0];  
            if($scope.selectedFile != null && typeof $scope.selectedFile !=  'undefined'){
            	$scope.checkFile = true;
            }
  
        })  
  
    }  
  
        $scope.handleFile = function () {  
  
        var file = $scope.selectedFile;  
  
        if (file) {  
  
            var reader = new FileReader();  
  
            reader.onload = function (e) {  
  
                var data = e.target.result;  
  
                var workbook = XLSX.read(data, { type: 'binary' });  
  
                var first_sheet_name = workbook.SheetNames[0];  
  
                var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);  
  
                //console.log(excelData);  
  
                if (dataObjects.length > 0) {  
  
                      
                    $scope.save(dataObjects);  
  
  
                } else {  
                    $scope.msg = "Error : Something Wrong !";  
                }  
  
            }  
  
            reader.onerror = function (ex) {  
  
            }  
  
            reader.readAsBinaryString(file);  
        }  
        angular.element("input[type='file']").val(null);

            	$scope.checkFile = false;
            
    }  
  
      
    $scope.save = function (data) {  
  
        $http({  
            method: "POST",  
            url: "http://localhost:3000/api/drug",  
            data: JSON.stringify(data),  
            headers: {  
                'Content-Type': 'application/json'  
            }  
  
        }).success(function(data, status, headers, config) { 
           
            	if(data.success == false){
            		return $scope.alert = false;
            	}else{
            		return $scope.alert = true;
            	}
             
        }).error(function(data, status, headers, config) { 

        		return $scope.alert = false;
           
        });  
  
    }  
  
}]);  

		mainapp.controller('batchController', function($scope, $http) {

	$scope.newQTY = 0;

  $http.get("http://localhost:3000/api/drugCategory").then(function (response) {
  $scope.myDrugCategory = response.data;
 
  
	 
	  });

  $http.get("http://localhost:3000/api/batch/last").then(function (response) {

  $scope.thisMode = [];
  $scope.thisMode.batchNumber = response.data;

 
  console.log($scope.thisMode.batchNumber);
	 
  });

  $scope.pressDType=[

 		 {Dtype:"Cartoons"},

		 {Dtype:"Bottles"}

  ];



  $scope.secondGET = function () {  
  	
  	$http.get("http://localhost:3000/api/drug/category/"+$scope.thisMode.cat).then(function (response) {
  		
	      $scope.batchData = response.data;

  });
  }

// $scope.updateQTY = function () {  

// 	if()

// }


$scope.drugpriceGET = function () {  
  	
  	$http.get("http://localhost:3000/api/drug/drugname/"+$scope.thisMode.Dname).then(function (response) {
	      $scope.priceData = response.data[0];

  		// alert($scope.priceData);

  });
  }

  $scope.calcLiquid= function () {

  	$scope.totalQty=$scope.qty.cartoon* $scope.qty.bottle;

  }
 $scope.calcBottles= function () {

	$scope.totalQty= ($scope.qty.cartoon * $scope.qty.bottle )* $scope.qty.tabPerBottle;

 }
 $scope.calcCard= function () {

	$scope.totalQty= ($scope.qty.cartoon * $scope.qty.bottle) * $scope.qty.tablet;
 
 }
  $scope.calcBottleLiqud= function () {

	$scope.totalQty=$scope.qty.cartoon* $scope.qty.bottle;
 
 }
  $scope.calcCartoonTab= function () {

	$scope.totalQty=($scope.qty.cartoon* $scope.qty.card)*$scope.qty.tablet;
 
 }


$scope.addBatch= function () {  


  // console.log(data);
  var data=[{
	  	"batchNumber":$scope.thisMode.batchNumber,
	  	"drugPrice":$scope.priceData.drugPrice,
	  	"drugName":$scope.thisMode.Dname,
	  	"quantity":$scope.totalQty,
	  	"manufacturerDate":$scope.thisMode.manufacturerDate,
	  	"exprieDate":$scope.thisMode.exprieDate
  	}];

  	// console.log(data);
  	// alert(data);

        $http({  
            method: "POST",  
            url: "http://localhost:3000/api/batch",  
            data: data,  
            headers: {  
                'Content-Type': 'application/json'  
            }  
        }).success(function(data, status, headers, config) { 
           console.log(data);
           console.log("001");
            	return $scope.alertSubmit = true;

             
        }).error(function(data, status, headers, config) { 

        		return $scope.alertSubmit = false;
           
        });  

  var stockData=[{
	  	
	  	"drugPrice":$scope.priceData.drugPrice,
	  	"drugCategory":$scope.thisMode.cat,
	  	"drugType":$scope.drugType,
	  	"drugName":$scope.thisMode.Dname,
	  	"drugQuantity":$scope.totalQty,
	  	"expDate":$scope.thisMode.exprieDate
  	}];
    

        $http({  
            method: "POST",  
            url: "http://192.168.1.102:8080/api/pharmacy/stock",  
            data: stockData,  
            headers: {  
                'Content-Type': 'application/json'  
            }  
        }).success(function(data, status, headers, config) { 
           console.log(data);
           console.log("001");
            	return $scope.alertSubmit = true;

             
        }).error(function(data, status, headers, config) { 

        		return $scope.alertSubmit = false;
           
        });  
  
    	}  	  

	}); 



   
    //=============================================CHAMINDU CONTROLLER -======================


    mainapp.controller('stockController', function($scope, $http) {

        $scope.isMailClicked = false;
        firstGET(secondGET);
   //============================================= SEND EMAIL HANDLER ======================

        $scope.sendOrderMail = function(selectedRow) {

            $scope.mailDrugCategory = selectedRow.drugCategory;
            $scope.mailDrugName = selectedRow.drugName;
            $scope.mailDrugPrice = selectedRow.drugPrice;
            $scope.mailDrugQuantity = selectedRow.drugQuantity;
            $scope.isMailClicked = true;

            console.log($scope.mailDrugCategory);



        };


        $scope.sendEmailOrder = function(selectedRow) {


            $scope.isMailClicked = false;
        }



 //============================================= LOAD STOCK DETAILS TO TABLE HANDLER ======================
        function firstGET(callback) {


            $http.get(springURL+"/api/pharmacy/stock").then(function(response) {
                $scope.stockTable = response.data;
                $scope.isMailClicked = false;

                callback(updateDangerLevel)

            });



        };


        function secondGET(callback) {


            $http.get(nodeDarkzURL+"/api/drug").then(function(response) {
                $scope.dangerDetails = response.data;

                callback();


            });




        };


//============================================= COMPARE STOCK WITH DANGER LEVEL VALIDATION ======================

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






    });


//============================================= LOAD EXPIRED STOCK DETAILS TO TABLE HANDLER ======================
    mainapp.controller('expiredStockController', function($scope, $http) {
        updateExpireList();

        function updateExpireList() {

            $http.get(springURL+"/api/pharmacy/stock/expiredStock").then(function(response) {
                $scope.expiredStockTable = response.data;


                for (var i = 0; i < $scope.expiredStockTable.length; i++) {


                    $scope.expiredStockTable[i].expDate = new Date($scope.expiredStockTable[i].expDate).toUTCString().slice(4, 16);
                }

            });
        }

//============================================= DELETE EXPIRED STOCK FROM DATABASE HANDLER ======================

        $scope.deleteFromDB = function(selectedRow) {
            var result = confirm("Are you sure you want to delete this record?");



            $scope.selected = selectedRow._Id;

            if (result) {

                $http.delete(springURL+"/api/pharmacy/stock/deleteExpiredStock/" + $scope.selected).then(function(response) {
                    $scope.dangerDetails = response.data;


                    if ($scope.dangerDetails == 'true') {

                        updateExpireList();
                        $scope.alert = true;

                    } else {
                        alert('Error');

                    }


                });
            }




        };




    });
