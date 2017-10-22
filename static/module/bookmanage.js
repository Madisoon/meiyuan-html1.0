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
        bookShelf: '',
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
        recommendIndex: ''
    };

    $(document).keypress(function (e) {
        if (e.charCode == 13) {
            var boosIsbn = $('.form-control.book-isbn').val();
            if (boosIsbn === '') {
                layer.msg('条形码扫描失败', {
                    time: 1500
                });
            } else if (boosIsbn.length === 10 || boosIsbn.length === 13) {
                bookIsbnFinial = boosIsbn;
                /*layer.msg('书籍条形码', {
                    time: 1500
                });*/
                /*emptyForm();*/
                api.book.bookManage.getAllBookByIsbn(boosIsbn, function (rep) {
                    console.log(rep);
                    emptyForm();
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
                });
            } else if (boosIsbn.length === 9) {
                if (bookIsbnFinial === '') {
                    layer.msg('抱歉请先扫描书籍', {
                        time: 1500
                    });
                } else {
                    $('#all-stripe').append('<span class="label label-success library span-icon-cursor" library-id = "' + boosIsbn + '">' + boosIsbn + '&nbsp;&nbsp;' +
                        '<span class="glyphicon glyphicon-remove"></span></span>');
                }
                /*layer.msg('会员号条形码', {
                    time: 1500
                });*/
            } else {
                layer.msg('条形码错误', {
                    time: 1500
                });
            }
            $('.form-control.book-isbn').val('');
        }
    });

    $('#all-stripe').on('click', '.library', function () {
        $(this).remove();
    });

    /* $('.form-control.book-library').change(function () {
         var libraryId = $(this).val();
         $('#all-stripe').append('<span class="label label-success">' + libraryId + '</span>');
         setTimeout(function () {
             $('.form-control.book-library').val('');
         }, 500);
     });*/

    $('.form-control.book-isbn').focus();
    /*    $('#search-book').click(function () {
            layer.open({
                title: ' 图 书 管 理 ',
                type: 1,
                area: ['60%', '90%'], //宽高
                shadeClose: false,
                content: $('#search-book-dialog')
            });
            $('.form-control.book-isbn').focus();
        });*/

    /*    $('#add-book-library').click(function () {
            $('.form-group.library-id').fadeIn();
            $('.form-control.book-library').focus();
        });*/


    function emptyForm() {
        for (var objectName in bookInfo) {//用javascript的for/in循环遍历对象的属性
            $('.form-control.' + objectName + '').val('');
        }
        $('#all-stripe').empty();
        /* bookIsbnFinial = '';*/
    }

    $('#post-scheme-btn').click(function () {
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
        api.book.bookManage.insertBookInfo(JSON.stringify(postBookInfo), libraryId.join(), function (rep) {
            emptyForm();
            layer.msg(' 新 建 成 功 ！', {
                icon: 1,
                time: 1200,
            })
        });
    });
});
