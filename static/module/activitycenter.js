/**
 * Created by Msater Zg on 2017/6/12.
 */
define(function (require, exports, module) {
    // 通过 require 引入依赖,加载所需要的js文件
    var api = require('../../static/common/js/api');
    var dataType = '1';
    tableInitialization();

    function tableInitialization() {
        $('#table-news-show').bootstrapTable('destroy');
        $('#table-news-show').bootstrapTable({
            columns: [{
                checkbox: true
            }, {
                field: 'news_title',
                searchable: true,
                sortable: true,
                title: '新闻标题'
            }, {
                field: 'news_time',
                searchable: true,
                title: '新闻时间',
                formatter: function (value, row, index) {
                    return formatDateTime(value);

                }
            }],
            pageNumber: 1,
            pageSize: 12,
            dataField: 'data',//指定后台的数据的名称
            undefinedText: '--',
            classes: 'table table-bordered table-hover',
            method: 'GET',
            url: '' + api.baseUrl + 'book/getAllBookNews',
            queryParamsType: "undefined",
            pagination: true,
            paginationHAlign: 'left',
            paginationDetailHAlign: 'right',
            queryParamsType: "undefined",
            queryParams: function (params) {
                var param = {
                    newsType: dataType
                };
                return param;
            },
            onClickRow: function (row) {
            },
            onLoadSuccess: function (data) {
            }
        });
    }

    $('#add-news-btn').click(function () {
        dataInitialization();
        layer.open({
            title: '新闻展示',
            type: 1,
            area: ['70%', '94%'], //宽高
            content: $('#news-add-dialog')
        });
    });

    $('.list-group').on('click', '.list-group-item', function () {
        $('.list-group-item').removeClass('active');
        $(this).addClass('active');
        dataType = $(this).attr('data-activity');
        tableInitialization();
    });

    function dataInitialization() {
        ue.setContent('');
        $('.form-control.news_title').val('');
    }


    var ue = UE.getEditor('editor');

    $('#post-news-data').click(function () {
        var newsTitle = $('.form-control.news_title').val();
        var bookNewsData = {
            news_title: newsTitle,
            news_type: dataType,
            news_content: ue.getContent()
        };
        api.book.bookManage.insertUpdateBookNews(JSON.stringify(bookNewsData), function (rep) {
            dataInitialization();
            tableInitialization();
            layer.closeAll();
            if (rep) {
                layer.msg(' 新 建 成 功 ！', {
                    icon: 1,
                    time: 1200,
                });
            } else {
                layer.msg(' 新 建 失 败 ！', {
                    icon: 2,
                    time: 1200,
                });
            }
        });
    });

    function formatDateTime(inputTime) {
        var date = new Date(inputTime);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    };

});
