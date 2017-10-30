/**
 * Created by Msater Zg on 2017/6/12.
 */
define(function (require, exports, module) {
    // 通过 require 引入依赖,加载所需要的js文件
    var api = require('../../static/common/js/api');

    $('#table-news-show').bootstrapTable({
        columns: [{
            checkbox: true
        }, {
            field: 'user_loginname',
            searchable: true,
            sortable: true,
            title: '账号'
        }, {
            field: 'user_name',
            searchable: true,
            title: '姓名'
        }, {
            field: 'user_phone',
            searchable: true,
            title: '手机号'
        }, {
            field: 'user_createtime',
            title: '创建时间'
        }, {
            field: 'role_name',
            title: '角色'
        }, {
            field: 'dep_name',
            title: '部门'
        }],
        pageNumber: 1,
        pageSize: 12,
        search: true,
        dataField: 'data',//指定后台的数据的名称
        undefinedText: '--',
        showColumns: 'true',
        classes: 'table table-bordered table-hover',
        method: 'post',
        formatSearch: function () {
            return "任意搜索";
        },
        url: '' + api.baseUrl + '/getAllUser',
        queryParamsType: "undefined",
        pagination: true,
        paginationHAlign: 'left',
        paginationDetailHAlign: 'right',
        onClickRow: function (row) {
            userOperstion = false;
            getSingleInfo(row);
        },
        onLoadSuccess: function (data) {
        }
    });


});
