angular.module('crmApp').factory('server', ['$http', function($http) {

    return {
        getMyCustomer: function(params){
        	return $http.get("/api/Customer?"+$.param(params));
        },
        saveCustomer: function(data,verify){
        	if(!data.Id){
        		return $http.post('/api/customer?verify='+verify,data);
        	}
        },
        getCustomerDetail:function(id){
            return $http.get('/api/customerdetail/'+id);
        },
        saveCompany: function(data,verify){
            if(!data.Id){
                return $http.post('/api/subsidiary?verify='+verify,data);
            }
        },
        getSalers: function(){
            return $http.get('/api/contract/sales');
        },
        deleteCustomer: function(id){
            return $http.delete('/api/opencustomer/'+id);
        },
        getIndustry: function(){
            return $http.get('/api/industry');
        },
        getCustomerType: function(){
            return $http.get('/api/cuscategory');
        },
        http: $http
    };
 }]);
