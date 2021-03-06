/*
Copyright (c) 2015 - Andreas Dewes

This file is part of Gitboard.

Gitboard is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.
*/
define(["js/utils","js/subject","js/settings"],function (Utils,Subject,Settings) {
    'use strict';

    var IssueApi = function(){
        Subject.Subject.call(this);
    };

    var instance;

    function getInstance()
    {
        if (instance === undefined)
            instance = new IssueApi();
        return instance;
    }

    IssueApi.prototype = new Subject.Subject();
    IssueApi.prototype.constructor = IssueApi;

    IssueApi.prototype.getIssues = function(fullName,data,onSuccess,onError){
        return Utils.apiRequest({
            type : 'GET',
            url : "/repos/"+fullName+"/issues"+'?'+Utils.toUrlParams(data),
            success : onSuccess,
            error: onError,
            },{});
    }

    IssueApi.prototype.getDetails = function(fullName,issueNumber,data,onSuccess,onError){
        return Utils.apiRequest({
            type : 'GET',
            url : "/repos/"+fullName+"/issues/"+issueNumber+'?'+Utils.toUrlParams(data),
            success : onSuccess,
            error: onError,
            },{});
    }

    IssueApi.prototype.updateIssue = function(fullName,issueNumber,data,onSuccess,onError){
        return Utils.apiRequest({
            type : 'PATCH',
            url : "/repos/"+fullName+"/issues/"+issueNumber,
            data : JSON.stringify(data),
            success : onSuccess,
            error: onError,
            },{});
    }

    IssueApi.prototype.getComments = function(fullName,issueNumber,data,onSuccess,onError){
        return Utils.apiRequest({
            type : 'GET',
            url : "/repos/"+fullName+"/issues/"+issueNumber+'/comments'+'?'+Utils.toUrlParams(data),
            success : onSuccess,
            error: onError,
            },{});
    }

    return {getInstance:getInstance};

});
