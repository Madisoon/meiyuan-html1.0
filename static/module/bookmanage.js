/**
 * Created by Msater Zg on 2017/6/12.
 */
define(function (require, exports, module) {
    // 通过 require 引入依赖,加载所需要的js文件
    var api = require('../../static/common/js/api');

    var bookIsbnFinial = '';
    var bookInfoId = '';
    var bookInfo = {
        iSBN13: '',
        iSBN10: '',
        name: '',
        author: '',
        pages: '',
        wordCount: '',
        weight: '',
        diamension: '',
        ageStart: '',
        ageStop: '',
        gradeStart: '',
        gradeStop: '',
        series: '',
        docType: '',
        bookType: '',
        pubYear: '',
        pubLisher: '',
        count: '',
        stock: '',
        introduction: '',
        topic: '',
        review1: '',
        review2: '',
        awards: '',
        artag: '',
        bl: '',
        il: '',
        arpoints: '',
        arrating: '',
        quizNo: '',
        rvquiz: '',
        vpquiz: '',
        lsquiz: '',
        questionNo: '',
        lexileTag: '',
        lexileCode: '',
        lexileValue: '',
        lexileCombined: '',
        recommendIndex: '',
        audio: ''
    };
    var flag = '';

    function operationFunc() {
        var boosIsbn = $('.form-control.book-isbn').val();

        if (boosIsbn === '') {
            layer.msg('条形码扫描失败', {
                time: 1500
            });
        } else if (boosIsbn.length === 10 || boosIsbn.length === 13) {
            bookIsbnFinial = boosIsbn;
            if (flag !== '') {
                insertInformation();
            }
            api.book.bookManage.getAllBookByIsbn(boosIsbn, function (rep) {
                emptyForm();
                if (rep.id === 0) {
                    layer.msg('抱歉图书馆暂无此书！', {
                        time: 1500
                    });
                } else {
                    bookInfoId = rep.id;
                    var stockData = rep.stockInfo;
                    var stockDataLen = stockData.length;
                    var dom = [];
                    for (var i = 0; i < stockDataLen; i++) {
                        dom.push('<span class="label label-success library" library-id = "' + stockData[i].libraryId + '">' + stockData[i].libraryId + '&nbsp;&nbsp;' +
                            '<span class="glyphicon glyphicon-remove span-icon-cursor"></span></span>')
                    }
                    $('#all-stripe').append(dom.join(''));
                    for (var objectName in bookInfo) {//用javascript的for/in循环遍历对象的属性
                        $('.form-control.' + objectName + '').val(rep[objectName]);
                    }
                    $('#book-img').prop("src", "http://106.15.90.228:8090/dummyPath/" + rep.iSBN13 + "" + ".jpg");
                }

            });
        } else if (boosIsbn.length === 11) {
            flag = '1';
            if (bookIsbnFinial === '') {
                layer.msg('抱歉请先扫描书籍', {
                    time: 1500
                });
            } else {
                $('#all-stripe').append('<span class="label label-success library span-icon-cursor" library-id = "' + boosIsbn.substring(1, 10) + '">' + boosIsbn.substring(1, 10) + '&nbsp;&nbsp;' +
                    '<span class="glyphicon glyphicon-remove"></span></span>');
            }
        } else {
            layer.msg('条形码错误' + boosIsbn + '', {
                time: 1500
            });
        }
        $('.form-control.book-isbn').val('');
    }

    $('#search-isbn').click(function () {
        operationFunc();
    });

    $(document).keypress(function (e) {
        if (e.charCode == 13) {
            operationFunc();
        }
    });

    $('#all-stripe').on('click', '.library', function () {
        $(this).remove();
    });

    $('.form-control.book-isbn').focus();

    function emptyForm() {
        for (var objectName in bookInfo) {//用javascript的for/in循环遍历对象的属性
            $('.form-control.' + objectName + '').val('');
        }
        $('#all-stripe').empty();
        flag = '';
    }


    function insertInformation() {
        var postBookInfo = {};
        for (var objectName in bookInfo) {//用javascript的for/in循环遍历对象的属性
            postBookInfo[objectName] = $('.form-control.' + objectName + '').val();
        }
        var libraryId = [];
        $('#all-stripe .library').each(function () {
            libraryId.push($(this).attr('library-id'));
        });

        if (bookInfoId !== '') {
            postBookInfo['id'] = bookInfoId;
        }
        if ((postBookInfo.iSBN13 !== '' || postBookInfo.iSBN10 !== '') && postBookInfo.name !== '') {
            api.book.bookManage.insertBookInfo(JSON.stringify(postBookInfo), libraryId.join(), function (rep) {
                /*emptyForm();*/
                flag = '';
                layer.msg(' 新 建 成 功 ！', {
                    icon: 1,
                    time: 1200,
                });
            });
        } else {
            layer.msg('数据填写完整！', {
                time: 1500
            });
        }
    }

    $('#post-scheme-btn').click(function () {
        insertInformation();
    });
});
